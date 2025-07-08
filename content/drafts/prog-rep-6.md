+++
title = "Program representation (6)"
## remember to change date on publishing
date = 2025-07-02 12:27:46 # draft date
updated = 2025-07-06 12:18:35
+++

Visual programming is _so close_ to text programming.

Have a look at the following
code snippet and visual code.

```
for fruit ["orange" "banana"]
	peel fruit
	eat fruit
```

![Block representation of above code](/prog-rep-blocks-unbracketed.svg)

These are representations of the same program
in the same programming language.
I think their relation should be obvious.

If I gave you the following visual representation,
could you guess its text representation?

![Block representation for code hidden below](/prog-rep-guess.svg)

{% details(summary="Answer") %}
```
let name "world"
greet name
```
{% end %}

The key feature is that the visual representation
is backed by the text representation
_stored in a plain text file_.
You can version control this file,
edit it with text code editors,
`grep` and `cat` the file,
drag blocks around with your mouse
and snap them together to edit it,
and share the file with other people.
There's no conversion, exporting, or importing.

Like how one person can write Markdown in Vim
while another edits the file in a GUI app,
one person can write code in Vim
while another snaps blocks together in a GUI app.
And they can both use these files directly.

People can use a visual editor
to learn programming without syntax errors.
They can create packages used by text programmers.
They can share code snippets.
They can tap into the experience of text programmers.

These connected representations
provide first-class visual programming
and _collaboration_ with text programmers.

The rest of this post describes
how I arrived at these two interconnected representations,
and ends with a brief list of possible enhancements.

## The pieces

Using the CLI was my first taste of "real programming" ---
things of utility instead of games in Scratch
or guided tutorials in "proper" languages.
I was able to automate in minutes
what might take me an hour or more of manual work.
When I first learnt the CLI,
I remember thinking it was the superior interface,
but slowly accepting the world would never adopt it,
because it does have several issues.
Yet this idea of everyday scripting has haunted me.

I see small opportunities for little scripts all the time,
where I might see someone manually filtering some data
then using an ad-ridden website to pick randomly.
I wonder, if they had the right building blocks,
could they write a simple script?
What about renaming a bunch of files?

I see some of this potential in Scratch.
Scratch provides structural editing,
where users don't mess with syntax bits
like brackets, commas, and semi-colons.
Instead, they focus on their program.
It's a great way to learn programming.

What finally helped start this project
was my fascination with S-expressions.
It's a bit like CLI syntax,
but with more brackets and expressive names.
Similar to what I showed in the first example,
a `for` loop is a special type of command
that uses the same syntax rules as functions.
Clojure's evolved S-expressions
to include square and curly brackets,
adopted from C-style syntaxes for lists and maps,
which helped make S-expressions clearer,
as it becomes easy to see the difference
between function calls, lists, and maps.

The rise of auto-formatting is the final piece.
For some time, I was stuck on
"How do you encode the positions of blocks in text?"
Do you litter it with comments of co-ordinates?
The answer is you don't!
If we lay the blocks out automatically,
we focus on the structure of the program,
similar to writing markup to represent
the structure of our writing instead of its presentation.
Deriving presentation from structure
is key for implementing usable visual programming
that seamlessly interoperates with text.

## Assembly

The start of a syntax with easy translation,
for the program drawing blocks
and the user reading blocks, or text,
is a syntax that is consistent.
Here are the basic rules for Clojure's syntax:

* Spaces separate keywords and brackets group them

  ```
  (greet (join first_name last_name) )
  ```

  The first opening round bracket starts a group.
  In that group there's two items
  separated by spaces:
  `greet` and `(join first_name last_name)`.

  That second item is also grouped together
  with round brackets.
  In that group, there are three items
  separated by spaces:
  `join`, `first_name`, and `last_name`.

* A function call uses round brackets.

  ```
  (greet reader)
  ```

  The first item in the brackets is a function
  that is given the other items as arguments.
  `greet` is a function,
  and `reader` is a variable
  passed to it as an argument.
  Hi, you!

* A list uses square brackets.

  ```
  ["orange" "banana"]
  ```

  This syntax is familiar to most programmers.
  The major difference is the missing commas,
  but we always separate them with spaces anyway,
  so the commas are redundant.

  Like functions, we group things with square brackets
  and we separate things with spaces.

* Key-value pairs use curly brackets.

  ```
  { name: "Alden Thorn" age: 16 }
  ```

  This syntax is also familiar,
  and uses the same rules as the other brackets:
  brackets to group and spaces to separate.

The cool thing about this is that core language constructs,
like variable declarations, `if` statements, and `for` loops,
all use the same syntax rules,
so users and visual editors can easily translate them.
We only need to learn one syntax construct for everything,
instead of remembering all the keywords and brackets.

To turn them into blocks,
we simply sprinkle in some icons
and turn the brackets into border shapes.

![Sample of function call, key-value pair, and list](/prog-rep-sample-all.svg)

Round brackets for function calls
become round borders at each end,
curly brackets for key-value pairs
become curly borders,
and square brackets for lists
become flat borders at the ends,

Now, here's an example with nested function calls
using the Clojure-like text syntax:

```
(for fruit ["orange" "banana"]
	(peel fruit)
	(eat fruit)
)
```

It looks fine, but doesn't work as well with blocks:

![Block representation of above code](/prog-rep-blocks-hanging.svg)

The cut edges look odd and complicated for other themes,
and even though the unsightly hanging edges can be fixed
with typical S-expression formatting,
there's a neater solution to both with low cost.
We could stop here,
but S-expressions seem to turn off a lot of people,
and I've seen beginners do horrifying things with brackets.
Anyway, on to the low cost solution.

This is what I'd like the blocks to look like:

![Block representation of above code](/prog-rep-blocks-indented.svg)

Changes to the visual representation
should be reflected in the text representation,
so indented lines belong to
the previous less indented line.

```
(for fruit ["orange" "banana"])
	(peel fruit)
	(eat fruit)
```

The placement of the round brackets is a bit odd,
and doesn't really convey extra information,
so while we're moving those brackets around,
let's just remove some of them.

```
for fruit ["orange" "banana"]
	peel fruit
	eat fruit
```

We'll have the first item on a line
be a function or statement,
with other items and indented lines
provided to it as arguments.

And then we reflect those changes back
to the visual representation.

![Block representation of above code](/prog-rep-blocks-unbracketed.svg)

We simply copy the border styles
of unbracketed expressions
like strings and variables.

This is what you saw at the top of this post.

```
for fruit ["orange" "banana"]
	peel fruit
	eat fruit
```

![Block representation of above code](/prog-rep-blocks-unbracketed.svg)

Now we have a solid foundation
for building a visual code editor
that can be used directly alongside text editors.

Here's some future directions to ponder
as I put together posts and designs for them,
in rough order of importance for beginners:

* Widgets to edit various data types,
  like colour pickers for colours,
  calendars for dates,
  and graphs for co-ordinates.

* MIT Scratch as a library/module.
  LÖVE, the game framework, in a block editor.

  [LÖVE](https://love2d.org)

* Integration with other scripting environments,
  like spreadsheets and interactive notebooks,
  or browser and office suite extensions/plugins.

* REPL and interactive debugger.

* In-editor documentation generated from doc comments
  and displayed in the block selection panel.

* Package/project manager
  interoperating with CLI tool.

* Auto-complete with fuzzy matching.

* Keyboard shortcuts during editing
  like `"` to begin or end a string block,
  `[` to start a list,
  or `Shift + Tab` to de-indent a line.

* Vim inspired normal mode shortcuts.
