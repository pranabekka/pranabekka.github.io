+++
title = "A Bean-troduction"
date = 2024-05-21 18:08:41
updated = 2024-05-21 18:08:41
+++

An introduction to the (currently imaginary)
Bean markup language,
with some comparisons to Markdown.

## Paragraphs

Writing a paragraph is roughly the same:

```
This is a paragraph.
Multiple consecutive lines belong
to the same paragraph.

Blank lines start a new paragraph.
```

## Headings

Bean does something a bit different with headings:

```
#### Document title

### A level 1 heading

## A level 2 heading

# A level 3 heading
```

Only three heading levels have syntax sugar,
and the higher the heading level,
the more marks it has ---
in order to maintain visual hierarchy.

Bean supports additional heading levels,
but that's through the generic tag syntax.
If you find yourself requiring those levels,
you might be better served by a list.
(Well, I'm just buying into what Edward Tufte says.)

## Code

Fences in Bean simply mark an area of text,
either as a span or div.
You must use the `code` tag, or a `:lang` attribute
if you want to create a code block.

````
[code :lang javascript]
```
let markup = "Bean"
```

[:lang javascript]
```
const MARKUP = "Bean"
```
````

Bean avoids specialising for code,
though users of markup languages are likely programmers.
I'll have to see about the decision,
but I think it's the correct one.

Indented code is not a thing.
In fact, indentation is ignored throughout Bean,
unless a block assigns special meaning to it.

## Lists

Bean's list syntax is borrowed from Asciidoc.
It avoids complex list rules and related accidents.

<!-- TODO: write a better example use case -->

```
* list item 1
** sub-list item 1
* list item 2.
  * continuation of list item 2
```

In Markdown, the continuation of list item 2 would require an escape character.

```
* list item 1
  * sub-list item 1
* list item 2.
  \* continuation of list item 2
```

Rendered HTML output:

{% sampleBlock() %}
* list item 1
  * sub-list item 1
* list item 2.
  \* continuation of list item 2
{% end %}

## Tables

Bean provides can create tables from comma-separated values,
but it also allows you to specify your own.

```
[table :sep |]
cell 1 | cell 2 | cell 3
```

## Extension

If you want to do anything beyond
the syntax sugar provided by Markdown,
you must rely on HTML.

Bean provides a generic tag syntax
that can be directly translated to HTML or XML,
which you've already seen
in the form of the `code` block.

```
[details]
[summary]`A summary of this block`
Any ol' content you want to show
when the details block is expanded.
```

Notice how the backticks don't specify code,
but instead mark the boundaries of the tagged (summary) content.

Bean also has some syntax sugar for tags.
To create a div with a specific class,
you can simply use `[.class-name]`.
The same goes for IDs.

```
[#div-id.class-name]
content
```

```
<div id="div-id" class="class-name">
  content
</div>
```

You've also seen the attribute syntax
being matched to an appropriate element,
but it can be used to set an attribute for a div.

```
[:data-value skip]
```

```
<div data-value="skip"></div>
```

If/when I get this far,
I also intend to implement a scripting interface
to create your own blocks,
maybe with syntax sugar or over-rides included.

For a more comprehensive explanation of Bean,
see my previous post on its syntax and features.

[Bean markup](@/bean-markup.md)
