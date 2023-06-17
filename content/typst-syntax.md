+++
title = "Typst Syntax"
date = 2023-06-17 11:26:09
updated = 2023-06-17 11:26:09
+++

I've mentioned [Typst](typst.app) here and there,
but I just thought I should give it a proper mention.
They've done a lot of interesting things
to make it easy to write large documents.
For this post, I just want to talk about the syntax.

**NOTE:** Typst is currently in Beta,
and the things I mention might change in the future,
although the general architecture should be the same.

Typst has three types of syntax ([modes](https://typst.app/docs/reference/syntax/)):
content, math, and code.
Content is a lot like [Markdown](https://www.markdownguide.org/getting-started/),
with headings, paragraphs, lists, links, and so on.
Math is a way to enter formulae with all kinds of special symbols.
Code is a little bit like [TeX](https://en.wikipedia.org/wiki/TeX)'s macros,
except they're actually full-fledged functions
in a specially created programming language.
There's a function to describe macros as well.

When you start writing a Typst document,
you're in content mode.
To enter math mode, you type a dollar sign
and write out your formulae using math mode syntax.
To enter code mode you use an octothorpe ('#')
followed by the name of the function,
and the arguments to the function.
For example, `#heading(level: 1, [Heading Level 1])`
calls the heading function asking for
a level 1 heading with the text "Heading Level 1".

Typst's syntax is actually built completely on code.
When you write out special syntax in content mode,
it gets converted into code.
Continuing the heading example,
when you write `= My Document`,
it gets transformed into `#heading(level: 1, [My Document])`.
When you write a paragraph of text,
it implicitly calls `#para([Paragraph Content])`.
When you write math like `$ x + y $`,
it gets converted into `#equation([x + y])` (I think).

And that's the coolest thing about Typst's syntax.
This programming language allows you to do lots of exciting things:

- [Create custom functions](https://typst.app/docs/reference/types/function/#definitions)
  that you can use in your documents.
- [Create/override syntax](https://typst.app/docs/reference/styling/#show-rules)
  that implicitly calls your functions, or any other Typst function.
- [Import](https://typst.app/docs/reference/scripting/#modules)
  other Typst files, both content and functions.
- [Import arbitrary files](https://typst.app/docs/reference/data-loading/),
  such as JSON, CSV, or any plain text file.
- [Draw](https://typst.app/docs/reference/visualize/) arbitrary shapes.
  Functions for plotting and diagrams are also being worked on.

Typst's biggest current limitation (for me)
is that it only supports PDF output,
but HTML output is in the works and should be ready in a few months.
Along with that, I think they'll include exporting an intermediate format,
such that you can use Typst to calculate most of the layout and results,
then get a structured representation of the resulting content,
so that you can transform it into whatever you like.

Additionally, Typst is not out of Beta,
so things change nearly every month or so.
However, you can already do exciting stuff with it,
and I would encourage you to try it out.
Start with the tutorial at [typst.app/docs/tutorial](https://typst.app/docs/tutorial).
