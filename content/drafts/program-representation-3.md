+++
title = "Program representation (3)"
## remember to change date on publishing
date = 2025-02-05 19:14:33 # draft date
updated = 2025-02-05 19:14:33
+++

as text, blocks, and nodes, _at the same time_

i think i've struck a balance between
text programming and visual programming
that allows seamless translation and collaboration
between the two representations and their users.

## a case for both

text programming is hard for beginners
because they need to learn multiple skills ---
one of which is typing out all the syntax correctly
while also trying to understand programming concepts.
also, most users are more comfortable
with the mouse or touchscreen.

visual programming is hard for experienced users,
because they have tools and workflows
that visual editors get in the way of.

being able to transition between them
means that people can view the code as they like,
and use the input methods that suit them most.
a visual programmer can assemble some code
that they can hand of to a text programmer
who can review it and make edits in their text editor.
the opposite can also be done.

so, let's get into it
with the text representation.

## text representation

this is a program that makes wallpapers
with a random image under a random quote.

```
# make random wallpaper
let picture
	random-pick picture-list
let quote
	random-pick quote-list
let wallpaper
	draw:new [screen-width screen-height]
		draw:text quote
		draw:image picture
```

this is a simple syntax like a command-line meeting python,
which is inspired by s-expressions.

- each line is a function call
- spaces separate items on the line
- the first line item is the function
- the other line items are arguments
- indented lines are arguments
  to the last less-indented line before it
  (the `draw:text` call is an argument to `draw:new`,
  which is an argument to `let wallpaper`)

in a more familiar syntax for most people:

```
let("picture",
	random-pick(picture-list)
)`
let("quote",
	random-pick(quote-list)
)`
let("wallpaper",
	draw:new([screen-width screen-height],
		draw:text(quote),
		draw:image(picture)
	)
)`
```

the reason i'm using the
s-expression inspired[^not-sxp] syntax
that looks like command-line-meets-python
is because it represents all constructs uniformly
with little to no visual clutter:
the first item on a line is always a function,
and the rest are always arguments to that function,
all of which are separated by spaces.

using this makes it trivial for the computer to transform it,
and for people to understand it ---
especially across representations,
when we switch it up
with lots of whitespace and colourful shapes.

[^not-sxp]: the reason i'm not using s-expressions
is because some people really dislike them

## presenting: block code

![block code](/program-representation-blocks.svg)

while this might look like syntax highlighted code
with a whole lot of whitespace,
each block can be dragged around by the user.
if you've ever used mit scratch as a beginner,
you might know what this is like.

blocks help users just snap existing pieces together
a lot more like lego than typing text.

while this disrupts the flow of code editor users,
they don't actually have to use the block editor,
plus great mouse support doesn't mean bad keyboard support.

the block editor should include
keyboard shortcuts to add and move blocks,
and have autocomplete for node names.

we can pick keyboard shortcuts such that
existing text editor users can easily switch to blocks,
and block editor users can also go the opposite way:

- pressing space while writing a function or variable name
  will create a new argument block and move to it,
- the quote key will create a text block ("string" of characters),
- the return key will create a new function call block,
- the tab key will indent the line block,
- and shift + tab will de-indent the line block.

## making node graphs

honestly, this is pretty exciting in itself,
but one day i just figured out something about blocks:

![deconstructed block code](/program-representation-block-nodes.svg)

each block has a connection to its parent block,
and variable declarations carry over to the immediate parent.

the other revelation is that the top-level is also a node
that accepts infinite expressions.

![node code](/program-representation-nodes.svg)

while nodes can become sprawling and hard to read,
they do have some benefits.

nodes can include custom ui
without breaking the flow.
imagine a colour wheel for a node
that creates a colour type,
or a carousel of images for a list of them.
