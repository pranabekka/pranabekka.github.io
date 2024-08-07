+++
title = "S-expressions"
## remember to change date on publishing
date = 2024-03-12 02:43:12 # draft date
updated = 2024-03-12 02:43:12
+++

S-expression syntax has just two rules:
(1) group things with parentheses,
and (2) separate them with spaces.

They're a data format
with power comparable to HTML, XML, JSON, etc.,
yet with the simplest syntax.

```
(draw-cards 10)
(cooked? kebab)
(add 20 15 10 5)
(move "Pranab" "hospital")
(call-cab (location? "Pranab"))
```

Notice how identifiers, such as `draw-cards` and `location?`,
can now use any characters,
such as question marks and hyphens ---
because spaces and parentheses are the only syntax!

## A note on idiomatic S-expressions

Most formats try to put parentheses on individual lines,
and try to match their indentation, like the next example.
You should avoid that.

```
(
  list
    (
      item "First"
    )
    (
      item "Second"
    )
)
```

Instead of the above,
you have to learn to ignore most of the parentheses
while reading S-expressions,
and let your editor handle parentheses
while writing S-expressions.

Here's an idiomatic representation of the previous example:

```
(list
  (item "First item")
  (item "Second item"))
```

The indentation and spaces communicate
the relationship between all the parts,
making everything a lot more compact
and easy to read through.

## Writing HTML

Consider the following HTML:

```
<ul id="data-formats">
  <li>XML</li>
  <li>JSON</li>
  <li>S-expressions</li>
</ul>
```

Here's a pleasant way to write the same thing as an S-expression:

```
(ul (id "data-formats")
  (li () "XML")
  (li () "JSON")
  (li () "S-expressions"))
```

After each HTML element, there's a list of properties,
which can either be empty (as in the case of the `li` items),
or populated with keys followed by values (like the `id`).

Another example of HTML as an S-expression:

```
(p (class "warning red"
    id "first-warning")
  "This is the first warning.")
```

## Writing JSON

JSON requires quoting keys with hyphens, question marks,
or other characters,
while S-expressions have no such issues.

S-expressions can trivially represent key-value pairs
with a simple convention: `(:key value :key value)`.
Since they are all pairs,
every odd item is a key,
every even item is a value,
and commas are useless for separating them.

Consider a (very) short book list in JSON:

```
{
  myBooks : [
    {
      title : "Super Supportive",
      author : "Sleyca",
      rank : 5
    },
    {
      title : "Name of The Wind",
      author : "Patrick Rothfuss",
      rating : 5
    }
  ]
}
```

Here's the S-expression form:

```
(:my-books
  ((:title "Super Supportive"
    :author "Sleyca"
    :rating 5)
   (:title "Name of The Wind"
    :author "Patrick Rothfuss"
    :rating 5)))
```

Notice how much more compact this is.
Commas are not required,
and the indentation (with the editor)
does all the work of making it all readable.

## Writing programs

S-expressions are an incredible basis for programming languages,
using two simple ideas:

1. The first item of a list is a function.
   Other items in the list are passed as arguments to that function.
2. Symbols are used to define or access a variable,
   such as numbers, strings, lists, and functions.

Now, you only need to remember the above two rules,
and the two S-expressions rules:
(1) group items with parentheses, and (2) separate them with spaces.
Instead of learning the syntax of the language,
you can now immediately start working with it!

You might've realised that the "move" example I've been using
is a programming instruction ---
`(move "Pranab" "Hospital")` will move me to the hospital
(in order to get my brain checked).

Even the "call-cab" example is a programming instruction.
`(call-cab (location "Pranab"))`
will first get the location for "Pranab" (me),
and then call a cab to that location
(the hospital; the docs said I'm fine).

How would you define a variable?

Use `(define name "Pranab")`.

Define a function?
(Remember, variables also hold functions)

```
(define greet
  (fn (name)
    (display "Hello, " name)))
```

Conditionals?

```
(if (is-dummy? "Pranab")
  (ensmarten))
```

### Further reference

There are a few more constructs required to make a full-fledged language,
but I'll leave that for others to explain.
I'm linking to resources on Scheme,
since it's a very neat and mature language that uses S-expressions.

[A Scheme Primer](https://spritely.institute/static/papers/scheme-primer.html)
by Christine Lemmer-Webber and the Spritely Institute
gives a fairly quick rundown of the Scheme programming language
(there's a video form of the same on YouTube, with the title
"Unlock Lisp / Scheme's magic: beginner to Scheme-in-Scheme in one hour").

[Learn CHICKEN (Scheme) in Y minutes](https://learnxinyminutes.com/docs/CHICKEN/)
is a much more terse and straightforward introduction
to the CHICKEN Scheme dialect.

Other languages using S-expressions include
Common Lisp, Clojure, Fennel, and Janet.

## Fewer parentheses with whitespace expressions

<!-- or "Fewer parentheses, more significant whitespace" -->

Now, seeing the above examples, some of you might have thought
"Well, that looks tedious", or "Looks about the same to me".

"Wait!" I say, "May I present to you: significant whitespace!"
Since we're indenting all of the data in a specific way anyway,
let's add some rules to manage lists for us without all the parentheses
(or without most of them, at least).

I've written a separate article for that,
to avoid making this too long,
but here's what the above examples will look like:

```
:books
  :
    :title "Super Supportive"
    . :author "Sleyca"
    . :rating 5
    :title "Name of The Wind"
    . :author "Patrick Rothfuss"
    . :rating 5
```

```
ul : id "data-formats"
  li () "XML"
  li () "JSON"
  li () "S-expressions"
```

[Significant whitespace S-expressions](@/drafts/significant-whitespace.md)

## Using

libs for go, python, c, zig, rust, ocaml, more

scheme, common lisp, janet

fennel, hy, clojure
if you're already familiar with the lang
and want to code in your fav lang
