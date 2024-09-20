+++
title = "Wispy syntax"
## remember to change date on publishing
date = 2024-09-20 00:19:46 # draft date
updated = 2024-09-20 00:19:46
+++

A programming language syntax
with lots of significant whitespace.

Significant whitespace is a familiar syntax for users,
with wide adoption in the form of Python.

Also, significant whitespace is easier to use
without editor features for balancing brackets.

Significant whitespace is also heavily used
in languages with brackets.

## Comments

```
# Comment
```

Anything following a `#` (hash) sign is a comment.
The only exception is a `#` sign as a character type.

[see characters and text]

[**NOTE:** commenting nodes]

## Lists

```
list1 item item item
list2 item item item
```

Each line begins a list that ends with the line.
Lists are separated by line breaks.
There are some exceptions listed below
[**TODO**: mention exactly which exceptions and link].

List items are separated by spaces.
Only one space is required to separate items,
and any more than that is not allowed.

Spaces don't always separate list items.
These exceptions are mentioned below.
[**TODO**: text, maybe quoted/escaped symbols]

## Lists inside lists

### Indentation

```
list1
	list1.1

list2
	list2.1
	
	list2.2
		list2.2.1
```

If the next line (list) is indented further
than the current line (list),
it continues the list.

Empty lines do not count.
Comments are expected to match indentation.

Indentation must be one tab (no spaces) per level.
A list can only have
one indentation more than its parent list.

### Colon (and semi-colon)

```
list1 : list1.1 : list1.1.1
  list1.2
```

A colon creates a child list on the same line.
This list will end at the end of the line.

```
list1 : list1.1 ; list1-item

list1 ; list2 ; list3

# for example
list1 : list1.1 ; ; list2
```

Semi-colons end a list.

If you start a list with a colon, you end it with a semi-colon.

If you end the main list in a line with a semi-colon,
it's like creating a new list with a newline and no indentation.

### Parentheses

```
list1 (list1.1) list1-item

# for example
list1 (list1.1) ; list2
```

Parentheses also define a sublist.
This is useful when having multiple sublists on the same line.

Parentheses cannot span multiple lines
and must be include the closing parenthesis.

### Indentation + colon

```
list1
	# unlabelled list1.1
	:
		list1.1.1
		list1.1.2
```

If you need to indent a list more than one level,
without labelling the middle list,
use the `:` on a line by itself.

## Functions

```
my-function arg1 arg2
```

The first item in a list is a function
or reserved language keyword.
The rest of the items are arguments to it.

Language keywords include `:`, `"`, `$` and `'`.
`:` has already been covered,
and the rest are discussed below.
[**TODO**: check these are the only keywords]

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
or use the `"` "function".

When used as a "function",
the rest of that line is text,
and lines indented further are also text.

The first space or newline after the `"` "function" is ignored,
and the rest is part of the text.

In multi-line text, indentation beyond one level further
is counted as part of the text.

## Numbers and math

```
add $1 $2 $3 $4
```

Numbers are identified by
putting a `$` (dollar) sign before them.
This is so that you can use functions like `10+`
to add 10 to a number given as argument.

```
$ 1 + 2 + 3 + 4

$ number1 + number2
```

The `$` also serves as a function
that allows writing math expressions.

Anything that only has digits, points (`.`)
and underscores (`_`) is identified as a number.
[**TODO**: consider commas in numbers?]

`+`, `-`, `/`, `*`, and `%` are operators
for addition, subtraction, division, multiplication,
and modulo (division remainder) respectively.
[**TODO**: any other operators?]

Parentheses (`()`) are used for grouping math expressions.

Anything else is a variable.

```
math 1 + 2 + 3 + 4
```

You can also use the `math` function instead of `$`.

## Credits

Wisp, s-expressions, lisp

`#` from shell, plus breaking from lisp
hence "lispy"
wanted `;` for breaking inline lists
because some formats don't support multiple lines
