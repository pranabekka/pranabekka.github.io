+++
title = "Reference inference (4)"
## remember to change date on publishing
date = 2026-01-01 22:20:03 # draft date
updated = 2026-01-01 22:20:03
+++

Mutation without bugs xor annotations.

Mutating variables means using references,
which are the foundation of some of the worst bugs
in the popular (imperative) languages,
including Python, Go, JS/TS, Java, C#, Swift and more.
They won't even crash your program
but instead change variables across
completely unrelated parts of your code.
You can't be sure exactly how the function
you're working on or calling
will interact with other functions,
so you often need to test every time you call a function
or add runtime assertions,
or just reimplement things from scratch.
Rust solves this issue by restricting references,
but the cost is lots of different annotations
and a difficult learning curve.
Manish Goregoakar has an excellent article on
the benefits of Rust's reference restrictions,
which covers more than just the bugs I'm talking of,
but all of which arise from references and mutation.

[The Problem With Single-threaded Shared Mutability](https://manishearth.github.io/blog/2015/05/17/the-problem-with-shared-mutability/)

I would like that safety without juggling
reference and lifetime annotations,
even if it sacrifices some performance
and low-level control.
Functional programming languages are so high-level
that users don't have to think about references at all,
although they need to learn about
stack frames and tail-call optimisation.
It's easier to manage than references,
but the bigger hurdle might be the sheer inertia of
imperative programming languages and their users,
which have roots in low-level languages,
and they will always require mutability.

I believe I have a key piece for a high-level language
that achieves mutable reference safety like Rust
while hiding reference annotations entirely.
The journey starts with the following Rust snippet:

```
fn main() {
	let mut list = ["ay", "bee", "sea"];
	list = list_fn(list);
	dbg!(list)
}

fn list_fn(l) {
	l[0] = "ayyyy"
	l
}
```

This is not a copy,
this is not the reference passing
of high-level imperative languages,
this is a move, or transfer of ownership,
of the primary reference to the value,
which is an important mechanism for keeping
references in check.
If `list_fn` did not return that primary reference back,
then we wouldn't be able to reuse `list`
for the `dbg!` call in `main`.

This is the foundation for removing `&mut` references.
Instead of those, our new languages uses
assignment syntax to pass around ownership
or mutable references, as required.
After that, removing immutable references is easy.
If an argument goes into a function but isn't returned,
that means it's not being mutated,
so it can be passed as an immutable reference.
So, in our new language,
`dbg!` would get an immutable reference to `list`
without us having to specify it.

```
pub fun main()
	let mut list = ["ay", "bee", "sea"]
	dbg!(list)
	list = list_fn(list)
	dbg!(list)

fun list_fn(l)
	l[0] = "ayyyy"
	l
```

The syntax is only changed to look different
from the Rust snippets.

Finally, copies are used when creating a new variable.
The reasoning here is that we assign to a new variable
when we want to treat the previous one differently,
which means we need the two to be fully independent.
If both variables had to be treated the same,
then there would be no need to create a new variable.

```
pub fun main()
	let mut list = ["ay", "bee", "sea"]
	list_two = list_fn(list)
	dbg!(list)     // ["ay", "bee", "sea"]
	dbg!(list_two) // ["ayyyy", "bee", "sea"]
```

Rust's aliasing xor mutability rule
shows up explicitly if we attempt loops,
because our language won't allow
mutating a collection while looping over it.

```
pub fun main()
	let mut list = ["ay", "bee", "sea"]
	list = for list item {
		item = string.join(item, "!!")
		// Error:
		list = push(list, item)
	}
```

The workaround would be to loop over indexes
or mutate the list after the loop.

So, all that said, we have a language
with smart and safe reference inference
that is also easy to use for imperative programmers.
It helps us focus on the core program
without thinking about memory management.

There's a few more things about this proposed language
that I find pretty cool.

For one, it's higher-level than Python, in a way,
because you don't need to think about references.
This means you can pass variables to functions
without worrying about what the functions might do
to the variables.
You can reuse functions more often.

In another way, this language is higher-level
than functional programming languages,
because you don't need to learn about stack frames
and tail-call optimisation.

By removing copies and tedious reference management,
users are not tempted to use copies,
as is often the case when getting stuff done in Rust.
This means that the computer can identify
the lowest number of places where copies are required,
which results in more optimised software.

The compiler can also tone down the reference inference
and use more copies for quick debug builds
when compile-time speed matters more than runtime,
which is very helpful for iterating on a program.

A really cool thing, for me,
is that all functions can be chained together
as long as their inputs and outputs match,
because they all return values to mutate.
Other languages require stuffing it in as a method
and returning a reference after the work is already done
just for chaining.

```
pub fun main()
	["ay", "bee", "sea"]
	|> fn_one()
	|> fn_two()
	|> dbg!()

pub fun fn_one(l)
	l[0] = "ayyyy"
	l

pub fun fn_two(l)
	l[1] = "beeee"
```

A small cool thing is that tooling and people
can be sure that something odd is going on
when return values are ignored.

Another small thing is that mutating numbers
looks the same as mutating any other value,
even though numbers use copies.
It's kinda neat, though.

Also, functions cannot mutate anything
without their return value being assigned to something.
It ties into many of the other benefits,
and helps reason about the current function
without knowing much about other code.

All of this combines to make
a safe and performant high-level language
that's really easy and fun to use.
