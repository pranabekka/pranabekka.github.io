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
It is however, a perversion of Rust's rules ---
hopefully a delightful one,
since it's better suited to scripting and
applications programming, as it were.
Since it's a perversion,
I'm going to explain it from scratch.
If you do know Rust,
you might want to forget everything you know about it,
at least until you've read this at least once.
I won't mention Rust while I'm explaining all of it,
so you'll have to draw parallels yourself.

Now, let's see how variables are tracked.
To do this,
we must distinguish the values and variables.
Variables are simply names that refer to values
that are stored on the computer.
Values are the actual data, in a sense,
while variables are simply aliases to them.
This distinction should become clearer as we go on.

A value can be aliased by multiple variables
over the course of the program.
For example,
when passing a variable as a function argument,
the relevant parameter in the function
is a new variable aliasing the same value
as the variable that was passed in at the call site.
In the example below,
`variable` and `parameter` are both variables
that alias `[1, 2, 3]`.

```
fun function_1()
	let variable = [1, 2, 3]
	func_2(variable)
	
fun function_2(parameter)
	print(parameter)
```

The key difference between the two is of time.
At any given time,
the value `[1, 2, 3]` is aliased by only one variable.
At first, this is `variable`,
and then it is `parameter`,
and then whatever parameter name is specified for
`print`.
