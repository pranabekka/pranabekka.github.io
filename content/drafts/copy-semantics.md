+++
title = "Copy semantics"
## remember to change date on publishing
date = 2026-04-08 18:21:31 # draft date
updated = 2026-04-08 18:21:31
+++

High-level mutability without defensive copies and
other aliasing issues.

Mainstream high-level languages have pervasive aliasing,
which causes crashes and even silent errors.
This is addressed by defensive copies
and testing every function change thoroughly.
As Rust and functional programming languages show,
a better aliasing strategy allows us to
move faster without breaking things.
At least once you're past the initial learning curve.
With copy semantics,
we get the same benefits with a lower learning curve,
those benefits being plain old mutability
without needing careful workarounds like
defensive copies and tests for each function change.

What does this look like?
Well, it looks like any other language,
but variables can only be mutated in a given scope
if they're assigned to in that scope.
This means that we are guaranteed,
in the following example,
that `foo` can never mutate `name`.

```
fun main()
	let name = "Avery Beverly"
	foo(name)
```

To mutate `name`, we would have to assign to it.
Unlike other languages, this must be in the same scope.
Incidentally, when I compare languages,
I'm talking about mainstream high-level languages,
unless explicitly stated otherwise.
Back to the matter of mutating `name`:

```
fun main()
	let name = "Avery Beverly"
	name = foo(name)
```

With the assignment,
we now know that `foo` might mutate `name`.

```
fun foo(name)
	if name == "Avery Beverly"
		return name
	else
		return "Avery Beverly"
```

This might look like functional programming,
but there's two surface-level differences,
and a big underlying one as well.

First,
though it's not a big deal,
we can easily mutate parts of a variable:

```
let point = Point(x: 3, y: 3)
point.x = point.x + point.x
```

Second,
we can mutate variables outside a loop.

```
fun main()
	let strings = ["A", "B", "C", "D"]
	for idx in strings.len - 1
		strings[i] = strings[i] ++ string.repeat("!", i + 1)
	print(strings)
	// ["A!", "B!!", "C!!!", "D!!!!"]
```

Now, the third, big, underlying difference,
from functional languages,
is that all values are mutable in-place.
Even mainstream languages make some types immutable,
such as strings,
but copy semantics have a better aliasing strategy.

Much like Rust,
copy semantics tracks the usage of variables
to determine when it's safe to alias them.
It is however, a perversion of Rust's rules,
to better suit scripting and application programming,
so I'm going to explain it from scratch.
Even if you do know Rust,
it might be better to give a decent skim
before attempting to translate concepts.

Now, let's see how variables are tracked.

Over the course of the program,
values are passed through multiple variables.

```
fun main()
	let a = "Hello"
	let b = a
	foo(a)

fun foo(x)
	print(x)
```

In the above example,
`"Hello"` is passed to `a`,
then it is passed to `b`,
and finally it is passed to `x` inside `foo`.
Since none of them are mutated,
they can alias the same value in memory.

Let's say one of them was mutated.

```
fun main()
	let a = "Hello"
	let b = a
	foo(a)
	
fun foo(x)
	x = x ++ "!"
	print(x)
```

In the above example,
`x` is mutated,
so it shouldn't share memory with `a` and `b`,
lest they be mutated by surprise.
However, `a` and `b` aren't reused after
`x` is mutated.
This means `x` is actually a unique alias
to the underlying value,
and doesn't need to be copied
to a separate place in memory.
`x` can be mutated in-place.

Now let's reuse one of the aliases after `x`.

```
fun main()
	let a = "Hello"
	let b = a
	foo(a)
	foo(b)
	
fun foo(x)
	x = x ++ "!"
	print(x)
```

In the above example,
`a` is passed to `b`,
then `a` is passed to `x`, which is mutated.
While `a` doesn't get reused after that point,
`b` does get reused.
So `a` can be shared with `x`,
but `b` needs to be copied to a new memory location,
otherwise it'd become `"Hello!"`
through the shared alias with `a`,
and then it'd become `"Hello!!"`
with the second call to `foo`.
So when we declare `b`, it gets a copy of `a`,
instead of aliasing the same memory.

If there's multiple aliases with overlapping uses,
where at least one is mutable,
the mutable one must be copied to a new location.
