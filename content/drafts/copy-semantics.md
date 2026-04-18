+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

Safe in-place mutation for high-level languages.

- summary of approach and benefits
  with allusion to extra ones

i'm explaining with matching left and right
with reuse analysis
right shares if it expects to mutate
left shares if it also expects that
both might also share reuse
right might be async or a closure or something - idk

Alright, let's explain how this all works.

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
for the mutable operation of appending to a list.

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
and `..` can then mutate it in place.

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

conditionals before functions?

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

I apologise for the arbitrary use of
"in place" and "in-place".
It just feels right in some places.

Moving on.

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
as what I described for operators.

Basically, operators and functions mutate in-place,
but what they're given to mutate
is determined by the caller.
We track what functions expect to mutate,
then we track what the caller intends to mutate
by observing what variables are being assigned to,
and we also track if a variable is reused.

I think the most useful feature of copy semantics
is that assignment indicates safe mutation,
where other languages must hand over mutable aliases
for all arguments to a function.
Users have to explicitly make defensive copies
to avoid potentially unsafe behaviour.
Everything else in copy semantics
flows from this feature.

Even parts of variables can be aliased the same way.
Operators and functions share
which fields or list items they expect to mutate,
and call sites determine the usage of aliases or copies
based on whether the fields or items are reused.
 
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
in reality only a thread is created it,
and it may execute before, after,
or even during the mutation of `a`.
Therefore, the thread must receive a copy of `a`,
which `print` can then alias safely.
Otherwise, the thread might sometimes print
`[1, 2, 3]`, sometimes `[10, 2, 3]`,
and maybe even some intermediate value
while the binary digits representing 1 (0001)
are changed to represent 10 (1010).
