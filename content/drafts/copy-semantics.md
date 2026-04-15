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

using assignment shows which vars to mutate,
instead of making all func params mutable refs

we can then track which variables can be safely shared,
versus which ones must be kept distinct via copies

variables usually get freed at the end of the scope
they're created in
sometimes they're passed outside that block
in which case they last longer
or should i describe variables having a lifetime?
or the values having a lifetime?
a variable is an alias to a value in memory
when passing a value across scopes
it can be aliased by different variables
sometimes the value needs to be copied
so that the variables refer to distinct values

constant variables can be shared safely.
this includes a function parameter that's unchanged

anything further requires tracking where the value goes,
from one variable to another,
across functions and threads

the value from main point is assigned to double point,
then it gets mutated
and the new value is assigned to main point.
during each stage, the value has only one alias.
first main point, then double point, then main point.

the difference between threads and functions
is that even if a thread is spawned after another,
the variables could be in use at the same time,
so we shouldn't rely on that information.
....
with one mutating one reading,
the mutation applies after awaiting the thread?
ah, but the thread starts before awaiting
so it can't be aliased

## Concerns

### Resource management

can't simply copy files and whatnot
invalidate previous references

### Escape hatches

### Compile times

Performing all this analysis
might take longer to compile.

Development builds could use quick compiles
with a run time that performs copy-on-write,
while release builds take longer
to optimise everything at compile time.

Sharing variable fields could be suspended
for development builds.

### Mixed mutation and declaration

## Additional benefits

As I alluded to in the beginning,
aliasing errors require defensive copies
or thorough testing for every function change,
but copy semantics eliminates that,
allowing people to focus on core functionality.

In addition to safety,
copy semantics also present nicer APIs,
better performance,
and other benefits.

### Easy onboarding

Only having to deal with "copies"
makes it easier to learn the language,
instead of remembering the aliasing rules
for different types.

Not having to deal with aliasing errors
is especially helpful for beginners to programming.

### Chain everything

### Performance

Aliases and copies are tracked at compile time,
which can also be used to determine memory usage
at compile time,
thus removing the overhead of a garbage collector.

### Safe transpile

A language with copy semantics can compile to
other languages that support aliasing
by using them where required.
This includes all the mainstream imperative languages,
and most of the less popular ones as well.

Take the following example for copy semantics
in the made-up language I've been using:

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

### Easy bootstrap/port
