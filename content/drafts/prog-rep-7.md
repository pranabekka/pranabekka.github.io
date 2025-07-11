+++
title = "Program representation (7)"
## remember to change date on publishing
date = 2025-07-08 15:23:21 # draft date
updated = 2025-07-08 15:23:21
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

## Syntax description

If the syntax feels a bit fuzzy,
here's how it's put together,
so that the rest of the post makes sense.

Here's the rules for the text syntax:

* The first identifier on a line is a function
  or core language construct, like `let`.
  `greet()` is the same as:

  ```
  greet
  ```

* If the first item is the beginning of a literal,
  then that line is for the literal value.

  ```
  my_function
  "A string literal"
  [ "An" "array" "literal" ]
  { key: "value" }
  ```

* Everything else on the line is an argument
  to the function or language construct,
  separated from each other with spaces.
  The following example provides the strings
  `"reader"`, `"Pranab"` and `"World"` as arguments
  to the function `greet_all`.
  It's like `greet_all("reader", "Pranab", "World")`.

  ```
  greet_all "reader" "Pranab" "World"
  ```

  We stripped out the commas and brackets,
  and used spaces to separate everything instead.

* To nest a function on the same line,
  as an argument to the main function on that line,
  use round brackets.

  ```
  greet ( input_prompt "What's your name? " )
  ```

  The first identifier within the round brackets
  is the function name, and the rest are arguments.
  `input_prompt` prints "What's your name?"
  before getting the user's input,
  then returns that input to `greet`
  as an argument.

* An indented line is an argument
  to the last line before it
  that has less identation.

  ```
  greet
  	input_prompt "What's your name? "
  ```

  `greet` and `input_prompt` behave the same
  as in the last point.
  The only difference is the nesting method.

  ```
  greet_all
  	"reader"
  	"Pranab"
  	"World"
  ```

  This is the same as the last `greet_all` example,
  except I split it up into multiple lines.

Here's the examples for the block syntax,
before I explain how it relates to the text:

![Block representation of first code snippet](/prog-rep-blocks-unbracketed.svg)

![Block representation of second code snippet](/prog-rep-guess.svg)

![Sample blocks for function call, key-value pair, and list](/prog-rep-sample-all.svg)

* All constructs have icons added on.

	* Functions have the little `f` icon.

	* Identifier names, used for declaractions,
	  have a "download" or "save" icon,
	  as if we're saving that name,
	  or putting in a value.

	* Variables, used to access their value,
	  have an "upload" icon,
	  as if we're taking out the value.

	* Arrays use a list icon.

	* Key-value pairs use a graph icon
	  with a block leading into a pair.
	  
		* The key uses a key icon.

		* The value uses the icon for its own type.

	* Strings use a quote icon on both ends of the block,
	  like how we do it in text code.
	
	* Number literals get a number icon.
	  
* Syntax elements with brackets get borders.

	* Round brackets for function calls
	  are replaced with "pill" shaped blocks,
	  where the ends are fully rounded
	  to represent the round brackets.

	* Square brackets for arrays
	  are replaced with square borders.

	* Curly brackets for key-value pairs
	  are replaced with curly borders.

* Syntax elements without brackets get a faded border
  to indicate a mouse target,
  and to visually separate them from other constructs.
  This includes the main function on a line.

* The main function on a line gets a rounded border,
  like the round brackets used for functions nested in-line.

* Non-function identifiers, string literals, keys,
  and number literals get slightly rounded borders
  to separate them from the round borders of function calls
  as well as the square borders of arrays.
  They're still faded, since they don't have brackets.

## Syntax features

Here's an example of both representations
before we dive in further:

```
let name "world"
greet name
```

![Block representation for code hidden below](/prog-rep-guess.svg)

### Easy translation

I assume you had little difficulty
translating the examples at the beginning.
I think most of the difficulty comes from
the missing commas, equal signs, and keywords.
Even Python didn't dare to remove commas,
and Clojure added them in as whitespace,
though all CLIs keep getting away with it.
A bit of practice should make it easily readable.

Another thing that makes this syntax easy to translate
is that any constructs, like looping or conditionals,
use the same layout as a function.
`let` is a "function" that that takes two arguments ---
the first argument is the identifier,
and the second is the value.
`for` is a function with variadic arguments ---
first a variable for each item of the loop,
second a value to loop over,
and everything else as steps in the loop.
This layout is heavily inspired by S-expressions.

```
let fruits ["orange" "banana"]
for fruit fruits
	peel fruit
	eat fruit
```

This way all blocks have the same shape,
documentation is straightforward to read and write,
and you get editor support for them
telling you what goes where,
and you can read the other format if you need to.

A simple syntax makes it easy to translate
for the computer as well.

### Auto-formatting

This one came in at the last moment,
but is quite important.
How would you avoid writing block positions in the file?
Using automatic block layouts, like auto-formatting.
People focus on the program, not the formatting.

### Sharing

Sharing code snippets is just text.
No need to take screenshots.
A dedicated site can even translate it
to whatever representation the user prefers.

### Significant whitespace

Significant whitespace means
less visual noise,
less typing,
and fewer formatting crimes.

Even users of the block representation
will likely have to read the text representation,
and they might even need to write it on rare occassions.
Additionally, text editors provide some workflows
that cannot be easily reproduced with a structured editor,
and others might only use a text editor
in restricted environments,
even though they're beginning.
Significant whitespace helps all these use cases.

Significant whitespace is also popular with beginners.
Python's popularity is a testament to this.
Even the Godot engine's Python inspired language
was so popular that they remove visual scripting
with little protest from their users.

### Accessible

Backing the visual representation with a text file
gives it a base level of accessibility,
and the opportunity to improve it more easily.
More users will then be able to use the tools
create software for themselves,
and collaborate with others.

## Future

Here's some future directions to ponder
as I put together posts and designs for them,
in rough order of importance for beginners:

* Widgets to edit various data types,
  like colour pickers for colours,
  calendars for dates,
  and graphs for co-ordinates.

* Integration with other scripting environments,
  like spreadsheets and interactive notebooks,
  or browser and office suite extensions/plugins.

* MIT Scratch as a library/module,
  or LÖVE, the game framework, in a block editor.

  [MIT Scratch](https://mit.scratch.edu)

  [LÖVE](https://love2d.org)

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
