+++
title = "Test/reference page"
## remember to change date on publishing
date = 2024-08-13 13:39:53 # draft date
updated = 2024-08-13 13:39:53
+++

A reference for how to author a post,
as well as a test and explanation for styling.

## Heading level 1

The `<h2>` element is a level 1 *heading*.
The `<h1>` element is for the document title.

Headings have numbers, to help track where you are,
and to easily associate it with the list of contents.

### Heading level 2

Heading numbers also help indicate nesting,
by showing the number of the parent heading.

#### Heading level 3

While accounting for the potential need for
further heading levels,
I don't want to rely on it.
This doesn't have any numbering,
nor does it show up in the table of contents.

A list might be a better option at this stage,
although this can section off content as well.

Further levels use default sizes,
which are smaller than body text.
(Seems like this is also default size)

##### Heading level 4

For reference.
 
###### Heading level 5

For reference.

## Code blocks

Features:

- border to indicate start and end

  relevant for long code blocks

- scroll instead of wrap

  wrapping distorts indentation
  and reduces readability

- padding on right side as well

- no margin on narrower viewports

  keeps as much space as possible to display content

```
a pre-formatted code block that's attempting to exceed the width of the container
```

I'd also like to change the border,
such that the left and right sides
get cut off with overflow text, if there's any.
This will make the reader absolutely certain
that there's more to see.

### No background

When you scroll, the code block with a grey background
has some sort of "jiggle" effect,
which is more visible if you rapidly scroll up and down.
I've tested it on at least 3 different phones.

<pre style="background-color: #1a1a1a">
<code>a pre-formatted code block</code>
</pre>

## Lists

Should support paragraphs, images, code blocks, and nested lists.

## Pips/stars

Used in the Resumé.

<div class="pipgrid">
  {{ pips(title="Figma, Adobe XD, Penpot"n=5) }}
  {{ pips(title="Illustrator, Inkscape"n=5) }}
  {{ pips(title="Wireframing, Sketching"n=4) }}
  {{ pips(title="Photoshop, GIMP"n=3) }}
  {{ pips(title="Premiere Pro"n=3) }}
  {{ pips(title="Blender"n=3) }}
  {{ pips(title="HTML, CSS"n=3) }}
  {{ pips(title="Javascript"n=1) }}
</div>
