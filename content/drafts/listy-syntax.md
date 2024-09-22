+++
title = "Listy syntax"
## remember to change date on publishing
date = 2024-09-20 00:19:46 # draft date
updated = 2024-09-20 00:19:46
+++

A programming language syntax
with lots of significant whitespace.

Significant whitespace is a familiar syntax for users,
with wide adoption in the form of Python,
and increasing popularity in Godot.

In fact, Godot's Python-like syntax was so popular
they removed visual scripting from the core engine.

Significant whitespace benefits beginners,
because they don't need to format parentheses.
With brackets, they don't understand the value of formatting,
which leads to incorrectly scoped code.
Significant whitespace makes scope obvious.

Significant whitespace is also easier to use
without extra editor features for balancing brackets.

Even languages with brackets tend to have
some significant whitespace,
and they encourage or enforce
significant whitespace patterns in the code.

## Comments

```
# Comment
```

Anything following a `#` (hash) sign is a comment.
The only exception is a `#` sign in text.

[**NOTE:** commenting nodes/trees,
discussed after indented/multi-line functions]

## Function calls

```
my-func arg1 arg2 arg3
my-func2 arg1 arg2 arg3
```

Each line begins a function call,
which end with a line break.
There are some exceptions listed below
[**TODO**: mention exactly which exceptions and link].

Identifiers[^sym-space] and data are separated by spaces.
The first item is the function being called,
and the rest are arguments.

[^sym-space]: symbols can include spaces.
see quoting and escaping symbols.
[**TODO**: link]

[**TODO**: case insensitive unless quoted]

Only one space is required to separate items,
and any more than that is not allowed.

## Nested functions

### Indentation

```
func1
	func1.1

func2
	func2.1

	func2.2
		func2.2.1
```

If the next line is indented further
than the current line,
it continues the function call,
with the indented line as an argument.

Empty lines and comments cannot end nesting.
Comments are expected to match indentation.

Indentation must be one tab (no spaces) per level.
A nested function call can only have
one indentation more than its parent function.

### Colon (and semi-colon)

```
func1 : func1.1 : func1.1.1
	func1.2

func1
	func1.1 : func1.1.1
	func1.2

func1
	func1.1
		func1.1.1
	func1.2
```

A colon creates a nested function on the same line.
A function nested inline will never continue past that line.

```
func1 : func1.1 ; func1-item

func1 ; func2 ; func3

# for example
func1 : func1.1 ; ; func2
```

Semi-colons end a function call.

If you start a nested function call with a colon,
you end it with a semi-colon.

If you end the main function call in a line with a semi-colon,
it's like creating a new list with a newline and no indentation.
This is useful for formats that don't allow multiple lines.

### Parentheses

```
func1 (func1.1) func1-item

# for example
func1 (func1.1) ; func2
```

Parentheses also define a nested function.
This is useful when having multiple
nested functions on the same line.

Parentheses cannot span multiple lines
and must be matched with a closing parenthesis.

### Indentation + colon

```
func1
	# unlabelled func1.1
	:
		func1.1.1
		func1.1.2

# equivalent:
func1 : (func1.1.1) (func1.1.2)
```

If you need to indent a function more than one level,
without labelling the middle list,
use the `:` on a line by itself.

This is useful in a scenario where
`func1.1.1` returns a function,
and that returned function is immediately called
with the result of `function1.1.2` as the argument.

## Text

```
write "Some text"

write "Some \"quotes\" inside text"

write
	" Some "quotes" inside text

write
	"
		Some "quotes" inside text
		with multiple lines.
				Even some indented text.
```

Text is put inside double quotes.
Most languages call these "strings".

Text allows all characters.

To include a double quote inside text,
put a `\` (backslash) before it to "escape" it,
or use the `"` as a "function".

When used as a "function",
the rest of the line is text,
and lines indented further are also text.

The first space or newline after the `"` "function" is ignored,
and the rest is part of the text.

In multi-line text, indentation beyond one level further
is counted as part of the text.

## Numbers and math

```
add 1 2 3 4
```

Any combination of numbers, underscores, and points (`.`),
are treated as numbers if they begin with a number.
If they don't match all of these conditions,
then they're treated as an identifier.
[**TODO**: consider commas in numbers?]

```
$ 1 + 2 + 3 + 4

$ (1 + 2 + 3) * 6

$ number1 + number2
```

The `$` function allows writing math expressions.

Numbers are treated as above.

`+`, `-`, `/`, `*`, and `%` are operators
for addition, subtraction, division, multiplication,
and modulo (division remainder) respectively.
[**TODO**: any other operators?]

Parentheses (`()`) are used for grouping math expressions.

Anything else is a variable.

## Lists

## Dictionaries

## Quoting

any identifier is resolved into its value.
if you don't want that, use quoting

for example, if you want to set a variable,
you need to assign the value to the given identifier,
not the value the identifier (possibly) refers to

maybe don't mention quasi-quoting/unquoting till later?
i don't even know of any valid use cases

include list quoting here with colons, parens, and lines

## Credits

Wisp, s-expressions, lisp

`#` from shell, plus breaking from lisp
hence "lispy"
wanted `;` for breaking inline lists
because some formats don't support multiple lines

"Listy" is easily searchable[^search], sounds fun,
has syntax about lists,
and is inspired by s-exps in lisp
(which also stands for list processing)

[^search]: main result is a lists app
for things like movies, music, and books,
with another lists app with the same name.
