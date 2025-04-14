+++
title = "KDL solves"
date = 2025-04-14 00:32:51
updated = 2025-04-14 00:32:51
+++

KDL versus issues with TOML, YAML, and JSON.

For some reason, people don't seem to know of KDL,
or think of it,
when issues with other related languages pop up.
It's much newer, but I think it's pretty great.

[KDL website](https://kdl.dev)

{{ imageLogo(alt="Unofficial dark KDL logo", path="/kdl-logo-dark.svg") }}

## Brief intro

KDL is node-based.
Newlines and semicolons end nodes.

```
node1
node2; node3
node4
```

The first item is the name of the node,
and the rest are children.

```
a-node child1 child2
```

Nodes can have properties mixed in with children.

```
node child1 prop1=something child2
```

Child nodes can be nested using curly braces.

```
node a-child {
	nested-child
	nested-child
	nested-child
}
```

Alright, let's get into it.

## Comments

For starters, there's comments.

```
{ "json": "conspicuously missing comments" }
```

```
// bask in glory, believers
kdl has comments

/*
multiline comments
*/
kdl has /*no*/ multi-line comments
```

In fact, KDL also includes
syntax for commenting out a single node.

```
// `/-` will only comment out `no`
kdl has /-no comments

servers {
	// uh-oh, banned
	// `/-` will comment out `north-america { ... }`
	/-north-america {
		provider DataCentre's R Us
		ip "123:456:789:111"
		location Dallas
	}
	india {
		provider BareMetal Inc.
		ip "123:456:789:111"
		location Tiruvanantapuram
	}
	armenia {
		provider iServer
		ip "123:456:789:111"
		location Tsaghkadzor
	}
}
```

Neither multi-line comments, nor node comments,
are present in the others.
If you wanted to comment out one item on a line,
you'd first have to break it up into multiple lines.

```
# before
yaml: [6, 7, 8, 9, 10]

# after
yaml:
	- 6
	- 7
	- 8
	# - 9
	- 10
```

```
# before
toml = [6, 7, 8, 9, 10]

# after
toml = [
	6,
	7,
	8,
	9,
	# 10,
]
```

```
// before
kdl 6 7 8 9 10

// after
kdl 6 7 8 /-9 10

// after (verbose)
kdl 6 7 8 /*9*/ 10
```

## Simple nesting

Nesting structured entries in TOML
means typing the same identifier every time.

```
# uh-oh, banned
# [servers.north-america]
# provider = "DataCentre's R Us"
# ip = "123:456:789:111"
# location = "Dallas"

[servers.india]
provider = "BareMetal Inc."
ip = "123:456:789:111"
location = "Tiruvanantapuram"

[servers.armenia]
provider = "iServer"
ip = "123:456:789:111"
location = "Tsaghkadzor"
```

We already showed this example in KDL,
which doesn't repeat identifiers when nesting.

{% details(summary="Nesting example in KDL.") %}
```
servers {
	// uh-oh, banned
	/-north-america {
		provider DataCentre's R Us
		ip "123:456:789:111"
		location Dallas
	}
	india {
		provider BareMetal Inc.
		ip "123:456:789:111"
		location Tiruvanantapuram
	}
	armenia {
		provider iServer
		ip "123:456:789:111"
		location Tsaghkadzor
	}
}
```
{% end %}

A list of structured entries in TOML
will also require you to type in the identifier every time:

```
[users] # this bit is optional, as far as i know

[[users]]
name = "Alden Thorn"
age = 16
location = "Anesidora"

[[users]]
name = "Rhea Conn"
age = 55
location = "Orphaberg"

[[users]]
name = "Valtteri Syva"
age = 21
location = "Kelthelis"
```

It's much simpler in KDL.
Nodes don't need unique names,
and `-` is a valid identifier,
used for marking list items.

```
users {
- { name Alden Thorn
	age 16
	location Anesidora }
- { name Rhea Conn
	age 55
	location Orphaberg }
- { name Valtteri Syva
	age 21
	location Kelthelis }
}
```

Here's a more confusing TOML example
with nested lists and dictionaries:

```
[products]

[[products.categories]]
name = "Fruits"
description = "Juicy fruits from brands like Yo Mama and more."

	[[products.categories.items]]
	name = "Apple"
	price = 50

	[[products.categories.items]]
	name = "Banana"
	price = 30

[[products.categories]]
name = "Grain"
description = "The finest waffle-head in existence."

	[[products.categories.items]]
	name = "Rice"
	quantity = 1000
	unit = "grams"
	price = 100
```

KDL involves much less typing,
and significantly simpler nesting and list rules.

```
products {
	categories {
		- {
			name Fruits
			description """
				Juicy fruits from brands like Yo Mama and more.
				"""
			items {
				- name=Apple price=50
				- name=Banana price=30
			}
		}
		- {
			name Grain
			description """
				The finest waffle-head in existence.
				"""
			items {
				- name=Rice quantity=1000 unit=grams price=100
			}
		}
	}
}
```

## Multi-line raw strings

Imagine a shell script in a build config:

```
{
	"fooBarDir": "echo \"foo\"\necho \"bar\"\ncd C:\\path\\to\\dir"
}
```

This is basically why CI configs started using YAML.
Here's the KDL equivalent:

```
fooBarDir #"""
	echo "foo"
	echo "bar"
	cd C:\path\to\dir
	"""#
```

Any indentation matching the closing quotes (`"""#`) is removed,
and there's no need for escapes in a raw string (indicated with `#`),
which makes the string much more readable.

## Verbosity

KDL uses just a bit of significant whitespace to reduce verbosity,
so that you don't need to type equal signs or colons for each entry.

```
{
	"lang": "json",
	"author": "Douglas Crockford",
	"year": 2000
}
```

```
lang = "TOML"
author = "Tom Preston-Werner"
year = 2013
```

```
lang: YAML
author: Clark Evans
year: 2001
```

```
lang KDL
author Kat Marchán
year 2020
```

KDL is all data, no markup ---
no commas, equal signs, colons, or quotes!

## Clearer types

- Anything starting with a number must be a number.

- Anything starting with `+`, `-`, `.`, `-.`, or `+.`,
  followed by a number must also be a number.

- Anything starting with `0x`, `0o`, or `0b`
  are literals for hexadecimal, octal, and binary, respectively.

- If it starts with a `#`, it's a special value,
  such as raw strings, `#true`, `#false`, and `#null`.

- If there's quotes, it's a string.

- Items need to be quoted
  if they have one of `[]{}()\/#";=` or spaces,
  or are one of `true`, `false`, `null`, `inf`, `-inf`, or `nan`.

- Everything else is a string.

- Any value can be prefixed with a type annotation,
  like `(date)"2025-04-11"`.
  This has no special meaning in a KDL document.

You can't accidentally mix up numbers and strings in KDL,
such as when hex codes are used for colours.
Have a look at the following YAML:

```
- 1810 # number
- 1910 # number
- 1a10 # string
- 1b10 # string
- 1e999 # number: 'e' means 'exponent'
```

KDL will raise an error if there's alphabets mixed in:

```
- 1810 // number
- 1910 // number
- 1a10 // error: starts with number, but contains a
- 1b10 // same error as above
- 1e999 // number: 'e' means 'exponent'
```

Instead, you can use strings or hexadecimal literals.

```
hex-colours {
	red 0xff0000
	green 0x00ff00
	blue 0x0000ff
}

error-colours {
	red ff0000 // string
	green 00ff00 // error: 'ff' in number
	blue 0000ff // error: 'ff' in number
}

string-colours {
	red "ff0000"
	green "00ff00"
	blue "0000ff"
}

typed-colours {
	red (colour)0xff0000
	green (colour)0x00ff00
	blue (colour)0x0000ff
}
```

## Try it out

There's a web playground where you can type KDL
and see the syntax tree for it.
Errors are clearly highlighted,
though you need a mouse to hover and see details.

There's also implementations in several languages.

[KDL playground](https://kdl.dev/play)

[KDL implementations](https://kdl.dev/#implementations)
