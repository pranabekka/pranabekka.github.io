+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

Safe mutability for high-level languages.

With mainstream high-level languages
pervasive aliasing causes issues at run time,
which can only be prevented with defensive copies
or testing every change to a function.
While Rust automatically catches these at compile time,
users still have to deal with aliasing issues
through compiler errors,
which is unsuitable for high-level programming.
Functional programming languages make this invisible,
but they will instead raise errors for
the programming patterns most people are familiar with.

Copy semantics allow mutability
without run time or compiler errors
by presenting function parameters and results
as copies.

```
fun main()
	let a = Point(x: 2, y: 3)
	let b = double(a)

type Point
	x: Int
	y: Int

fun double(point: Point) -> Point
	return offset(point, point)

fun offset_twice(one: Point, two: Point) -> Point
	one = offset(one, two)
	one = offset(one, two)
	return one

fun offset(one: Point, two: Point) -> Point
	one.x += two.x
	one.y += two.y
	return one
```

Translated to Python:
(or typescript?)
ts is newer and web dev is very popular,
but many of them will never read this

```
```

## Copy semantics

With copy semantics,
functions seem to receive copies of their arguments.
Because of that, `point` doesn't change inside `main`
in the following example.

```
fun main()
	let point = Point(x: 3, y: 4)
	double(point)
	echo point // Point(x: 3, y: 4)

fun double(p: Point) -> Point
	p.x *= 2
	p.y *= 2
	return p
```

Because functions take and give "copies",
we need to assign their results to mutate variables.

```
fun main()
	let point = Point(x: 3, y: 4)

	// We're now assigning to `point`.
	point = double(point)

	echo point // Point(x: 6, y: 8)
```

Because we must assign the result of a function
to mutate a variable,
functions must return a meaningful result.

```
fun main()
	let point = Point(x: 3, y: 4)
	point = double(point)
	echo point // Nil

// Functions return Nil by default.
fun double(p: Point)
	p.x *= 2
	p.y *= 2
```

Modern languages shouldn't make values
automatically nil-able,
but this is just for demonstration.

Anyway, new variables also seem to be copies.

```
let old = Point(x 1, y 1)
let new = old
old = double(old)
echo new // Point(x 1, y 1)
echo old // Point(x 2, y 2)
```

Loops also seem to work on copies.

```
let my_list = [1, 2, 3]
my_list =
	for items(my_list) item
		// Assume some complex mutation
		item *= 2
		// Return mutation at end
		return item
echo my_list // [2, 4, 6]
```

The `items` function exposes the items of `my_list`,
which we call `item` in each iteration.
In each iteration, we return the double of the item,
and then the `for` loop collects that into a "copy",
which we finally assign back to `my_list`.
If we didn't assign the result
of the `for` loop to `my_list`,
then `my_list` wouldn't be mutated.
There are other ways to do it,
but I think this works the best.

Loops can still mutate variables outside the loop:

```
let my_list = [1, 2, 3]
for indexes(my_list) i
	my_list[i] *= 2
echo my_list // [2, 4, 6]
```

That about sums up what using copy semantics looks like,
but if we actually did use copies everywhere
the performance of the program would be horrible.
Instead, we actually infer aliases in most places,
hence copy _semantics_,
because it behaves like copies while using aliases.
The next section describes when we use aliasing.

## Reference inference

There are two things to select
when we can use aliases,
and when we must copy.

First,
assigning the result of a function means mutation,
otherwise the function doesn't mutate a variable.

Second,
multiple variables can alias the same value
as long as none of them are mutable.
This is the same Alias Xor Mutate rule
driving Rust's borrow checker.

These are the foundation of copy semantics,
which create safe high-level mutability.

### Mutation annotation

A key issue with other languages is that
function callers don't know
if an argument will be mutated or not,
and function authors don't know
if it's safe to mutate a parameter or not.
With copy semantics,
function callers know that only variables
on the left side of an assignment is mutated.
Similarly, function authors know that
only parameters that are returned from the function
can be mutated,
which means they can mutate parameters without worry.

By requiring assignment for mutation in each scope,
the language knows precisely which variables
should be mutated.

```
let point_1 = Point(x: 2, y: 3)
let point_2 = Point(x: -1, y: 5)
point_1 = offset(point_1, point_2)
draw_line(point_1, point_2)
```

In the above example,
`offset` can mutate `point_1`,
but it can never mutate `point_2`,
and `draw_line` can't mutate anything.

We now know which parameters/arguments
a function can mutate.
The other issue with mainstream languages
is their rules for when to use aliasing.

### Sharing

Most languages pick aliasing by the type of the value.
Numbers and strings are copied every time,
but lists and struct-like types with fields
are always passed by reference.

Instead, copy semantics
allows variables to be aliases
to the same underlying value
as long as the variables are unchanged or unique.

#### Unchanging

If variables don't change their values,
then they can be aliases.

This means `point` is aliased in the following example,
because `print` doesn't attempt to mutate it.

```
fun main()
	let point = Point(x 3, y 7)
	print(point)

fun print(p Point)
	echo "x{p.x}, y{p.y}"
```

If the function attempts to mutate the parameter,
then it would have to be copied.
In the following example,
`print_double` mutates its `p` parameter,
so it's given a copy of `point` from `main`.

```
fun main()
	let point = Point(x 3, y 4)
	print_double(point)

fun print_double(p Point)
	p.x *= 2
	p.y *= 2
	print(p)
```

#### Unique

Mutable variables can be aliased if they're unique.

In the following example,
`p1` is used once to assign to `p2`
and then it's never used again.
This means `p2` can be an alias to the same value,
because it has unique mutable access to the value.

```
let p1 = Point(x 3, y 4)
let p2 = p1 // Last use of p1.
p2.x += 2
echo p2 // Point(x 5, y 4)
```

If `p1` was reused after that point,
then `p2` would have to be made unique
by copying the value of `p1`.

```
let p1 = Point(x 3, y 4)
let p2 = p1 // Last use of p1.
p2.x += 2
echo p1 // Point(x 3, y 4)
echo p2 // Point(x 5, y 4)
```

But we can still make `p2` alias `p1`
by moving its mutation after the last use of `p1`.
In the following example,
`p2` reuses the same memory as `p1`.

```
let p1 = Point(x 3, y 4)
let p2 = p1 // Last use of p1.
echo p1 // Point(x 3, y 4)
p2.x += 2
echo p2 // Point(x 5, y 4)
```

#### Unique sharing

In the following example,
the comments show how `double` is applied to `point`.

```
fun main()
	let point = Point(x 1, y 2)

	point = double(point)
	// let p = point
	// p.x *= 2
	// p.y *= 2
	// point = p

	echo point // Point(x 2, y 4)

fun double(p Point) -> Point
	p.x *= 2
	p.y *= 2
	return p
```

p is unique for a bit,
and then it's shared back into point?
and point is unique?

for a brief period,
p diverges from point,
but then they become shared again,
and between that time, p is unique?

It can also apply to fields of variables.

## Additional benefits

In addition to safety,
copy semantics also present nicer APIs
and better performance.

### Chain everything

A language with copy semantics can compile to
other languages that support aliasing
by using them where required.

Take the following example with copy semantics:

```
fun main()
	let p1 = Point(x: 2, y: 3)
	let p2 = double(p1)
	draw_line(p1, p2)

type Point
	x: Int
	y: Int

fun double(p Point) -> Point
	p.x *= 2
	p.y *= 2
	return p
```

Here's one way to compile it to Python:

**TODO**: test this

```
def main():
	p1 = Point(x=2, y=3)
	p2 = p1.copy()
	double(p2)
	draw_line(p1, p2)

@dataclass
class Point:
	x: Int
	y: Int
	
	def copy(self)
		Point(x=self.x, y=self.y)

def double(p: Point):
	p.x *= 2
	p.y *= 2
```

Here's one way to compile to Go:

**TODO:** test changes

```
func main() {
	p1 := point {x: 2, y: 3}
	p2 := p1 // Copy
	double(&p2)
	draw_line(&p1, &p2)
}

type point struct{ x, y int }

func double(p *point) {
	p.x *= 2
	p.y *= 2
```

Here's a way to compile to Rust:

```
fn main() {
	let p1 = Point { x: 2, y: 3 }
	let p2 = p1.clone()
	double(&mut p2)
}

#[derive(Clone)]
struct Point {
	x: i32,
	y: i32,
}

fn double(p: &mut Point) {
	a.x *= 2;
	a.y *= 2;
}
```

Finally, here's a way to compile to C:

**TODO**: test changes

```
typedef struct {
	int x;
	int y;
} point;

void p_double(point* p);

int main()
{
	point p1 = { .x = 2, .y = 2 };
	point p2 = p1; // Copy
	p_double(&p2);
	draw_line(&p1, &p2);
}

void p_double(point* p)
{
	p->x *= 2;
	p->y *= 2;
};
```

The code examples simply present one way of compiling,
and should also give an idea of how copy semantics work.

All the examples will draw a line
from x2 and y3 to x4 and y6.

### Performance

Aliases and copies are tracked at compile time,
which can also be used to determine memory usage
at compile time,
thus removing the overhead of a garbage collector.

### Safe transpile

### Easy bootstrap/port
