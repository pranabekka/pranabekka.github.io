+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

Safe in-place mutation for high-level languages.

With copy semantics,
users don't need to think about aliasing
or defensive copies at all,
and they don't need to test as many things.

This is because all variables and function parameters
appear to be copies.
We just pass "copies" around
through variables and functions
without worrying about aliasing issues.

Because function parameters are like copies,
simply calling a function doesn't mutate a variable.

```
let a = "burp"
uppercase(a)
print(a) // burp
a = uppercase(a)
print(a) // BURP
```

Similarly, a variable can never be mutated
by assigning to another variable.
Mutation requires assigning to the variable.

```
let a = [1, 2, 3]
let b = a
b = reverse(b)
print(a) // [1, 2, 3]
print(b) // [3, 2, 1]
```

In most high-level languages,
`a` and `b` would have had the same values at the end,
because they usually use aliasing
for types like lists and structs.
Consider slices for Go, and objects for PHP and Swift.

Copy semantics will only perform copies
if two variables or more are used at the same time,
or might be used at the same time via async,
with different mutations applied to them.
In all other cases it will use aliases
while still appearing to use copies,
so that the programmer only thinks with copies
instead of being concerned about aliasing.

Understanding how it works under the hood
is not too complicated.
It should take 10 to 15 minutes
to get through this explanation,
I think.

Let's get into it.

```
let a = [1, 2, 3]
let b = a
print(a) // [1, 2, 3]
print(b) // [1, 2, 3]
```

Because `a` and `b` are guaranteed to remain constant,
they can be aliases to the same memory.

For this next example,
keep in mind that copy semantics allows
mutating all values in-place.
I'm going to use the `..` syntax
for the mutating operation
of adding items to a list.

```
let a = [1, 2, 3]
a = a .. [4]
print(a) // [1, 2, 3, 4]
```

The `..` operator expects to
mutate its first argument, `a`.
Because we assign the result of `..` to `a`,
`a` can be handed to `..` for mutating in-place.
This might not be the case
if we assigned to another variable.

```
let a = [1, 2, 3]
let b = a .. [4]
print(a) // [1, 2, 3]
print(b) // [1, 2, 3, 4]
```

Because we haven't assigned to `a`,
we don't expect `a` to be mutated,
yet we do expect to mutate `b`.
Therefore, the memory aliased by `a`
must be copied to a new location.
`b` can alias the memory at this new location,
and `..` can then mutate that in place.

This is an unusual feature of copy semantics.
An operator doesn't care about its argument list.
Instead, it gets an alias to the variable
that's on the left side of the assignment.
In the above example,
even though its argument list contains `a`,
the `..` operator works on `b`.

Moving on.

Sometimes memory is left unused by its aliases.

```
let a = [1, 2, 3]
let b = a .. [4]
print(b) // [1, 2, 3, 4]
```

Because `a` isn't reused after creating `b`,
there is no need to copy anything.
Instead, `b` can be an alias
to the same memory as `a`,
which can be mutated in place by `..`.

```
let a = [1, 2, 3]
let b = [4]
a = a .. b
print(a) // [1, 2, 3, 4]
print(b) // [4]
```

The `..` operator is guaranteed to
never mutate its second argument,
so it's safe to hand `..` an alias to `b`
in the above example.

Functions build upon base operations like `..`,
which means they have the same rules.

```
fun main()
	let a = [1, 2, 3]
	a = foo(a)
	print(a) // [1, 2, 3, 4]
	
fun foo(x)
	x .. [4]
```

`foo` expects to mutate the variable it receives,
because it takes in `a`
and its result is assigned back to `a`,
`foo` is handed an alias to `a`,
which it mutates in-place.

```
fun main()
	let a = [1, 2, 3]
	let b = foo(a)
	print(a) // [1, 2, 3]
	print(b) // [1, 2, 3, 4]
	
fun foo(x)
	x .. [4]
```

`foo` expects to mutate its argument,
but `main` doesn't expect to mutate it.
Instead, `main` expects to mutate `b`,
so `a` is copied to new memory,
which is aliased by `b` and the call to `foo`.

I think you can see that the rules for functions
follow the same shape
as what I described for operators,
so I'm not going to cover all possibilities.

Basically, functions mutate in-place,
but their parameter list
doesn't always match the argument list.
Instead, the parameters are determined
by the variables on the left side
of the assignment at the call site,
instead of the argument list on the right side.
If the right side variable isn't reused,
then the left and right can alias the same memory.

We track if a function mutates a variable,
we track where the caller wants that mutation,
and we also track if the caller doesn't care at all,
if it doesn't intend to use the variable.

The foundation of copy semantics' safety
is that assignment acts as a clear indicator
to track mutation.
Everything else we need to track
is enabled by this feature.

Even parts of variables can be aliased
the same way as operators and functions.
Functions share which fields or list items
they expect to mutate,
and call sites determine the usage of aliases or copies
based on whether the fields or items are reused.

```
let a = [1, 2]
let b = double_second(a)
print(a[0]) // 1
print(b[1]) // 4
```

`double_second` mutates the second item,
which is never used through `a`,
and is only used by `b`,
so `a` and `b` alias the same memory,
which is also passed to `double_second`.
There is no copying in this example.
 
With asynchronous code,
reuse analysis reaches some limits,
which means copies are created more often
to ensure correct behaviour.

```
let a = [1, 2, 3]
async print(a) // [1, 2, 3]
a[0] = 10
print(a) // [10, 2, 3]
```

While it appears as if the asynchronous call to print
occurs before the mutation of `a`,
in reality only a thread is created at that point,
and it may execute before, after,
or even during the mutation of `a`.
Therefore, the thread must receive a copy of `a`,
which the async `print` can then alias safely.

That explains nearly everything.
We'll briefly have a look at translations
to other languages
before I explain the underlying principles better.

I'm going to present examples
using the syntax and semantics I've been using,
and then follow them with possible translations
to Python, Go, Rust and C.

Try to guess what the translation could be
before having a look at whichever ones
you're familiar with.
Think about the least amount of copies possible,
using the rules I've presented.

```
fun main()
	let a = Position(x: 3, y: 2)
	let b = double(a)
	print(a) // Position(x: 3, y: 2)
	print(b) // Position(x: 6, y: 4)

type Position(x: Int, y: Int)

fun double(pos)
	pos.x = pos.x * 2
	pos.y = pos.y * 2
	return pos
```

{% details(summary="Python") %}
**TODO: CHECK IN PYTHON INTERPRETER**
```
def main():
	a = Position(x=3, y=2)
	b = a.copy().double()
	print(a) // Position(x=3, y=2)
	print(b) // Position(x=6, y=2)
	
class Position
	def __init__(self, x, y):
		self.x = x
		self.y = y
	
	def copy(self):
		return Position(self.x, self.y)
	
	def double(self):
		self.x *= 2
		self.y *= 2
```
{% end %}

{% details(summary="Go") %}
**TODO: CHECK IN GO PLAYGROUND OR PROJECT**
```
func main() {
	a := position { x: 3, y: 2 };
	b := a;
	double(*b);
	print(*a); // position { x: 3, y: 2 }
	print(*b); // position { x: 6, y: 2 }
}
	
struct position { x, y int }
	
func double(pos *position) {
	pos.x *= 2;
	pos.y *= 2;
}
```
{% end %}

{% details(summary="Rust") %}
**TODO: CHECK IN RUST PLAYGROUND OR PROJECT**
```
fn main() {
	let a = Position { x: 3, y: 2 };
	let b = a.clone().double();
	print(a) // Position { x: 3, y: 2 }
	print(b) // Position { x: 6, y: 2 }
}
	
#[derive(Clone)]
struct Position { x: i32, y: i32 }
	
impl Position {
	fn double(self: &mut Self) {
		self.x *= 2;
		self.y *= 2;
	}
}
```
{% end %}

{% details(summary="C") %}
**TODO: CHECK IN C PLAYGROUND OR PROJECT**
```
typedef struct {
	int x;
	int y;
} position;
	
void double(position* pos);
	
int main() {
	position a = { .x = 3, .y = 2 };
	position b = a;
	double(&b);
	print(a); // position { .x = 3, .y = 2 }
	print(b); // position { .x = 6, .y = 4 }
}
	
void double(position* pos) {
	pos->x *= 2;
	pos->y *= 2;
}
```
{% end %}

examples
- double using offset
  meaning two levels of indirection
  also a more complicated reuse analysis
- offset_twice

- no-copy types
- maybe loops
- credit rust

The rules we've explored so far
assume that all values can be copied trivially.
However, there are some types of values
that can't simply be copied.
For example, a file needs to know
where it must be copied,
and copying a network connection
doesn't really make sense.
These are "resource" types,
since they refer to external resources.

A value with a resource type must be unique,
and it preserves this by invalidating old aliases.

```
let a = open_file("example.txt")

// ERROR: File transferred from `a` to `b`.
let b = a

// ERROR: Attempt to reuse `a` after transfer.
write_all(a, "Hello")

let text = read_all(b)
print(text)
```

We fix the above example by never creating `b`.

```
let a = open_file("example.txt")
write_all(a, "Hello")
let text = read_all(a)
print(text)
```

That's the copy semantics system.

Sometimes aliasing might be desirable,
so there should be an escape hatch,
but it should be explicit,
instead of having people trip over it.
The language should nudge people
towards dealing with independent copies.

This makes it much easier for beginners
to learn programming,
because all variables start behaving the same,
like numbers and strings.
This reduces the rules they need to learn.
This also removes the need to track
how aliases move throughout the system,
which is particularly unintuitive for beginners.

Programmers who've dealt with aliasing
through defensive copies and thorough testing
should also benefit from moving faster
without breaking things.
When all function parameters become aliases
to variables from their caller,
this risks leaking implementation details,
where some intermediate calculation
mutates variables in the caller.
This means calling a function is risky,
and changing a function is also risky.
All callers will need to be tested every time.
Copy semantics eliminates this need.

Copy semantics also enables a few other things
that are nearly as exciting.

A simple one is that all functions can be chained,
because they must return values.
Function authors don't have to think about
adding a return statement,
and they don't need to think about what to return.

A more exciting property
is that all analysis is performed at compile time.

This makes it easy to compile
to other languages with mutation and aliasing,
as I showed in the comparisons
to Python, Go, Rust and C.
This allows us to benefit from their ecosystem,
which includes their tooling and platforms.
We can write code for browsers
with direct access to Web APIs,
we can translate to Python scripts
that can run on most Linux systems,
and we can translate to Go
for easily cross-compiling binaries.

Performing all analysis at compile time
means there's no garbage collector
or reference counting system,
which means smooth and fast performance
with minimal compiled program sizes.
