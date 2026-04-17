+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

Safe in-place mutation for high-level languages.

With copy semantics,
all variables, function parameters and return values
appear to be copies of each other,
yet they merely _appear_ to be copies,
hence the use of "semantics".
In truth, they are often aliases,
which means a language with copy semantics
will perform well, while also allowing safe mutation.

When I say safe,
I mean that a function can't simply mutate
any variable passed into it,
and mutating one variable
can never mutate another.
Not without clear indication of this capability.

With copy semantics,
this obvious indication is assignment.
A variable can only be mutated within a scope
if it has been assigned to inside that scope.

```
fun main()
	let a = [1, 2, 3]
	let b = a
	foo(a)
	b = foo(b)
	print(a) // [1, 2, 3]
	print(b) // [10, 2, 3]
	
fun foo(x)
	x[0] = 10
	return x
```

There are two unusual things here.
First, mutating `b` doesn't mutate `a`.
Second, `foo` mutates `b`, but not `a`.
Unlike other languages,
this is governed by usage, not the type.
Also, much like other imperative languages,
`b` is mutated in-place.

Copy semantics allows us to mutate like a pig in mud,
without worrying about aliasing rules,
defensive copies, or testing every change
for a possible aliasing issue.

This idea only works because we can use aliases
in most places that look like copies.
In fact, only variables with diverging state are copied.
Explaining how it works is a bit involved.

If you're familiar with Rust,
please hold off on comparisons for your first read,
because even though it's evolved from Rust,
it's a distinct application of Rust's safety rules.
Also keep in mind that this is competing on
ergonomics, not performance.

Alrighty, then.
On to how it works.

```
let a = "Hello"
let b = a
let c = a
```

All of the above variables have constant values,
even if they aren't declared as such.
This makes it safe to share the same memory.

```
let a = "Hello"
let b = a
b[0] = "F"
print(a) // "Hello"
print(b) // "Fello"
```

In the above example, `b` is mutated,
but the same mutation isn't applied to `a`,
thus `b` must receive a copy of `a`.

```
let a = "Hello"
let b = a
b[0] = "F"
print(b) // "Fello"
```

This time `a` still isn't mutated,
but neither is it used after being assigned to `b`,
so `b` can use an alias to the same memory
without any observable change.

```
let a = "Hello"
let b = a
b[0] = "F"
print(b) // "Fello"
a = b
print(a) // "Fello"
```

This time, `a` is used after mutating `b`,
but then the value from `b` is transferred to `a`
before observing any changes to `a`,
so they can both be aliases to the same memory.
It's best to think of it as
the memory for `"Hello"` being passed from `a` to `b`,
and then `b` passing the value back to `a`.

Parts of variables can be analysed the same way,
such as fields in a struct, or items in a list.

```
let a = [1, 2]
let b = a
b[0] = 10
print(a[1]) // 2
print(b[0]) // 10
```

We can think of this as two variables, `a1` and `b0`,
that use different parts of
the underlying memory that contains `[1, 2]`.
Both access independent parts of the memory,
so they can be aliases to the same memory as `a`.

```
fun main()
	let a = "Hello"
	a = foo(a)
	print(a) // "Fello"
	
fun foo(b)
	b[0] = "F"
	return b
```

Much like the earlier examples,
the memory containing `"Hello"` is
passed from `a` to `b`,
then the memory is mutated via `b`,
and the memory is finally handed back to `a`.

```
fun main()
	let a = "Hello"
	foo(a)
	print(a) // "Hello"
	
fun foo(b)
	b[0] = "F"
	return b
```

Here, there's some memory handed over to `b`,
but `a` doesn't take it back,
yet `a` is reused later.
Since `b` expects to mutate the memory,
and it can't be allowed to mutate `a`'s memory,
`b` must be handed a copy of `a`.

```
fun main()
	let a = "Hello"
	let c = foo(a)
	print(a) // "Hello"
	print(c) // "Fello"
	
fun foo(b)
	b[0] = "F"
	return b
```

The above example is similar to the previous,
where `a` doesn't take back the memory
handed over to `b`,
but this time `c` takes the memory from `b`.
We do a simple assessment here:
`a` must not be mutated,
`b` expects to mutate its memory,
`b` is handed back to `c`,
so `c` receives a copy of `a` in a new memory location,
which is passed over to `b` and then taken back.

In general, function or not,
when dealing with mutation via `=`,
if the left and right side variables don't match,
then the left side receives a copy of the right.
In the previous example, `c` is left and `a` is right,
and because they're different variables,
`c` receives a copy of `a`.
The exception to the rule
is when the right side isn't used after that point,
in which case the left can reuse the same memory.

```
fun main()
	let a = "Hello"
	let c = foo(a)
	print(c) // "Fello"
	
fun foo(b)
	b[0] = "F"
	return b
```

Because `a` isn't used after assigning to `c`,
mutating the same memory won't affect the program,
which means that the alias can be passed to `b`,
and then `c`.

```
let a = "Hello"
let b = a ++ "!"
a = a ++ "o"
print(a) // Hello
print(b) // Hello!
```

In the declaration of `b`,
`a` is on the right, but not the left,
so the value `a` aliases is copied to a new location,
and `b` gets an alias to that memory.
In the line after that, `a` is on the left and right,
so it gets mutated in place.

```
let a = "Hello"
let b = a ++ "!"
print(b) // Hello!
```

Because `a` isn't used after assigning to `b`,
no copy will occur here.
`b` will simply reuse the memory
`a` is no longer using.

With functions,
the compiler creates an invisible "signature"
that records what the function expects to mutate,
which can be used trivially at call sites.

- closures

Async generally needs more copies,
because two threads taking a variable
will rarely have guarantees about
which one will use it first.

```
fun main()
	let a = "Hi"
	async foo(a)
	async foo(a)

fun foo(x)
	x = x ++ "!"
	print(x)
	
they're not mutating `a`
they'll receive copies anyway
though `a` isn't reused
```

Loops are a bit unusual as well.
I'll explain why, shortly.

```
let list = [1, 2, 3]
for item in list
	return item * 2
print(list) // [1, 2, 3]
```

Loops work on a "copy" of the list,
just like functions with copy semantics.
You need to assign the result of the loop to something.

```
let list = [1, 2, 3]
list = for item in list
	return item * 2
print(list) // [2, 4, 6]
```

Now `list` is finally mutated.
And because the right and left both use `list`,
the loop will work on an alias of `list`
instead of copying it back and forth.

The `return` is the result of each loop iteration,
which is assigned to each item the loop works on.
It's like the loop does `item = result`,
which becomes `item = item * 2`, in this case.
Because the left and right are the same,
this uses an alias.
This allows us to use `continue` and `break`
to skip an iteration of the loop
or stop it entirely.

```
let list = [1, 2, 3]
let list_2 = for i in length(list)
	list[i] = list[i] * 10
	if i == 1
		continue
	else
		return i
print(list) // [10, 20, 30]
print(list_2) // [0, 2]
```

Loops can mutate external variables normally.
Additionally, because the left side is `list_2`
while the right side is `list`,
`list_2` receives a copy of the memory behind `list`,
and then the loop works with an alias of `list_2`.

Closures must also receive a copy of any variables
that they close over without returning them back.

That covers everything.

---

The biggest benefit of all of this is that
everything appears to be copies,
and it doesn't depend on the type of the variable.
This makes it much easier to reason about a function,
because all the relevant details are
within the function.
You can see exactly which variables
might be mutated.

Functional programming languages
have the same properties,
and perhaps even better ones,
but they're too different from the mainstream.
Additionally, without severe hardware changes,
low-level languages cannot be functional languages,
so promoting functional languages
for high-level programming
would create a hard divide between the two.
Copy semantics presents a much smoother transition
from one to the other.

While there might be concerns
about the speed of this inference,
it's easy to tune it for release and debug builds.
Debug builds can resort to copies more often,
especially when it's for parts of variables,
while a release build can take its time.
Additionally, for really fast builds,
copy-on-write can be used
for the same safety guarantees
at the cost of slower performance.

Speaking of performance,
copy semantics can be translated to
any language with references
without degrading performance.
Let's start with the following example
using copy semantics.

```
let a = [1, 2, 3]
let b = a
a[0] = 10
print(a) // [10, 2, 3]
print(b) // [1, 2, 3]
let c = a
c[1] = 20
print(c) // [10, 20, 3]
```

I'm going to translate this to
a few different languages,
such as Python, Go, Rust and C.

I think you can see how this translates to Python.

```
a = [1, 2, 3]
b = copy(a)
a[0] = 10
print(a) // [10, 2, 3]
print(b) // [1, 2, 3]
```

Here's how Go might look.

TODO: Go
TODO: Rust
TODO: C

From the Rust and C translations
you might be able to intuit that copy semantics
allows compile time memory management,
because its tracking all references and copies
even to generate the code for the other languages.
This means copy semantics removes
the need for a garbage collector
and creates much faster programs.

As another bonus,
all functions can be chained,
without any extra consideration,
because they must return values to mutate.

If you know Rust,
we're using lifetimes, ownership,
and Aliasing XOR Mutability.
I think the lifetimes and ownership are obvious,
where memory is passed back and forth
from one variable to another.
The Aliasing XOR Mutability rule is what governs
when aliasing is safe, and when values must be copied.
