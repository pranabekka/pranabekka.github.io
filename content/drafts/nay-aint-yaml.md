+++
title = "NAY Ain't YAML"
## remember to change date on publishing
date = 2025-10-04 22:10:16 # draft date
updated = 2025-10-04 22:10:16
+++

YAML!??? Say NAY!

NAY borrows from YAML, KDL,
and better significant whitespace design.

A NAY example:

```
Pranab (person):
	site (url): pranabekka.github.io
	hobbies:
		*	programming
		*	design (visual and otherwise)
		*	highly informed opinions
```

## Significant whitespace

Significant whitespace is just
really easy to read and write.

```
Name: NAY
Full name: NAY Ain't YAML

Description: "
	A format for structured data
	that's easy to read, write and maintain.

Comparisons:
	*	Language: YAML
		Differences: "
			NAY removes the cruft and complexity
			so authors can't fall into YAML's pitfalls.
		Comments: "
			YAML has a few new specifications
			that address common issues,
			but it can't remove some of the other cruft.
	*	Language: TOML
		Differences: "
			NAY is easier to read and write,
			especially for content with lists and nesting,
			and it doesn't include arbitrary types.
	*	Language: KDL
		Differences: "
			NAY has significant whitespace,
			which makes it easier to write and read.
			It also looks similar to YAML and Python.
			That's it.
		Similarities: "
			Types and type annotations.
```

Well, that went on a bit longer than intended.
But yeah, the significant whitespace
just makes it incredibly easy to read and write.

At the same time,
Python and YAML have shown that there are problems.

Spaces are really hard to keep track of,
especially when the amount is varied.
Additionally, users have different needs
when they're reading a document,
such as font family, font size, and indentation.

So we don't use spaces.
Instead, use a single tab per indentation level:

```
level 1:
	level 2:
		level 3: "
			Hi, I'm a deeply nested string.
```

A tab width of 3 spaces works well for most people,
and they can adjust it if they need to,
as opposed to spaces always being fixed.

There's no rule about how many spaces to use.
It's exactly one tab,
which is however many spaces you need.

## That list syntax

```
*	1
*	2
*	3
*	4
```

List items put tabs after the marker
so that nesting things inside the list is easy.
Here's how nesting would look otherwise:

```
* key 1: value 1
  key 2:
  	key 2.1: value 2.1
  	key 2.2:
  		key 2.2.1: value 2.2.1
```

The spacing for `key2.1` is now uneven,
which gets weirder with different tab widths,
and the user must manually type in spaces.

The list marker is an asterisk,
because it occupies more space in the cell
and has more visual weight,
which matters more when it has more space around it.

```
-	A hyphen is less visible
*	An asterisk is more visible,
	which matters when the marker is stranded
	in the middle of empty space.
```

## That string syntax

Strings are usually unquoted.
If you want to put a string value on a line by itself,
maybe even on multiple lines,
you must indicate that with a double quote (`"`).
Lines with more indentation become part of the string.

```
*	"
	This is a string
a string: "
	This is also a string,
	although it spans multiple lines.
same output: This is also a string, although it spans multiple lines
```

Line-breaks are turned into spaces.
If you want to preserve line-breaks, use `#"`.
The first level of indentation is removed from those.

```
preserving line-breaks: #"
	This is on the first line
	This is on the second line
	There will be a line break between these three
```

Neither of these support backslash escapes.
For that you must use `\"` or `#\"`,
where the one with `#` preserves line-breaks.

```
// Same output as previous example
backslash escapes: #\"
	This is on the first line\nThis is on the second line
	There will be a line break between these three
```

Quotation marks within the content
do not close the string.
Only indentation less than the content closes the string.

## YAML misfeatures

Directives, anchors, aliases, objects, niche types,
tags, url imports and verbose documentation.

These features add a lot of complexity and ambiguity
that give users tools to cause catastrophes
without really helping them write their content.

Such advanced features should use less ambiguous syntax
and a more principled approach,
such as what is provided in languages like
CUE, KCL, Dhall, and Nickel.

Perhaps NAY could include some of these
without the ambiguity that afflicts YAML,
but I think that's better as an additional layer.

The biggest issue with YAML
is that the only user guide on the site
is a long and complicated specification.

## KDL solutions

KDL solves a lot of YAML's ambiguities,
although it's a bit more like XML than YAML or JSON,
and it requires a bit more typing,
though less than XML and JSON.

### Clearer types

Some of YAML's ambiguity comes from
randomly parsing things from strings
and falling back to whatever is possible.

KDL and NAY are very explicit about what's allowed.
For values like booleans and special numbers,
they use the octo-thorpe symbol (`#`):

```
a null value: #null
infinity: #inf
negative infinity: #-inf
not a number: #nan
booleans:
	*	#true
	*	#false
```

If you want to write those without the `#`,
you must use quotes,
which prevents mistakes like
writing a boolean instead of a string
or the other way around.

```
this is an error: true
```

Numbers are anything starting with
`+`, `-`, `.`, `-.`, `+.` or a digit.
If any following characters are not valid,
KDL throws an error and informs the user
instead of converting it to a string.

```
this is an error: 1ff8s9
not an error: "1ff8s9"
```

### Type annotations

KDL allows type annotations in round brackets.
These aren't meaningful to KDL in any way.
It's only for authors and applications to use.

In NAY type annotations also use round brackets,
but they appear after the key and before the colon.
There must be a space between the key
and the type annotation.

```
people (list name):
	*	Alden
	*	Livara
	*	Michael
```

If you want to annotate list items,
put the type annotation above the item:

```
(dog)
*	Labrador
(vegetable)
*	Onion
(number)
*	#nan
```

## Insignificant whitespace

Use `{` or `[` to start a delimited section.
Once you're in, things need delimiters.

```
NAY: {
Ain't:
YAML;
}
```

Another rule: outermost delimiter
must end with same indentation as starting.

```
NAY:
	Ain't: ""
	YAML
	""
```

YAML kinda got this, tbh,
though NAY obviously better.
