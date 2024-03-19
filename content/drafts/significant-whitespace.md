+++
title = "Significant whitespace"
## remember to change date on publishing
date = 2024-03-17 10:32:16 # draft date
updated = 2024-03-17 10:32:16
+++

In some senses, Python doesn't have
enough significant whitespace.

It requires extra syntax elements
where whitespace is already doing work.

Here, I explore a significant whitespace syntax
with great power, minimal complexity,
and lots of flexible applications,
including as an alternative to XML, JSON, YAML, etc
(plus Python, of course).

This post describes wisp,
an alternative syntax for Scheme,
which is applicable wherever S-expressions are applicable.
This post assumes no prior knowledge of these.

[Wisp](draketo.de link)

[Scheme](the christine lemmer-webber guide on spritely)

[S-expressions](@/drafts/s-expressions.md)

## Introduction

### Basic data types

Wisp is structured with "lists",
which are simply a sequence of items separated by spaces.

```
item-1 item-2 item-3
```

There are the usual suspects when it comes to data types:
numbers, strings, booleans,
lists (shown above), and dictionaries.

```
1234 "a string" true

list-item-1 list-item-2 list-item-3

:key1 value1 :key2 value2 :key3 value3
```

And comments:

```
; a semicolon and everything after is a comment
```

You might have already noticed
we already have more significant whitespace
than most other languages and data formats:

Spaces separate items, and commas simply repeat that information,
so there are no commas used to separate items.

Wisp has another data type,
called symbols, which function in a similar way to strings,
but are not quite the same thing.

```
a-symbol
```

Symbols are basically what are used for
naming and accessing variables,
with extra functionality for manipulating them,
such as creating new symbols.
Symbols also have other nice features,
such as allowing hyphens.

### Nested lists and dictionaries

Flat lists and dictionaries aren't all you need.

Nested lists and dictionaries
can either be in the same line,
or on a new line.

#### In-line

If you want a simple nested list or dictionary,
just use a colon to nest a list that will close
at the end of the line.

```
main-item1 main-item2 : nested-item1 nested-item2
```

In the above example, `nested-list`
is the second (and last) item of `main-list`.
The colon simply indicates that
everything till the end of the line is a nested list.

More complex lists and dictionaries use parentheses.

```
:main-key1 (:sub-key1 sub-value1) :main-key2 main-value2
```

Most dictionaries won't use in-line syntax,
but this example shows that
list and dictionary syntax is very similar,
and the rules transfer easily.

Here's a slightly more complex example:

```
item1 (sub-item) (sub-item) item-4
```

#### New-line/block

Indented lists and dictionaries
belong to the last list/dictionary with less indentation.

```
main-list1
  nested-list1
  nested-list2
  
main-list2
  nested-list3
  nested-list4
```

`nested-list` 1 and 2 belong to `main-list1`,
while 3 and 4 belong to `main-list2`.

There's a simple way to avoid indentation ---
begin the line with a dot,
and the items will be on the same level
as the last list/dictionary with less indentation.

```
:first-dict-key first-dict-value
  . :second-dict-key second-dict-value
  . :third-dict-key third-dict-value
```

This syntax is particularly useful for dictionaries,
as well as lists with many items or just long items.

It also applies to lists and dictionaries
where you want a nested list
followed by regular list items.

```
item1 (nested) item3 item4

item1
  nested
  incorrectly-nested-item3
  incorrectly-nested-item4
  
item1
  nested
  . item3 item4

item1
  nested
  . item3
  . item4
```

All these blocks aim to do the same thing,
which can quite annoying to manage
without the dot continuation syntax.

## Data/config format

List of data formats:

```
data-formats
  . XML
  . JSON
  . TOML
  . YAML
  . S-expressions
  . RON
  . wisp
```

Document data:

```
html
  head
    title "My HTML document"
  body
    h1 "Hello, world!"
    img :src "cat.gif" :alt "meow"
```

Configuration file (for a text/code editor):

```
font-family IntelOne Mono
font-size 13

colour-scheme vivendi

plugins
  smart-quotes
  markdown-preview
  wiki
  snippets
  emmet
  live-server
  easymotion
  autosave
  dates
  
vi-mode true

keys
  fuzzy-find Ctrl-f ; make fuzzy search default
  dates:insert-date Alt-d ; from dates plugin
```

Notice how compact yet readable everything is.
The only (visible) syntax elements
across all three examples
are 7 dots for a list continuation,
a colon for the `:src` dictionary value,
and two comments explaining key-binding choices.

And there's a simple in-line format as well,
for simple and easy serialisation.

```
data-formats XML JSON TOML YAML S-expressions RON wisp
```

```
html (head (title "My HTML document")) (body (h1 "Hello, world!") (img :src "cat.gif"))
```

```
config (font-family IntelOne Mono) (font-size 13) (colour-scheme vivendi) (plugins smart-quotes markdown-preview wiki snippets emmet live-server easymotion autosave dates) (vi-mode true) (keys (fuzzy-find Ctrl-f) (dates:insert-date Alt-d))
```

<!--
hmm... should there be a syntax for creating a same-level list inline?
a semicolon could do that: `list1 ; list2 : list2.1 ; list3 ; list4`
but then comment syntax will have to change
also, there's no inline comment syntax
though cl has something like #;(), i think?
comment syntax could be #/ and #/(inline)
could also just be `comment` keyword
-->

## Programming

As the 'premier' significant whitespace language,
Python is going to be involved in this section.

You've already seen that we don't require commas,
because wisp's whitespace is more significant than Python's.

Wisp based languages also require fewer parentheses.
The first item in a "list" is a function,
and the rest of the items are arguments
to that function.

```
my-function arg1 arg2 arg3
```

Significant-whitespace++!

Have you ever noticed that if-statements in Python
require a colon at the end,
even though the next line is already indented?
Well, wisp doesn't require it!

```
if : indented? line
  make-nested

; single line:
; if (indented? line) (make-nested)
```

Here's a small "Hello" example:

```
; define variable 'me' as "Pranab"
def me "Pranab"

; define variable 'greet' as a function
; that takes the parameter 'name'
; and says hello to the named person
def greet
  fn : name
    print "Hello, " name "!"
  
greet me
; Output: "Hello, Pranab!"
```

Only one comma typed in this example,
and it's inside a string!
Here's the same code without any comments:

```
def me "Pranab"

def greet
  fn : name
    print "Hello, " name "!"

greet me
```

Lookit!!! It's so teeny!!!!!! Ahhhhh!!!!!!!!!!!!!!

Sorry. This is honestly the best, though.

Like, in Python, that define would need a colon at the end
--- why? The next line is already indented.
Turns out whitespace could be even more significant.

## Using

Just the one implementation in/for Guile Scheme, so far.
You could try to make one in your favourite language yourself!
If you want something similar to use right now,
you could look into S-expressions instead.
It has more parentheses,
but an even simpler and more consistent syntax.

[Wisp Guile implementation]

[Wisp specification]

[S-expressions](@/drafts/s-expressions.md)
