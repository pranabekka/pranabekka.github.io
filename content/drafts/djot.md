+++
title = "Djot"
## remember to change date on publishing
date = 2024-02-01 11:14:54 # draft date
updated = 2024-02-01 11:14:54
+++

Djot is a pretty cool markup format
that contains the lessons learnt by the author
of the CommonMark spec and implementation.

I've mentioned it here an there,
and thought I might as well write about it.

## Semantic output

Before I get into the markup proper,
I want to mention the output of the Javascript implementation
(I haven't tried the others).

When you write a heading and the content under it,
djot wraps them inside a section tag with the ID,
which I found confusing and off-putting at first,
but actually makes quite a bit of sense.

1. The section tag is meant to mark *sections* of content.

   Djot makes semantic HTML the default.

2. Redirecting to the section
   helps add some space between the heading
   and the top edge of the screen.

3. The heading isn't obscured by additional markup in HTML.

4. Sections are visually distinct in the HTML output.

After the initial surprise,
it's actually quite beautiful.

```
<section id="semantic-output">
  <h2>Generic blocks and attributes</h2>
  <p>One of the coolest features...</p>
</section>
```

## Generic blocks and attributes

One of the coolest features is generic blocks,
which are called "divs" and "spans" in the spec[^1],
as well as a method to add attributes to any element.

[^1]: well, ["syntax description"](https://htmlpreview.github.io/?https://github.com/jgm/djot/blob/master/doc/syntax.html)

```
::: class-name
A paragraph inside the div
:::
```

Markdown would require HTML to do anything like this.

In addition to divs and spans,
attributes can be attached to *anything* using curly braces.

```
Warning{.big .red data-type="warning"}
```

The above markup will create a span with the "big red" class
and the `data-type="warning"` attribute.

Again, markdown would require HTML to do anything of the sort.

Now, when I say attributes can be attached to anything,
I mean *anything*.

````
{#custom-section-id}
## My heading

{.important}
An important paragraph,
likely styled with big text.

*some bold text that's also red*{.red}

{lang='javascript'}
```
var answer = '42';
```
````

## Comments

Comments are solved in a very clever way.

Attributes can have comments inside them:

```
{.big .red % comment: red for warning % .important}
```

The text between the percent signs is a comment.

To have an independent comment,
simply remove any other content from the attribute block.

```
{% This is a comment %}
```

## Raw blocks

Another useful construct is raw blocks,
which allow you to pass something into the final output as is,
depending on the export format you select,
without any escaping or processing.

If I were exporting to HTML,
and I wanted to have some specific HTML markup in the output,
I could do the following:

````
``` =html
<my-html-tag-soup />
```
````

The inline version of the same is:

```
Some `<my-tag-soup />`{=html} inline
```

## open close quotes

openers, closers, and quotes