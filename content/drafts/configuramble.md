+++
title = "Configuramble"
## remember to change date on publishing
date = 2025-10-16 13:34:23 # draft date
updated = 2025-10-16 13:34:23
+++

KDL's 50 or so types, HRD and NestedText++.

Disclaimer: These is m'opinions.
I shan't write "I think" or the like everywhere.

Alright, so.

I'd say KDL is the best general-purpose data format,
while NestedText is almost the best config format.

KDL has around 50 types,
though only a few commons ones have "syntax sugar"
It also uses curly brackets instead of indentation.
We'll probably uncover issues with KDL,
but it's the best currently usable format.

KDL has syntax sugar for
strings, numbers, booleans, null and comments.
All the other types use type annotations,
which can generally be whatever you want,
but there's around 40 reserved ones,
all but two of which come from international standards.

This includes date, time, date-time, duration,
currency, country codes, country subdivisions,
email, hostname, ipv4/v6, url, uuid, regex and base64.

All these types mean easy and consistent data interchange
without cluttering the core syntax of the format.
A KDL document can be sent to arbitrary places,
and the receiver will know what the data represents.

I've seen complaints about serialisation,
but most platforms that require serialisation
use containers for delimiting data
and ensuring it's passed along reliably.

[KDL website](https://kdl.dev)

```
package { name my-pkg ; version "8.10"; author Alice Bob }
package-2 \
	name=my-pkg \
	version="8.10" \
	author="Alice Bob" \
	published=(date)"2025-05-05"
scripts {
	build (shell script)#"""
		echo "foo"
		python -c 'print("hello, world!")'
		echo "foo" > some-file.txt
		"""#
}
// The `(date)` type annotation requires ISO8601 format
published (date)"2025-05-05"
```

All that said, NestedText is the easiest format to
read and write.
It has dictionaries, lists, and raw strings.
Raw strings mean that it can embed any "DSL"
or "syntax sugar".
The specific string format also means
that there's _no escapes at all_.

A NestedText document derives meaning from schemas.
Any document must first be parsed before being used.
Even if a data format, such as JSON,
has a few extra types like numbers and booleans,
it can't represent all the types and constraints
of your program.
After a library parses the data, you must validate it
and parse it further into the types for your app.

NestedText skips most of this intermediate parsing,
and only includes the bare necessities for structure.
KDL addresses this issue with type annotations,
but its syntax sugar makes things complicated.
It's mostly a format for programmers.

NestedText is usable by any end-user.
There's four common markers for the four types,
one of which is comments,
and nesting looks just like lists in regular documents.

There's also markers for "flow" lists and maps,
as well as one for multi-line keys.
While I don't see a use for multi-line keys,
it's better to have it than use `\n` everywhere.

[NestedText website](https://nestedtext.org)

```
package:
  name: my-pkg
  version: 8.10
  author: Alice Bob
package-2
    name: my-pkg
   version: 8.10
  author: Alice Bob
  published: 2025-05-05
scripts:
  build:
      > echo "foo"
      > python -c 'print("hello, world!")'
      > echo "foo" > some-file.txt
```

I can think of three improvements to NestedText.
One is to require exactly one tab per indentation,
another is to add type annotations,
and the last is to require some common parsers/types.

NestedText currently allows any amount of spaces.
While it's easy for end-users to just use spaces,
you can't expect them to use a formatter,
nor can you expect them to measure their spaces,
especially for longer documents
where values with the same indentation level
have several lines between them.
Tabs make indentation and nesting evident,
and can be adjusted to match the preferences
of the people who like it a specific way.

Type annotations allow ad-hoc structures,
without having to write a schema.
You can take in some annotated data
and play with it immediately,
or write out some annotated data
and have your app parse it quickly.
You can also register custom types with the parser,
and you'll get a nice data structure.
You could, for example, register a function
that creates a `User` object for a `user` annotation.

As for the common parsers/types,
I think that's self-explanatory.
They're applied if there's an annotation or schema.
Users and apps can rely on them to be present.

I also wouldn't use the same types as KDL.
Those types are more familiar to programmers in general.
I might make dates use `DD mmm YYYY` or `mmm DD, YYYY`,
like "5 Dec 2025" or "Dec 5, 2025".
Standard formats might still be used as `iso-date`
or something similar.

Incidentally, most types have some annotations in them,
which can be used to figure out various formats.
For example, `8s` is a duration in seconds,
and `8h 5m` is a duration in hours and minutes.
With a `duration` type built-in,
apps can re-use them through schemas
and users can rely on these definitions.

```
package: {name: NestedText++, version: 8.10, author: Alice Bob}
package2:
	name: NestedText++
	version: 8.10
	author: Alice Bob
	:: _ date
	published: May 5, 2025 IST
scripts:
	:: _ script-sh
	build:
		> echo "foo"
		> python -c 'print("hello, world!")'
		> echo "foo" > some-file.txt
```

While I'm here, I wanted to mention HRD
from the Genode/SculptOS project.
It's a very small and very pretty looking format
that shares characteristics
with NestedText, XML and tables.

HRD is made up of nodes like XML and KDL,
but with the only types being nodes, attributes,
and raw strings.
It uses a lot of line prefixes like NestedText,
which makes raw strings very easy to use,
but it also allows putting everything on a single line
by using the `|` character.
The `|` character is similar to a `;` or `,`
from other programming languages.
It also ends documents explicitly with `-`.
All this makes HRD a beautiful format for some people,
but I wouldn't make most end-users write it,
since it has a lot more rules than NestedText,
and uses spaces for indentation and alignment.

[HRD introduction post](https://genodians.org/nfeske/2024-12-20-moving-on-from-xml)

```
config
+ libc
+ vfs
| + rom genode_logo.png
| + rom grid.png
| + rom sticks_blue.png
+ fill  color: #223344
.
. This image node is "crossed-out".
x image | png:    sticks_blue.png
|       | scale:  zoom
|       | anchor: bottom_left
|       | alpha:  200
+ image | png:    genode_logo.png
        | anchor: bottom_right
        | alpha:  150
-
```
