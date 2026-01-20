+++
title = "Borrow inferrer"
date = 2026-01-20 13:59:52
updated = 2026-01-20 13:59:53
+++

Mutation thout annotations xor bugs.

The key part of Rust is sharing xor mutating,
where "xor" means "either but not both",
so you can share or you can mutate,
but you cannot do both at the same time.
This is a feature that would remove
an amazing amount of subtle aliasing bugs
and others if all the major languages could adopt it,
including high-level ones like Python and Go,
which would make them easier to use
and closer to the goals of high-level languages.
The ownership and performance aspects of Rust
are a sort-of side-effect of the share xor mutate rule,
though Rust makes some design decisions
that lean on them further.
Manish Goregaokar has an excellent post
on the subtler errors caused by shared mutability.

[The Problem With Single-Threaded Shared Mutability](https://manishearth.github.io/blog/2015/05/17/the-problem-with-shared-mutability/)

The problem with Rust is that
it requires explicit annotations for borrows and clones,
which is not suitable for a high-level language,
even if lifetimes are the truly scary bit.
Rust's language design suggests that
we must have annotations or we must have bugs,
but we cannot remove both while still allowing mutation.
However, I might have a way to completely remove bugs
and annotations at the same time,
by using Rust's share xor mutate rule
with a syntax tweak to infer clones, moves and borrows.

We start by looking at moves in Rust:

```
fn main() {
	let mut list = ["ay", "bee", "sea"];
	list = list_fn(list);
	dbg!(list);
}

fn list_fn(mut list: [&str; 3]) -> [&str; 3] {
	list[0] = "ecks";
	list
}
```

There's a borrow annotation because of
the specific string type,
but otherwise there's no reference
or lifetime annotations here.
It looks almost like a high-level language.
If we remove explicit borrow annotations,
then our new language would require assignment syntax
to invisibly mutate with moves or mutable borrows.

```
fun main()
	let mut list = ["ay", "bee", "sea"]
	list = list_fn(list)
	dbg!(list)

fun list_fn(list)
	list[0] = ["ecks"]
	list
```

This means that a function must return a parameter
if it intends to mutate it, and then we need to
assign the result back into the variable.
Conversely, if a function doesn't return a parameter,
that means it doesn't mutate it,
so it receives an immutable borrow or move.
Now `&` and `&mut` are inferred without annotations.
The call to `dbg!` above would use an immutable borrow
because it has a smaller lifetime and
it doesn't mutate `list`,
which means we can use `list`
even after passing it to `dbg!`,
which is not possible with Rust.

Values are copied when they're assigned to a new variable,
based on the fact that there's no point to
creating a new variable if you're going to have it
point to the same thing as the original.
The new variable needs to be different from the old,
so it needs to be copied.
Now we don't need `.clone()` or `derive(Copy)`.
In this example,`list2` is a copy of `list`
that is mutated by `list_fn`:

```
fun main()
	let list = ["ay", "bee", "sea"]
	let list2 = list_fn(list)
	dbg!(list)
	dbg!(list2)
```

Some types won't be magically copied in this way,
such as files and network connections,
and types that use them would also be treated the same.
The language would use moves when
assigning such values to a different variable,
and require explicit clones, if possible.
Any types that used those would also use
moves and explicit clones.
The compiler would provide built-in types and functions
for these resources.

Even iterators would ensure that we cannot
mutate a list directly while looping over it,
because iteration requires sharing,
which would prevent mutation.

```
fun main()
	let mut list = ["ay", "bee", "sea"]
	list = for list item {
		item = string.join(item, "!!")
		// ERROR:
		list = push(list, item)
	}
```

The `for` loop takes a mutable reference to each item
and mutates it in-place,
then returns the result with the reference.
It's similar to `map`,
but it allows mutable access to variables outside the loop.
If we wanted to add items to `list`,
we could loop over indexes or do it after the loop.

All this should give us most of Rust's performance
along with the safety guarantees,
but without any of the low-level annotations.
In fact, you could say this language is higher level
than Python and even functional languages,
because you don't need to think about references
or tail-call optimisation. 

The language would also
make numbers and other values use the same mutation syntax,
it would have only one string type,
it would have only one parameter passing method,
instead of references vs moves,
it would make functions much easier to reuse,
and it would allow chaining any normal functions
as long as their outputs and inputs match,
which is super fun!

```
fun main()
	["ay", "bee", "sea"]
	|> fn_one()
	|> fn_two()
	|> fn_three()
	|> dbg!()

fun fn_one(l)
	l[0] = "ecks"
	l

fun fn_two(l)
	l[1] = "why"
	l

fun fn_three(l)
	l[2] = "zed"
	l
```

You can learn more about chaining
by trying it out in Gleam,
where it's called piping.
The code example in the link below is interactive,
so you can edit it to see how it works.
You'll see that it's much more flexible
than method chaining.

[Chaining normal functions in Gleam](https://tour.gleam.run/functions/pipelines/)

The snippets I've shown so far
might remind some people of functional programming,
but this language would allow
clear in-place mutation,
higher performance,
and the popular imperative programming semantics.
That said, part of the inspiration for this
came around June 2025,
when I was wondering how to adopt pipes
from functional languages like Gleam
to imperative languages,
though learning and understanding Rust
showed a better way to achieve it.

[An inferior reference inference idea](https://pranabekka.github.io/all-you-need-is-pipes-and-assignment/)

Going back to the point,
we would have a language that's safe,
correct, high-level, familiar
to the vast majority of imperative
and low-level programmers,
high performance, and fun to use!
It wouldn't even have a garbage collector!
There's still a lot to figure out,
especially for concurrency,
but the compiler should be able to
provide built-in types and functions for it,
and we have a solid foundation regardless!

I hope you see the potential!
There's lots to figure out still,
so I'd love any feedback you have!
