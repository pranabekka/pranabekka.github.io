+++
title = "Mutable copy semantics"
## remember to change date on publishing
date = 2026-05-10 19:49:14 # draft date
updated = 2026-05-10 19:49:14
+++

Performant, safe and ergonomic high-level mutability.

in response to reply by gasche on r/programminglanguages
i don't think i can do operational semantics
until a few weeks
but i can do several examples
and make up an ir
i've already done these to various degrees

---

This separates the semantics and optimisations
for Mutable Copy Semantics.
First I'll go through various examples
to show how programming might look,
including good and bad examples,
then I'll go through various examples
and the optimisations that would apply to them.

The "IR" I've used is the same syntax
with some small rewrites and inline comments
to explain what's happening.
I think it should be enough,
but please let me know
if I can make anything clearer.

## Semantics

Users cannot create or observe
references in the language.
All variables appear to be independent copies.

`double` gets a copy of `point`,
so point isn't mutated.

```
let point = (1, 2)
double(point)
print(point)
// (1, 2)
```

Assigning to `point` will change its value.

```
let point = (1, 2)
point = double(point)
print(point)
// (2, 4)
```

`double` must return a copy of its result.

```
fun double(p)
	p.0 *= 2
	p.1 *= 2
	p
```

If `double` doesn't return anything,
then it can't share its work with callers.

```
fun main()
	let point = (1, 2)
	point = double(point)
	print(point)
	// Nil

fun double(p)
	p.0 *= 2
	p.1 *= 2
```

A type system can catch the error above,
but MCS works with or without it.

These are the same semantics that apply to
numbers and strings in most high-level languages.

```
let n = 2

double(n)
print(n)
// 2

n = double(n)
print(n)
// 4
```

However, compound types usually have
reference semantics.
Here's a Python list, for example:

```
def main():
	list = [1, 2]
	double(list)
	print(list)
	// [2, 4]

def double(l):
	l[0] *= 2
```

If `double` returned a value,
it might link two variables together.
In the following example,
mutating `l1` changes `l2`.

```
def main():
	l1 = [1, 2]
	l2 = double(l1)
	print(l2) // [2, 4]
	l1[0] += 3
	print(l2) // [5, 4]

def double(l)
	l[0] *= 2
	l[1] *= 2
	return l
```

Copies avoid this issue.
In the following example,
with copy semantics,
mutating `l1` has no effect on `l2`.

```
fun main()
	let l1 = [1, 2]
	let l2 = double(l1)
	print(l2) // [2, 4]
	l1[0] += 3
	print(l2) // [2, 4]

double(l)
	l[0] *= 2
	l[1] *= 2
	l
```

Loops are familiar at first glance.

```
let list = [1, 2, 3]
for i in 0..len(list)
	list[i] *= 2
print(list)
// [2, 4, 6]
```

I could've used a more familiar semantics
when iterating over the items (not the index),
but I chose to use return values and assignment
for loops to update items directly.

In the following example,
we never assign anything to `list`,
so it doesn't get mutated.

```
let list = [1, 2, 3]
for item in list
	item *= 2
print(list)
// [1, 2, 3]
```

We also didn't return anything
from the individual iterations of the loop.
Each iteration mutated its own copy of `item`,
but it returned nothing (`Nil`).

```
let list = [1, 2, 3]
list = for item in list
	item *= 2
print(list)
// [Nil, Nil, Nil]
```

As before, a type system would catch this error,
but MCS works with and without.

In the next example,
each iteration returns a value,
and the loops returns them as a whole.

```
let list = [1, 2, 3]
list = for item in list
	item * 2
print(list)
// [2, 4, 6]
```

Because loops work on a copy,
assigning to a different variable
won't affect the original.

```
let list = [1, 2, 3]
let list2 = for item in list
	item * 2
print(list)  // [1, 2, 3]
print(list2) // [2, 4, 6]
```

`continue` means an iteration doesn't return a value
and the loop goes to the next iteration.

```
let list = [1, 2, 3]
list = for item in list
	if item == 2
		continue
	else
		item * 2
print(list)
// [2, 6]
```

`break` means all future iterations are skipped.

```
let list = [1, 2, 3]
list = for item in list
	if item == 2
		break
	else
		item * 2
print(list)
// [2]
```

Because loops work on a copy,
they can mutate the original collection
while avoiding iterator invalidation issues.

In the following example,
other languages would've iterated forever,
but the loop has its own copy of `list` and its items,
which is put in `list2`.

```
let list = [1, 2, 3]
let list2 = for item in list
	list = list ++ [item * 2]
	item
print(list)
// [1, 2, 3, 2, 4, 6]
print(list2)
// [1, 2, 3]
```

There's an interesting form of "invalidation"
that does occur, though,
when the original collection is mutated inside the loop,
and then the result of the loop is also
assigned back to the original collection.

In the following example,
when assigning the result back to `list`,
the mutations of `list` within the loop are erased.

```
let list = [1, 2, 3]
list = for item in list
	list = list ++ [item - 1]
	print(list)
	// loop 1: [1, 2, 3, 0]
	// loop 2: [1, 2, 3, 0, 1]
	// loop 3: [1, 2, 3, 0, 1, 2]
	item * 2
print(list)
// [2, 4, 6]
```

Implementations might report this to the user
as a warning or error
if the intermediate value isn't used.

There's more details to work out with iteration,
but this is a fairly usable subset.

Closures also get copies.

In the following example,
the copy within the closure isn't mutated
by the assignment to `x` outside the closure.

```
let x = [1, 2]
let f = fun (): print(x)
x[0] = 10
print(x) // [10, 2]
f()      // [1, 2]
```

In the following example,
the mutation within the closure
doesn't affect `x` outside the closure.

```
let x = [1, 2]
let f = fun ()
	x[1] = 20
	print(x)
f()
// [1, 20]
print(x)
// [1, 2]
```

Threads work in a similar way to closures.
Copies prevent threads from
messing up data for other threads.

In the following example,
`x` is copied to the secondary thread
before being mutated by the main thread,
so the mutation isn't shared.

```
let x = [1, 2]
async
	await timeout(10)
	print(x)
	// [1, 2]
x[0] = 10
print(x)
// [10, 2]
```

In the following example,
`x` is copied to the secondary thread,
so its mutation doesn't affect the value of `x`
in the main thread.

```
let x = [1, 2]
async
	x[1] = 20
	print(x)
	// [1, 20]
print(x)
// [1, 2]
```

`async` returns a thread/promise that can be `await`ed,
which will return the value calculated by the thread.

```
let x = (1, 2)
let thread = async double(x)
x = await thread
print(x)
// (2, 4)
```

Jcparkyn's experimental Herd language
has similar semantics by using Copy-on-Write structures,
but my proposal does compile time analysis
to reduce the overhead at run time.

[Herd](https://github.com/Jcparkyn/herd)

## Optimisations

While using copies everywhere prevents issues
caused by aliased mutability,
it leads to severe performance costs.
Instead, we can ensure
all mutations use a unique alias.

In the following examples,
`/*` begins an inline comment
and `*/` ends that comment.

In the following example,
`a` and `b` are not mutated,
so they can be aliased.

```
let a = [1, 2, 3]
let b = /*alias*/ a
```

Similarly, `print` doesn't mutate its arguments,
so it receives an alias.

```
let a = [1, 2, 3]
print(/*alias*/ a)
```

Mutating functions also receive aliases,
but first let's cover passing mutatable aliases
between variables.

In the following example,
`b` receives a unique alias
to the same memory as `a`,
which it mutates,
then that unique alias is passed back,
after which `a` and `b` share an immutable alias
because neither variable mutates the memory again.
Before `a = b`, `a` isn't used at all,
that's why `b` has an unique alias
during that time.

```
let a = [1, 2, 3]
let b = /*alias*/ a
b[0] = 10
a = /*alias*/ b
print(a) // [10, 2, 3]
print(b) // [10, 2, 3]
```

If `a` was used before `a = b`
then `b` would have to be a copy.

In the following example,
in between `let b = a` and `a = b`,
we mutate the memory for `b`
and we also access the memory for `a`,
so `b` must have a unique alias by copying
the value from `a` into new memory.

```
let a = [1, 2, 3]
let b = /*copy*/ a
b[0] = 10
print(a) // [1, 2, 3]
a = /*copy*/ b
print(a) // [10, 2, 3]
print(b) // [10, 2, 3]
```

Because we didn't assign to `a`,
we know that it shouldn't be mutated
in the first `print(a)` call,
and so `b` must have its own memory.

In the following example,
`double` receives an alias to `a`
and mutates it in place.

```
fun main()
	let a = (1, 2)
	a = double(a)
	print(a) // (2, 4)

fun double(x)
	x.0 *= 2
	x.1 *= 2
	x
```

It might be better explained
by putting the body of `double` inside `main`.

In the following example,
`a` isn't used while `x` is being mutated,
and then `x` is passed back to `a`,
so `x` receives a unique mutable alias
to the same memory as `a`,
and then the alias is passed back to `a`.

```
fun main()
	let a = (1, 2)

	// `double` accepts parameter `x`.
	x = /*alias*/ a
	x.0 *= 2
	x.1 *= 2

	// Return value of `double` assigned to `a`.
	a = /*alias*/ x
	print(a) // (2, 4)
```

In the following example,
`double` receives an alias to `b`,
and `b` is a copy of `a`.

```
fun main()
	let a = (1, 2)
	let b = double(a)
	print(a) // (1, 2)
	print(b) // (2, 4)
```

Let's rewrite the example to make it clearer.

In the following example,
`b` is treated the same as `a`
in the example where we
put the body of `double` inside `main`.
This means an alias of `b`
is passed to `double` as `x`.
Because `b` is being mutated
without passing it back to `a`,
`b` must be a unique alias to separate memory,
which means it must be a copy of `a`.

```
fun main()
	let a = (1, 2)
	let b = /*copy*/ a
	b = double(b)
	print(a) // (1, 2)
	print(b) // (2, 4)
```

Functions _always_ receive and return aliases,
but the callers decide _what_ they receive aliases to.

In the second last example, repeated below,
`main` wanted the mutation from `double`
to apply to `b`,
so it passed an alias to `b`.

```
fun main()
	let a = (1, 2)
	let b = double(a)
	print(a) // (1, 2)
	print(b) // (2, 4)
```

Assignment indicates _what_ should be mutated,
which means what alias should be passed.

In the following example,
`a` isnt' reused,
so `double` receives an alias to it
even though we don't assign to `a`.

```
fun main()
	let a = (1, 2)
	double(/*alias*/ a)
```

If a caller doesn't reuse a variable,
it can pass an alias to the variable
even though the result isn't assigned to the variable.

**TODO**: doesn't share internal details

```
fun main()

// Mutates param internally, doesn't return.
fun print_sorted(l)
```

Loops use these same rules in obvious ways.
That means they always receive aliases,
but the call site decides
what they receive an alias to.

In the following example,
the loop receives an alias to `list`,
because while the loop is running
it has a unique alias,
which is passed back to `list` at the end,
using `list = ...`.

```
let list = [1, 2, 3]
list = for item in /*alias*/ list
	item * 10
print(list)
// [10, 20, 30]
```

In the following example,
the loop doesn't pass its alias back to `list`,
so it must alias new memory
created by copying `list`.

```
let list = [1, 2, 3]
for item in /*copy*/ list
	item * 10
print(list)
// [1, 2, 3]
```

In the following example,
`list2` receives a copy of `list`
and the loop receives an alias to `list2`.

```
let list = [1, 2, 3]
let list2 = for item in /*copy*/ list
	item * 10
print(list)  // [1, 2, 3]
print(list2) // [10, 20, 30]
```

In the following example,
the closure captures an alias to some memory
and then the main function mutates `x`,
so the closure must receive a copy
to prevent aliased mutation.

```
let x = (1, 2)
let f = fun (): print(/*copy*/ x)
x.0 = 10
print(x) // (10, 2)
f()      // (1, 2)
```

In the following example,
`x` isn't mutated while `f` is used,
so `f` receives an alias to `x`,
after which the main function has a unique alias
that it can mutate freely.

```
let x = (1, 2)
let f = fun (): print(/*alias*/ x)
f()      // (1, 2)
x.0 = 10
print(x) // (10, 2)
```

Threads work the same way.

In the following example,
the secondary thread is spawned with a copy of `x`
because the main thread requires
a unique mutable alias to mutate.

```
let x = (1, 2)
async
	print(/*copy*/ x)
	// (1, 2)
x[0] = 10
print(x)
// [10, 2]
```

In the following example,
the secondary thread requires a unique mutable alias,
so it receives its own copy of `x`
that doesn't impact the main thread.

```
let x = (1, 2)
async
	// let x = /*copy*/ x
	x[1] = 20
	print(x)
	// (1, 20)
print(x)
// (1, 2)
```

In the following example,
the thread has receives a unique alias to `x`,
which it passes back to the main thread
in the next line using `await` and its return value,
so there are no copies involved.

```
let x = (1, 2)
let thread = async double(/*alias*/x)
x = await thread
print(x)
// (2, 4)
```

That covers everything I can think of.

Functions always receive aliases,
but they receive aliases to the variables
on the left-hand side of the assignment,
not necessarily the variables in the argument list.
Mutating via an alias requires that alias to be unique,
which is checked by comparing other aliases
and using copies if required.

I want to end with a small example.

```
fun main()
	let a = "Hey"
	let b = "Hi"
	print(exclaim(longer(a, b)))
	// "Hey!"

fun longer(s1, s2)
	if len(s1) > len(s2)
		s1
	else
		s2

fun exclaim(s)
	s = s .. "!"
	s
```

`longer` receives aliases because it doesn't mutate,
but `exclaim` receives an alias
because `a` and `b` aren't reused,
otherwise it would receive a copy of
whatever is returned by `longer`.
