+++
title = "Bean markup"
date = 2024-03-13 23:56:12
updated = 2024-03-13 23:56:12
+++

Bean is an extensible markup language,
with generic constructs for delimiting and marking up text,
as well as syntax sugar for commonly used markup,
such as emphasis, lists, and tables.

Bean borrows from the tradition of Markdown,
yet is more obviously influenced by djot and AsciiDoc.

[Djot](https://djot.net)

[AsciiDoc](https://asciidoc.org/)

[Markdown](https://www.markdownguide.org/getting-started/)

**NOTE:** Bean doesn't have an implementation.
This is just an idea in my head right now.

<!--
## Audience

People already familiar with Markdown,
and maybe even other markup languages,
who are interested in plain text markup formats.
-->

## The other formats

Markdown suffers from being a mix of plain-text email conventions
instead of a fully considered specification,
and thus has many complexities,
inconsistencies, and surprises.
The author of CommonMark and djot
has already explained these issues
in 'Beyond Markdown'.

[Beyond Markdown](https://johnmacfarlane.net/beyond-markdown.html)

While I was initially enamoured by AsciiDoc and all its features,
I eventually realised that it has a lot of complex syntax,
which makes it hard to learn and use,
and even harder to port.

Djot is the format I find the most appealing,
though it has made some choices
that I believe could be done better.
Djot's syntax isn't _completely_ fixed yet,
but I obviously can't resist dreaming up my own format.

Typst is another format that I quite like,
although it's currently made for PDF output,
and includes a whole new scripting language.

[Typst](https://typst.app)

MDX is another format that I like,
but just for the component system,
because it's still a Markdown dialect.

[MDX](https://mdxjs.com/)

## Rationale

The first factor that led me to devise another format
was my desire to create and use custom markup elements
that conform to my preferences.

Bean includes 
- concise and regular markup,
- a general syntax that is equal to XML,
except with reduced tag soup,
- convenient syntax sugar for common elements,
- plain text readability,
- and a way to declare custom elements.

## Terms

I want to clarify some terms before I continue,
which I have borrowed from HTML,
due to my familiarity with it.

- **Element:**
  An abstract 'part' of the document,
  identified with tags and delimiters.

- **Tag:**
  A declaration, within the document,
  of an element, its type,
  and optional or required attributes.

- **Delimiter:**
  Marker for where an element begins or ends.

- **Block (Element):**
  A 'block' level element,
  usually delimited by blank lines.
  Examples include paragraphs and lists.

- **Inline (Element):**
  An element that usually occurs within a line of text,
  such as a link or emphasised text.

## Begin

### Paragraphs

As in Markdown and the rest,
a block of text delimited by newlines is a paragraph,
with line breaks converted to spaces.

```
A paragraph.

Another paragraph.
```

### Other blocks, and tags

Bean uses square brackets to tag a block.

```
[tagged-block]
This block is tagged as a `tagged-block` element.
```

Tags can also have options for the element,
such as the language for a verbatim block.

```
[verbatim :language bean]
This block represents Bean markup.
```

### Multi-line tags

Tags can span multiple lines to aid readability.

All the blocks below produce the same content.

```
[tag
  :option1 value1
  option2
  :option3 value3]
Block contents

[tag
 :option1 value1
 option2
 :option3 value3
]
Block contents

[tag :option1 value1 option2 :option3 value3]
Block contents

[
  tag
  :option1 value1
  option2
  :option3 value3
]
Block contents
```

### Nested blocks

A block-level tag within another block-level tag
indicates that it is nested.
"Within" is defined as not separated by a blank line.

```
[parent-block]
parent-block content
[child-block]
child-block content

[parent-block]
[child-block]
child-block contents
```

### Indentation and whitespace

Bean ignores indentation and extra whitespace,
unless it's a verbatim block or a list.
Whitespace at the end is stripped,
and line breaks are collapsed into a space,
unless there is a blank line,
which breaks apart blocks.

The two paragraphs in the following example
produce the same content,
regardless of their indentation.

```
A paragraph that I am writing.

  A paragraph that I am writing.
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

A fenced block defaults to a generic block,
unless there's a tag specifying otherwise.

Fenced blocks can also be nested.

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

### Inline tags

Sometimes you want to mark up a part of a paragraph of text.
A single backtick or more is used to do so.
You can use tags within running text to mark inline content.

```
A paragraph with an inline[tag] element.

A paragraph with an [tag]inline element.
```

The tag identifies it's content using whitespace.
If it comes after whitespace,
it will apply to the content after the tag,
if it comes after a non-whitespace character,
it will apply to the content before it,
and if it is surrounded by whitespace on both sides,
it will not apply to any content.

If you want to tag more than a single word,
use backticks to create an inline fence
and put your tag before the opening backtick,
or after the closing backtick.

```
A paragraph with a
`tagged inline element`[inline-tag].
```

These can also use multiple backticks and be nested arbitrarily,
though it is not encouraged.

Similar to block tags,
inline tags can contain attributes for the element.

```
A paragraph with a `link`[link :target https://example.com].
```

Output:

{% sampleBlock() %}
A paragraph with a [link](https://example.com).
{% end %}

### Lists

This is the first of the syntax sugar,
since using tags and fences for lists
would get tedious very quickly.

```
* List item
* Another list item

1. First item
2. Second item

. First item
. Second item
```

While they appear the same as Markdown at a first glance,
we borrow list syntax from AsciiDoc
and avoid the mistakes and limitations of list syntax
in both Markdown and djot.

Nested list items require extra list item markers
for each level of indentation,
and must share the same indentation
as the first list item.

```
* List item
** Nested list item
* Second top-level list item
  * with running text (this is not a list item)
* Third list item

[hr]

1. First item
1.1. Part 1 of first item
1. 2. Second item (automatically numbered 2)
3. Third item
```

Output:

{% sampleBlock() %}
- List item
  - Nested list item
- Second top-level list item * with running text
  (this is not a list item)
- Third list item

---

1. First item
    1. Part 1 of first item
1. <span>2</span>. Second item <!-- It creates an inline nested list, otherwise -->
3. Third item
{% end %}

Notice how the bullet mark doesn't create a new list item
if it doesn't have the same indentation as the first list marker.
Djot navigates this by requiring a blank line before a nested list,
while Markdown can cause unexpected issues and requires escaping.

### Tables

Tables are another construct that can appear with some regularity.
Bean defaults to comma separated values under a `table` tag,
but you can specify your own separator.

```
[table :header :separator ,]
markup   , rating
markdown , 7/10
djot     , 9/10
asciidoc , 8/10
typst    , 9/10
```

Output:

{% table() %}
| markup   | rating |
| -------- | ------ |
| markdown | 7/10   |
| djot     | 9/10   |
| asciidoc | 8/10   |
| typst    | 9/10   |
{% end %}

### Headings

Bean accomodates for the title
and three heading levels by default.
Further heading levels are discouraged
and require explicit heading tags.

The document title uses four '#' signs,
the first heading level uses three,
the second uses two,
and the third uses one.
This is based on the idea
that higher level headings are more important,
and should be more prominent in plain text,
than lower level headings.

```
#### Document title

An introductory paragraph.

### Level 1 heading

## Level 2 heading

# Level 1 heading
```

### Emphasis

While you could use a generic inline element for emphasis,
bean provides custom delimiters to make it easy.

```
A paragraph with *emphasised text*.
```

Output:

{% sampleBlock() %}
A paragraph with *emphasised text*.
{% end %}

Delimiters for emphasis can also be tagged:

```
Some *emphasised text*[link :target https://example.com] in the paragraph.
```

Output:

{% sampleBlock() %}
A paragraph with [*emphasised text*](https://example.com).
{% end %}

### Openers and closers

Djot has a neat construct for dealing with
complex and nested delimiters:
delimiters can have braces to indicate
whether they are opening or closing delimiters.

```
{*Emphasised * text.*}

{`inline ` fence`}
```

Output:

{% sampleBlock() %}
*Emphasised \* text.* \

``inline ` fence``
{% end %}

This way you can explicitly say where the emphasis should end,
instead of having to worry about escaping delimiter characters.

Another cool thing (I think) djot does,
is to use openers and closers with single and double ticks
to specify whether they're right or left quotes,
though it usually infers them correctly.

```
{"Hello, world"}
```

Output:

{% sampleBlock() %}
"Hello, world"
{% end %}

### Meta-information tag(s)

A meta tag helps set document-level options and properties,
along with a slightly better alternative to frontmatter. [^f-mtr]

[^f-mtr]:
Frontmatter introduces a second language to markdown files,
and breaks the usual flow of markdown,
by moving the level 1 heading and even cluttering it a bit.

```
#### Document title

[meta
  :date 2049-01-01
  :author "Pranab"
]
```

A summary would be a similarly related element.
It provides meta-information about the document,
while not quite being part of the document contents.

```
#### Document title

[meta :date 2049-01-01]

[summary]
A summary of the document,
to be used in listings and previews,
but not when displaying the document directly.
```

### Conditional passthrough

Djot has passthrough blocks that take a format specifier,
so if the export format matches the specifier,
then the contents of the block are passed as is.
This would allow writing raw HTML, for example,
though there should be no need for that in Bean.

```
Regular indentation/spacing.

&nbsp;&nbsp;&nbsp;&nbsp;[passthrough HTML]Indented by four spaces in HTML.

[passthrough HTML]
<ul id="document-formats">
  <li>Djot</li>
  <li>AsciiDoc</li>
  <li>Markdown</li>
</ul>
```

Output:

{% sampleBlock() %}
Regular indentation/spacing.

&nbsp;&nbsp;&nbsp;&nbsp;Indented by four spaces in HTML.

<ul id="document-formats">
  <li>Djot</li>
  <li>AsciiDoc</li>
  <li>Markdown</li>
</ul>
{% end %}

## Waffle

**NOTE:**
These are random unorganised and/or incomplete bits.

### Tag syntax

I'm not a 100% sure about the tag property syntax.
These are the three main options I considered:

```
[tag option1=value1 option2 option3=value3]

[tag :option1 value1 option2 :option3 value3]

[tag option1 value1 option2 true option3 value3]
```

The last is the easiest to type,
but I don't feel like the difference is that big,
plus having an indicator like the colon or equal sign
can be quite helpful, and thus worth the extra character.
I guess the second has the benefit
that you won't need to escape equal signs?

### Classes and IDs

```
[.big .red]
Big red paragraph (has "big" and "red" classes)

[#warning]
This paragraph has the "warning" ID
```

This is another concept that djot has.
I'm not quite sure it's necessary or even desired,
and it injects a bit of HTML in some ways.

### Custom elements/tags

Roughly the same as custom components in MDX,
except you use Bean tags instead of XML/HTML.

I guess it would be implementation dependent,
so there's no real point of examples here,
though if I were to require an extension language,
I'd pick an S-expression language.

I was imagining the API would be something simple like
defining a function that takes in the tag contents
and outputs HTML by manipulating child tags and text content.

### Bean as an extensible markup format

Bean is basically the same as HTML and XML,
with some syntax differences,
and a few added conveniences for authoring documents
(such as the syntax sugar for lists).
At a base level, it has
tags, attributes, nested tags, and text content.

An initial Bean compiler can just
use the base tag and block/inline rules,
and automatically convert them to HTML/XML tags.

Here's an HTML in Bean example:

```
[ul :id "document-formats"]
[li]Djot
[li]AsciiDoc
[li]Markdown
```

Looking at that,
I'm almost tempted to remove syntax sugar for lists.

Anyway, the basic rules make Bean a decent document/data format,
though the syntax will make it more or less suitable
for various uses.

### Fences as code

Initially, fences defaulted to code if no tag was given,
but then I thought that shouldn't be default behaviour
to avoid specialising too much for writing about programming.

### Cool features to consider

- Namespaces to avoid custom tag collisions.
- `import <package> as <nickname>` statements
  to avoid namespace collisions?
  Maybe in the meta tag.
- Some sort of package registry and manager?
- Default config file for all Bean files within folder.
- Comments --- probably using the djot method.
  Better than adding extra syntax sugar.
  Maybe a comment "tag" and/or attribute?

### Table wrappers

I really dislike how tables break layouts
if they stretch past the page width,
so I'd like Bean to automatically insert
a `div.tablewrapper` around them,
either by over-riding the default component,
or creating a custom component.

### Details component

```
[details]
[summary]This is the summary of this block
Insert any ol' content over here,
which will be displayed when the details element is opened.
```

{% sampleBlock() %}
<br>
<details>
<summary>This is the summary of this block</summary>
Insert any ol' content over here,
which will be displayed when the details element is opened.
</details>
<br>
{% end %}

Another option is to use fences,
and make the first block the summary.

```
[details]
``
This block is the summary

Any other blocks are part of the hidden content.
``
```

Trying them out will give the answers.

### Inline tag nesting

Later tags should be nested inside earlier tags
when they're prefixed.

```
[parent-inline-tag][child-inline-tag]content
```

But what about suffixed inline tags?
Just reverse the order?

```
content[child-inline-tag?][parent-inline-tag?]
```

### Inline vs block elements/tags

Would it be okay to mark a heading or other block
with a lone inline tag?

```
[h4]My heading
```

The h2 component would know this is a block,
but how does the surrounding context know this?
How do I prevent it from wrapping it in a paragraph?

What about a suffixed inline tag?

```
`My heading`[h1]
```

Perhaps the wrapper checks its contents
before deciding to be a paragraph, a div,
or whatever the inline tag specifies as a block element.
Or maybe it just errors out?
Like, a paragraph cannot take a block element,
but things like lists can.
So the inline/block nature of the tagged element doesn't quite matter,
but it does matter in the case of a parent element
that disallows block elements inside it.

Perhaps, if there is only one child block element,
it swallows the parent element?
That seems like a bad idea.
Simply erroring out is probably best.

### Block link syntax

Similar to that in gemtext:

```
=> https://example.com my link text
```

[Gemtext](https://gemini.flounder.online/docs/gemtext.gmi)

Block links can be increased in size
to improve the experience of tapping or clicking them,
without disrupting any surrounding text.

A dedicated syntax should encourage that.

A details and/or aside element
can be used to move large lists of links
out of the way.

### Unknown blocks

Unknown blocks can be rendered with a label at the top,
and the verbatim contents of the block.
It could include a warning inside a prominent box
to say (in the HTML) that it's unknown.

Probably emit an error and cancel building
if the build is for production,
though allow configuration to disable that.
And log a warning for dev builds.

### attribute accumulation

djot allows accumulating attributes (for block only?).
maybe using an & block to accumulate instead of nest?

### definition lists

how does asciidoc do it?

djot requires loose lists for definition lists

maybe this:

```
: item
- definition?
: item
  continued
- definition?
```

i don't think hyphens (at beginning of line)
have any other significance.
though maybe i want to keep it for hyphens.

```
: item
= definition
: item
  continued
= definition
```

that should work, i think.
and the `=` sign carries some related meaning,
like `item = definition`.
