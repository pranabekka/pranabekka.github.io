+++
title = "Arbitrary proper markup"
date = 2026-01-21 21:07:03
updated = 2026-01-21 21:07:03
+++

Ruminating on Ginger Bill's post on the same.

[The Only Two Markup Languages](https://gingerbill.org/article/2026/01/19/two-families-of-markup-languages)

He says XML and TeX are the only families
of proper arbitrary markup.
I guess the biggest difference between the two
is that a TeX-like would be less verbose
than an XML derivative,
but I feel like `</node>` can become `</>`
and then the difference in verbosity is negligible.

Anyway, here's the two families for demonstration.

SGML/XML:

```
<node>Some arbitrary text</node>
<node attribute=value>Some arbitrary text</node>
```

TeX-like:

```
\node{Some arbitrary text}
\node[attribute=value]{Some arbitrary text}
```

While Ginger Bill claims only the above two
allow wrapping arbitrary text,
in truth, any data format allows it,
because text/strings are a universal data type.

JSON:

```
["node", "Some arbitrary text"]
["node", {"attribute": "value"}, "Some arbitrary text"] 
```

NestedText (I can't write YAML):

```
-
  - node
  - Some arbitrary text
-
  -
    attribute: value
  - Some arbitrary text
```

S-expression-like:

```
[:node "Some arbitrary text"]
[:node [@ :attribute "value"] "Some arbitrary text"]
```

KDL:

```
node "Some arbitrary text";
node attribute=value "Some arbitrary text";
```

There are only three differences between TeX/XML
and the other languages in the examples above.

First, we're working with a subset of these languages.
This means proper arbitrary markup in KDL
will always be valid KDL,
but not all valid KDL will be
valid proper arbitrary markup.
That's not a big deal, though,
because not all plain-text files are valid TeX either.
In fact, using a subset of a structured language
like KDL or S-expressions is quite useful.

The second difference is that these other languages
require wrapping the whole document,
because text/strings only allow text inside them.
While I don't think TeX requires it,
XML and well-formed HTML do require it,
and most authors do wrap the whole document.
Additionally, even for a derived format,
these documents are implicitly wrapped
in a `\texdoc` or `<html-doc>` node anway.
It helps to imagine the data structure,
which would be some kind of document struct.
Finally, it's trivial to add an extra node
while you're marking up the rest of the document.

The third difference is that
nesting nodes is a bit roundabout and unintuitive,
which is also because strings only allow text inside.
Nesting uses the same amount of insertion points,
but it's not as simple as an open and close tag.
Instead, it's more of a close previous and open new.
I don't think it's too hard to learn, though.

Here's how XML looks:

```
<outer>Some arbitrary text</outer>
<outer>Some <inner>arbitrary</inner> text</outer>
```

Here's how KDL looks:

```
outer "Some arbitrary text"
outer "Some " { inner "arbitrary" } " text"
```

In XML we insert `<inner>` and `</inner>`,
but in KDL we insert `" { inner "` and `" } "`.
It's helpful to think of it as
closing the previous part of the text
and then opening the next part of the text,
and maybe NestedText would make this easier
because opening and closing are easy to see.
This would be the key difference between
TeX/XML-likes and the other languages I mention.

Though we're essentially at the end of our rumination,
I'm going to briefly mention escaping.

NestedText requires indenting your text content
instead of allowing you to just add nodes,
but even TeX and XML require escaping characters
inside the text content of the nodes.
KDL is the only format
that allows just adding nodes
without escapes for the characters inside them.
TeX/XML-likes could probably create something similar.

```
node #"Some arbitrary text with a " character"#
node ##"Some arbitrary text with "# characters"##
```

I'd like to conclude this post by saying
Wasted Eyes by Amaarae is a fun song.
I don't understand genres,
but Wikipedia says she's known for
her fusion of pop, R&B, Afrobeats and alté.

Have fun!
