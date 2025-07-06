+++
title = "Program representation (6)"
## remember to change date on publishing
date = 2025-07-02 12:27:46 # draft date
updated = 2025-07-02 12:27:46
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

## Motivation

<!--
	TODO: is this too grand and verbose?
	feels like i'm giving an interview or something.
	it does explain motivation and importance
	as well as important references/inspiration
	but maybe it could be refined
-->

I used MIT Scratch a lot as a kid,
stopping a bit after the 2.0 release,
but I've never really had a particular
fascination with visual programming.
Instead, I think this is a confluence
of my obsession with programming,
my education and interest in design,
and my love for lisps.
My approach and history with these
led to tinkering with
the design of code syntax
and complicated user interfaces.

[MIT Scratch](https://mit.scratch.edu)

There are a few threads to follow here.

Design, of course, threads through all of this.
There are some principles and heuristics
that apply almost universally,
and study and practice often leads to them
as you pick up specific uses and examples.

My programming obsession is another thread
that factors into this whole thing.
I've learnt a lot about syntax and semantics
by following articles and discourse
on programming and its various facets.
One perspective that's been gaining popularity
is the idea of consistent and _automatic_ formatting.
By using automatic formatting,
users focus on their program
instead of block positions,
and the text representation
doesn't need to store those positions,
since they're inferred by the block formatter.

Learning about the command line is another thread.
Piping, composability, and scripting my tasks
was incredible when I learnt it all those years ago.
I still use the terminal for any task
that isn't inherently graphical,
but I recognise that shells are complex
and require significant investment
that most people aren't willing to make.
Despite that, this thought about scripting
has haunted me for several years,
spurring me on towards identifying problems
and sketching or jotting down potential solutions.

The final thread that helped bring this together
is learning about lisps and S-expressions.
Even though I don't use any lisps,
the consistency of S-expressions really speaks to me,
and I follow along with developments in the lisp world.

Over the years, all these things brewed in my mind,
and I've slowly refined my understanding
as I went through articles and videos.

## Execution

The start of a syntax with easy translation
is a syntax that is consistent.
Clojure's evolution of S-expressions
borrows its consistency,
while adding distinction between
the three structural elements
present in most syntaxes.

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

Here's some future directions to ponder,
in no particular order of importance or cohesion,
as I put together posts and designs for them:

* Auto-complete with fuzzy matching.

* Keyboard shortcuts during editing
  like `"` to begin or end a string block,
  `[` to start a list,
  or `Shift + Tab` to de-indent a line.

* Vim inspired normal mode shortcuts.

* MIT Scratch as a library/module.
  LÖVE game framework in a block editor.

  [LÖVE](https://love2d.org)

* Widgets to edit various data types,
  like colour pickers for colours,
  calendars for dates,
  and graphs for co-ordinates.

* Integration with other scripting environments,
  like spreadsheets and interactive notebooks,
  or browser and office suite extensions/plugins.

* Package/project manager
  interoperating with CLI tool.

* REPL and interactive debugger.

* In-editor documentation generated from doc comments
  and displayed in the block selection panel.
