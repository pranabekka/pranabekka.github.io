+++
title = "Initially superficial"
## remember to change date on publishing
date = 2025-11-15 21:17:10 # draft date
updated = 2025-11-15 21:17:10
+++

From piping in Rust through automatic borrowing.

I'm still learning about the practice of programming,
though I've read a lot about it for over a decade,
so I can't really say if my idea is impossible,
but I've been ruminating about this for a few months,
and I've come to the conclusion that it's possible
to completely infer references and lifetimes,
without even sacrificing performance,
though it will take work to fit in.

All this started with me learning Rust and Gleam
around the same time.
I was fascinated by pipes in Gleam,
and I was wondering how it might be used
in a language with mutation.
The conclusion I drew at the time was to use ownership.
It looks just like passing values in Gleam,
and if everything is passed by ownership,
then things can be trivially piped together.

```
fun main() {
	let me = get_random_post()
		|> parse_metadata()
		|> get_authors()
		|> find_author("Pranab")
	dbg!(me)
}
fun get_random_post() -> Post { .. }
fun parse_metadata(post: Post) -> Metadata { .. }
fun get_authors(meta: Metadata) -> List<Author> { .. }
fun find_author(authors: List<Author>, name: String) { .. }
```

Piping allows us to avoid intermediate variables
and it makes method chaining much more general.
It can be applied to any functions with matching
input and output types.
Piping defaults to placing at the first position,
but you can place it at any point.
Gleam uses the `_` to mark where it should go.

```
let user = get_input("Thy name?")
	// _ is in second argument place.
	|> find_author(authors, _)
```

This is a surface-level feature though.
It seems like it's only for making code look pretty.
The biggest impact it has is on how we mutate variables.
If we're only using owned values to allow piping things,
then changing a variable means assigning it
in the context where it needs to be mutated.
While this might seem less useful than piping,
it means all values are treated like numbers,
as if we were copying things.
This makes it easier for beginners to learn,
while avoiding copies and keeping high performance.

```
let mut a = 21
a = double(a)

let mut b = MyNum { 21 }
double(&mut b)

let mut c = NumTwo { 21 }
c = double(c)
```

That last section looks like a copy,
as we do with numbers, but it's moving ownership,
which is basically a reference with extra rules.
Because lifetimes are for tracking references,
using ownership also means avoiding lifetime annotations,
which makes Rust even easier to learn.
Also, mutating a variable in a scope requires assignment,
which makes any mutation to a variable trivial to spot.

This might be a good point to stop
and add a `pipe!` or `with_pipe!` macro to Rust,
just to prototype the idea and see how usable it is.
This is usable even without a macro.
Just use shadowing and assignment to the same variable
with owned values.

```
let pipe = get_random_post()
let pipe = parse_metadata(pipe)
let pipe = get_authors(pipe)
let author = find_author(pipe, "Pranab")

with_pipe!(
	let author = get_random_post()
		|> parse_metadata()
		|> get_authors()
		|> find_author("Pranab")
)

let author = pipe!(
	get_random_post()
	parse_metadata()
	get_authors()
	find_author("Pranab")
)
```

Before I go further, I'd like to clarify
what I'm looking for in a programming language.
I started learning Rust because I was looking for
a language that I can easily cross-compile.
I want to be able to make fun software for people.
This is why Javascript is one of my languages.
I was leaning towards Go for cross-compilation,
despite some of its bad design,
but someone I knew also wanted to learn Rust,
so I figured we could learn it together.
I'm not actually looking for the zero-cost stuff,
with the low-level control and stupid fast performance.

That means I'm going to present a high-level language,
but low-level control is still possible.
Even without low-level control,
it should be as fast as Rust,
and even faster in some ways.

If you look at the examples,
mutating a variable means putting it in a function
and getting it back out to assign it.
This means that if a variable only goes in
then it's a shared/immutable borrow.
We don't need to mark something as a borrow,
or manage references in any way.
We just deal with what looks like values.

```
let name = get_input("Thy name?")
greet(name)
greet(name)
```

I recently read more about Rust's core feature ---
Aliasing Xor Mutability.
To guarantee correct behaviour,
we can either share a variable or mutate it,
but doing both at the same time causes bugs.
We can observe this in high-level languages as well.

```
a = [1, 2, 3]
b = a
a[0] = 10
assert b == [10, 2, 3]
```

Allowing aliasing and mutability together
means that variables start changing for no reason.
Preventing this used to be only for
functional languages like Haskell, OCaml, and Gleam.
Rust is the only mainstream language that allows mutation
and removes this class of bugs.
Even high-level languages like Python and Javascript
require people to pay careful attention to aliasing.
Go prevents this to some degree by usually
using copies if there's no reference annotation.
However, using the assignment syntax I proposed,
we can reliably infer references and copies
without any reference annotations whatsoever.

We can have the safety of functional languages
with the performance of mutable languages like Rust,
in a package with less syntax to learn than Go,
that has fewer concepts to learn than any of them.
