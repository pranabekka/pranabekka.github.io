+++
title = "Code, comments, data"
date = 2024-09-21 02:03:31
updated = 2024-09-21 02:03:31
+++

You only need these three syntax highlighting faces.

Anything more is redundant and maybe even harmful,
because most syntax is designed with
plain text as a visual medium.

For example, take the asterisk (`*`)
used for emphasis and bold in markdown:
it was inspired by people using it (the asterisk)
to make some text stand out more than the rest.

Similarly, the syntaxes for programming languages
use characters to form symbols and icons
to represent various concepts,
like quotes (`"`) for "quoting" text (strings),
and `|>` or `->` as arrow symbols
that indicate piping or return values.

So syntax elements are already
visually distinct from each other.

Having a different highlight for every syntax element
makes all syntax elements blend together,
which defeats the purpose of having syntax highlighting.

However, the solution isn't having a single style,
because comments and data (mainly strings [^data])
can include the exact same symbols without any meaning.

This makes it important to separate comments and data from code.
And so, you highlight code, comments, and data
as separate objects from each other.

[^data]: Structured data like arrays and maps
already use symbols to visually mark them,
so they don't need syntax highlighting.
