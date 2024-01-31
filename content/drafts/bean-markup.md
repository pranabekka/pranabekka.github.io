+++
title = "Bean markup"
## remember to change date on publishing
date = 2024-01-30 10:33:12 # draft date
updated = 2024-01-30 10:33:12
+++

Bean is an extensible markup language,
with constructs for delimiting and marking up text,
as well as syntax sugar for commonly used markup,
such as emphasis, lists, and tables.

Bean borrows from the tradition of Markdown,
yet is more obviously influenced by djot and AsciiDoc.

[Markdown](https://www.markdownguide.org/getting-started/)

[Djot](https://djot.net)

[AsciiDoc](https://asciidoc.org/)

## Audience

People already familiar with Markdown,
and maybe even other markup languages,
who are interested in plain text markup formats.

## Some prior art

Markdown suffers from being
an ad-hoc specification with many issues.
The author of CommonMark and djot
has already explained these issues
in 'Beyond Markdown'.

[Beyond Markdown](https://johnmacfarlane.net/beyond-markdown.html)

While I was initially enamoured by AsciiDoc,
I eventually realised that it has a lot of complex markup,
and even more complex rules of its own,
which makes it hard to implement and use.

Djot is the format I find the most appealing,
though it has made some choices
that I believe could be done better.

Typst is another format that I quite like,
although it is currently made for PDF output,
and is much more complex.

[Typst](https://typst.app)

MDX is another format that I like,
for the components system.

[MDX](https://mdxjs.com/)

## Rationale

The first factor that led me to devise another format
was my desire to create and use custom elements
that conform to my preferences.

Bean includes 
- concise and regular markup,
- a general syntax that is equal to XML,
except with reduced tag soup,
- convenient syntax sugar for common elements,
- and a way to declare custom elements.

## Terms

I want to clarify some terms before I continue,
which I have borrowed from HTML,
due to my familiarity with it.

- **Element:**
  An abstract 'part' of the document,
  delimited from other parts
  with tags and delimiters.

- **Tag:**
  A declaration, within the document,
  of an element, its type,
  and some of its options.

- **Delimiter:**
  Markers for the beginning and end
  of an element's contents. 

- **Block (Element):**
  A 'block' level element,
  usually delimited by blank lines.
  Examples include paragraphs and lists.

- **Inline (Element):**
  An element that usually occurs within a line of text,
  such as links and emphasised text.

## Begin

### Paragraphs

As in Markdown and the rest,
a block of text delimited by newlines is a paragraph,
with line breaks converted to spaces.

```
A paragraph.

Another paragraph.
```

### Other blocks and tags

Bean uses square brackets to tag a block.

```
[tagged-block]
This block is tagged as a `tagged-block` element.
```

Tags can also have options for the element,
such as the language for a verbatim block.

```
[verbatim language bean]
This block represents Bean markup.
```

### Fenced blocks

Block elements can also be delimited by
two or more backticks.

```
[tag]
``
This is a block element.

This is a second block within the block element.
``
```

**TODO**: make fenced blocks generic divs by default,
to avoid making it programming/dev focussed

A fenced block defaults to a code block,
unless there's a tag specifying otherwise.

Fenced blocks can be nested.

`````
[fenced-block]
``
  [nested-fenced-block]
  ```
  nested fenced block contents
  ```
``
`````

Fenced blocks can also contain blocks that are not fenced.

`````
[unordered-list]
``
  [list-item]
  First list item

  [list-item]
  Second list item
``
`````

Of course, lists are quite common,
and would be tedious to type like that.

### Lists

This is the first of the syntax sugar.

```
* List item
* Another list item
```

### Tables

Tables are another construct that can appear with some regularity.
We simply use comma separated values under a `table` tag,
although you can choose your own separator.

```
[table header true]
markup   , rating , reason
mardown  , 7/10   , it was the first and most popular
djot     , 9/10   , incredibly clean and consistent
asciidoc , 8/10   , featureful but too complicated
typst    , 9/10   , incredibly clean and consistent
```

Output:

{% table() %}
| markup   | rating | reason |
| -------- | ------ | ------ |
| markdown | 7/10   | it was the first and most popular |
| djot     | 9/10   | incredibly clean and consistent |
| asciidoc | 8/10   | featureful but too complicated |
| typst    | 9/10   | incredibly clean and consistent |
{% end %}

### Inline

Sometimes you want to mark up a part of a paragraph of text.
A single backtick or more is used to do so.

```
A paragraph with an `inline` element.
```

**TODO**: make fenced blocks generic spans by default,
to avoid making it programming/dev focussed

Inline elements default to code,
as seen in fenced blocks.

The tag for an inline element occurs after the delimiters,
so that the focus remains on the content.

```
A paragraph with a
`tagged inline element`[inline-tag].
```

Similar to block tags,
inline tags can contain attributes for the element.

```
A paragraph with a `link`[link target https://example.com].
```

Output:

A paragraph with a [link](https://example.com).

### Emphasis

While you could use a generic inline element for emphasis,
bean provides custom delimiters to make it easy.

```
A paragraph with *emphasised text*.
```

Output:

A paragraph with *emphasised text*.

### Openers and closers

Djot has a neat construct for dealing with
complex and nested delimiters.

Delimiters can have braces to indicate
whether they are opening or closing delimiters.

```
{* Emphasised * text. *}
{` code ` block `}
```

Output:

*Emphasised \* text.* \
``code ` block``

### Lists, part 2

Returning to lists;
while they appear the same as Markdown at a first glance,
we borrow list syntax from AsciiDoc
and avoid the errors and limitations of list syntax
in both Markdown and djot.

```
* List item
** Nested list item
* Second top-level list item
  * with running text (this is not a list item)
* Third list item
```

Output:

- List item
  - Nested list item
- Second top-level list item * with running text
  (this is not a list item)
- Third list item

Notice how the bullet mark doesn't create a new list item
if it doesn't have the same indentation as the first list marker.

## Questions, extra

```
[verbatim language=bean]

[verbatim :language bean]

[verbatim language bean]
```
the last is easy to type \
might need to defend it \
could use parens or double quotes for multiple options

```
[block]
[nested-block]
```
kinda makes sense, frankly

```
[block]
block text content
[nested-block]
nested-block text content
```
