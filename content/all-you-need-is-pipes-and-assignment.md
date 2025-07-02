+++
title = "All you need is pipes and assignment"
date = 2025-06-30 20:02:25
updated = 2025-06-30 20:02:25
+++

For function composition and clearer mutation.

Most modern languages have realised
that you should make references explicit,
but even that can be stripped out.
If you remove references,
then assignment is the only way to mutate,
and you don't need a second syntax and semantics,
with its own set of keywords and/or symbols.

```
let x = 210
x = double(x)
```

The main reason references are used
is to prevent expensive copies,
but those have been solved for some time.
The copy-on-write mechanism uses a reference,
until a mutation is performed,
at which point it stores a mutated copy.
Similary, if I'm passing in `x` and
assigning it back into `x`,
or I never use `x` again,
then it can be mutated in place.

Tada! No copies, no references, no performance cost,
and a cleaner language with one obvious way to mutate.

In fact, references have also been lamented by Tony Hoare,
of "billion-dollar mistake" fame.
I found an article by without.boats citing this,
titled "References are like jumps".
What's funny is that they didn't directly say
"References considered harmful",
but comparing them to jump/goto heavily implies that.
Their article is a much better advocation
for removing references in high level languages.

[References considered harmful](https://without.boats/blog/references-are-like-jumps/)

Either way,
I think all new languages should adopt this.
If your concern is intermediate variables,
those can also be optimised the same way I suggested,
although the nicer way is piping or method chaining,
with piping as the other feature new languages should adopt.

```
// Intermediate variables
let metadata = parse_metadata(post)
let authors = get_authors(metadata)
let me = find_author(authors, my_name)

// No intermediate variables
let me = post
	.parse_metadata()
	.get_authors()
	.find_author("Pranab")
```

So pass-by-value functions enforce
nice piping interfaces
for function composition.

In fact, I was thinking about references because
I was wondering how to make nice functions for piping.
The key to a good piping or method chaining interface
is returning values instead of mutating references.
If either of the above functions mutated their arguments,
then the next function in the chain would get nothing,
and I'd have to do `x.bar()` on a new line.
The best way to ensure functions return values
is to remove references completely.
And that brings us the happy accident of creating
only one obvious way to mutate.

One benefit of piping over chaining,
is that chaining requires methods,
which requires objects,
which requires mutation,
thus enabling empty return values.
Piping only needs functions,
without any mutation of `self`.
Simple pass-by-value functions.
And it can be used with any function
that has the right argument type.

```
let parse_metadata(post: Post) -> Metadata { ... }
let get_authors(metadata: Metadata) -> List(Author) { ... }
let find_author(authors: List(Author), name: String) -> Author { ... }
let me = post
	|> parse_metadata()
	|> get_authors()
	|> find_author("Pranab")
```

By the way,
the question about pipe interfaces,
and the answer of removing references,
was actually inspired by Gleam.
It's such a neat language.
You could learn its features in a day
and the programming style in a week.
If it had native cross-compilation,
I'd never look at Go or Rust.

[Gleam](https://gleam.run)
