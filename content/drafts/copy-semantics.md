+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

Safe mutability for high-level languages.

Mainstream high-level languages
alias everything by default,
which leads to discovering crashes
and subtle errors at runtime,
that can only be avoided with defensive copies
and thoroughly testing new function calls.
Rust catches these potential errors at compile time,
but programmers have to deal with low-level details.
Functional languages make these errors
completely invisible at both compile time and runtime,
but then programmers have to deal with
how immutability invalidates past experiences,
most learning material,
and general programming discourse.

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

## Aliasing issues

Aliasing

If you already know about the pitfalls of aliasing,
the next section describes what copy semantics
looks like on a surface level,
followed by the section describing
what happens under the hood.

### Hidden mutation

### API instability

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

There are two things that guide the use of aliases.

One: assigning the result of a function means mutation,
otherwise the function doesn't mutate a variable.

Two: multiple variables can alias the same value
as long as none of them are mutable.
This is the same Alias Xor Mutate rule
driving Rust's borrow checker.

These are the foundation of copy semantics,
which create safe high-level mutability.

### Annotated mutation

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

### Exclusive mutable aliasing

Most languages pick aliasing by the type of the value.
Numbers and strings are copied every time,
but lists and struct-like types with fields
are always passed by reference.

The core underlying difference has been
popularised by the Rust community.
If a variable is used to mutate a value,
then other variables cannot safely alias that value.

```
```

Another related concept is the lifetime of variables,
which is how long they remain in scope.
This allows more fine-grained tracking of
exclusive references.

```
let p1 = Point(x 3, y 4)
let p2 = p1 // End of p1's lifetime
p2 = double(p2)
echo p2 // Point(x 6, y 8)
```

Because the last use of `p1` is its assignment to `p2`,
at the moment that we `double(p2)`,
`p2` has an exclusive alias to `Point(x 3, y 4)`.

If we used `p1` after that point,
then `p2` would have a shared alias to `Point(x 3, y 4)`,
which would then mutate `p1` indirectly,
so `p2` instead gets a _copy_ of `p1`,
thus avoiding accidental mutation.

```
let p1 = Point(x 3, y 4)
let p2 = p1
p2 = double(p2)
echo p1 // p1 reused here
echo p2
```

If we didn't track the usage of a variable,
then we'd have to copy variables more often.
Here's another place lifetimes come up:

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

The comments in `main` show how `double` is applied,
in a way.

We create a "copy" of `point`
to pass into `double` as `p`,
then we mutate `p` inside `double`
and then "copy" `p` to `point`.

The lifetime of `p` begins in the call to `double`
and ends when assigning the result back to `point`.
At the end of that lifetime,
`point` gets the same value as `p`.
Because the lifetime of `p` has ended,
`point` gets an exclusive alias to the value in `p`.
Additionally, the lifetime of `point` is suspended
while the lifetime of `p` is active,
because we're inside the `double` function.
The lifetime of `point` is resumed
after `p` is assigned to it at the end of `double`,
so `p` has an exclusive alias to the value in `point`
during the time that `p` is being used.
This means `p` and `point` can alias the same memory
without changing the behaviour of `main`.

With copy semantics,
the language is aware when
it's safe to mutate a variable,
so it will make copies when it shouldn't.

all the places where we use refs

All of this is an application of
Rust's Aliasing Xor Mutability rule,
where state can be aliasied or mutable,
but not both.

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
