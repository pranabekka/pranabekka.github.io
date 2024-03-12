+++
title = "Wisp whitespace expressions"
## remember to change date on publishing
date = 2024-03-12 13:53:52 # draft date
updated = 2024-03-12 13:53:52
+++

Wisp is a syntax that adds significant whitespace to S-expressions,
so that you don't have to use as many parentheses,
creating a much easier reading and writing experience
at the cost of a little more complexity.

Here's what you can achieve with wisp:

```
html ()
  head ()
    title () "HTML example"
    link 
      :href "styles.css" :rel "stylesheet"
  body ()
    h1 () "Welcome to my HTML example"
    p () "This is compiled from wisp expressions."
    ul (:id "data-formats")
      li () "Wisp"
      li () "S-expressions"
      li () "StrictYAML"
      li () "JSON"
      li () "XML"
```

It was created as an alternative syntax for the Scheme programming language,
though the principles apply to any data format
that aims to achieve an easier reading and writing experience
while keeping most of the strengths of S-expressions.

If you don't know about S-expressions,
I'd suggest you quickly skim through my article on the same,
though the gist is that (1) you separate things by whitespace,
and (2) group them together with parentheses.

[Article on S-expressions](@/drafts/s-expressions.md) \

[Wisp home page introduction](https://www.draketo.de/software/wisp#after-updates) \

Let's get started with what wisp adds to S-expressions.

## Lines as lists

**RULE:**
Lines automatically start a list.
You don't need to type parentheses anymore.

S-expression:

```
(:title "Super Supportive")
```

Wisp:

```
:title "Super Supportive"
```

## New lists

**RULE:**
Lines on the same indentation as the previous start a new list.

S-expression:

```
(:title "Super Supportive")
(:title "Name of The Wind")
```

Wisp:

```
:title "Super Supportive"
:title "Name of The Wind"
```

## Nested lists

**RULE:**
Lines with more indentation than the previous line start a nested list.

S-expression:

```
(
  :books (
    (:title "Super Supportive")
    (:title "Name of The Wind")
  )
)
```

Wisp:

```
:books
  :title "Super Supportive"
  :title "Name of The Wind"
```

(This is not exactly the same, but we'll get to that)

## Continued lists

**RULE:**
Lines with more indentation than the previous line,
but starting with a dot continue the previous list,
instead of created a nested list.

S-expression:

```
(
  :title "Super Supportive"
  :author "Sleyca"
  :rating 5
)
```

```
(move "Pranab" "Hospital")
```

Wisp:

```
:title "Super Supportive"
. :author "Sleyca"
. :rating 5
```

```
move
. "Pranab"
. "Hospital"
```

## Inline nested lists

**RULE:**
A colon symbol (atom) creates and ends a list on the same line.
(You can still use parentheses to open and close within the line)

S-expression:

```
(call-cab (location "Pranab"))
```

Wisp:

```
call-cab : location "Pranab"
```

Notice how the colon is a symbol in itself,
separated from other atoms with whitespace on either end.

<!--
**RULE:**
If a colon starts a line, it creates and ends a nested list within that line.

S-expression:

```
(item
  ((item item))
  ((item item)))
```

Wisp:

```
item
  : item item
  : item item
```
-->

## Double nested lists

**RULE:**
A colon on a line _by itself_ creates a list
that continues as long as future lines have more indentation.

Before:

```
(:books
  ((:title "Super Supportive")
   (:title "Name of The Wind")))
```

Wisp:

```
:books
  :
    :title "Super Supportive"
    :title "Name of The Wind"
```

## More examples

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

```
define me "Pranab"

define greet
  fn : name
    display "Hello, " name "!"
    
greet me
```
