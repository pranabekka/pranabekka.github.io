+++
title = "Test/reference page"
## remember to change date on publishing
date = 2024-08-13 13:39:53 # draft date
updated = 2024-08-13 13:39:53
+++

A reference, test, and explanation for styling,
as well as a rough guide for writing posts.

Inspired by the test post by Chevy Ray.

[Test Post (by Chevy Ray)](https://chevyray.dev/blog/test-post)

To know more about the design, see the About page.

[About (site design)](@/about.md#about-the-site)

## Summary/<wbr/>description

The first paragraph of a post is taken as the summary,
and displayed in the index.

It used to be arbitrarily long,
but lately I've been trying for a single sentence,
so that more items can be shown in a single space.

I want to show the description/summary
because the title doesn't always indicate the contents,
plus the description includes keywords to help search.

This does impose some limitations on the opening,
but I don't really mind.
I can change that if it ever bothers me.

## Block links

Prefer links in their own lines/blocks,
because inline links can end up right next to each other,
which makes it easy to tap the wrong link.

Inline links also draw attention away from the content.

## When text doesn't wrap

<!--
  TODO: put markup code and sample html at top.
  helps get a quick look at it all.
  explain details and decisions below that.
-->

Issues where text doesn't wrap by itself.

{% sampleBlock() %}
<div style="overflow: hidden; padding: .5rem;">
something_with_underscores_prevents_wrapping.
</div>
{% end %}

Underscores and some other punctuation
prevents text from automatically wrapping.
The above example has the following text:

```
something_with_underscores_prevents_wrapping.
```

I've put the example in a special div
that hides the overflowing text,
otherwise it expands the page to the right,
with only the aberrant text peeking into that space.

Use a narrower viewport/window to test it.
`Ctrl + Shift + M` might work.

To prevent these issues,
put it in a code block, if it's inline code,
or include HTML entities or tags
such as the soft-hyphen (`&shy;`),
word break opportunity (`<wbr/>`),
or zero-width space (`&8023;`).

`&shy;`, `<wbr/>` and `&8023;`
only wrap if there's no space available,
though the soft-hyphen entity includes a hyphen
when it breaks a word.

Use the soft-hyphen entity for long words,
and the other options for things like URL text.
The wbr tag is preffered over the zero-width space.

Example:

```
Super&shy;cali&shy;fragi&shy;listic&shy;expi&shy;ali&shy;docious

some_<wbr/>oddly_<wbr/>punctuated_<wbr/>text
```

{% sampleBlock() %}
Super&shy;cali&shy;fragi&shy;listic&shy;expi&shy;ali&shy;docious

some_<wbr/>oddly_<wbr/>punctuated_<wbr/>text
{% end %}

Each of the `&shy;` and `<wbr/>` instances
represents an *opportunity* for a word break.

In some browsers, it doesn't break after a slash (`/`),
which might be used in inline code for paths,
or for alternative words, like this-word/<wbr/>that-word.

## Punctuation

Zola's markdown parser automatically converts some punctuation.

"Double quoted text" from `"Double quoted text"`.
The source text is actually using double ticks, not quotes.

Same for single quotes: 'Single quotes'.

And apostrophes: "Pranab's site" from `Pranab's site`.

Em-dash: --- from `---`.

En-dash: -- from `--`.

That's it, I think.

## Section headings

Section headings have numbers, to help track where you are,
and to easily associate it with the list of contents.

Headings can also be linked to using URL fragments.
I try to keep them stable, similar to URLs.
If I delete a section,
I should include a div at the end of the post,
with the same ID as the section,
explaining why it was deleted,
and where the user might want to go.

Currently, I rely on using section links from the list of contents,
although that isn't as obvious,
and I want to include a link right below the section heading.
Icons aren't very obvious,
and I'm not sure turning the whole title into a link
will make it more obvious.
I was thinking "Link to section" is clear.

### Sub-section headings

Heading numbers also help indicate nesting,
by showing the number of the parent heading
before the number of the current heading.

#### Sub-sub-section headings

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

## `<code>` in headings

The headings themselves render inline code properly,
but the list of contents doesn't show it.
I need to fix that, if it's possible.

## Inline code

A paragraph of text with `inline code`.

Avoid long spans of inline code.
It doesn't work well on narrower viewports,
and doesn't include syntax highlighting.
Use a code block instead.

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

- simple syntax highlighting

  i don't want the multi-coloured stuff
  because it won't fit in with the rest of the site,
  and will draw attention to itself.

```
a pre-formatted code block that's attempting to exceed the width of the container
```

I'd also like to change the border,
such that the left and right sides
get cut off with overflow text, if there's any.
This will make the reader absolutely certain
that there's more to see.

A title for a block would be nice.
Mainly to include the file name.
Or even just the language.

### Syntax highlighting

My main languages for now will be
HTML, CSS, Javascript, Lisp/Scheme,
and config formats like YAML, TOML, and JSON.

```html
<body>
  <h1>A table!</h1>
  <div class="tablewrapper">
    <table>
      <!-- table markup -->
    </table>
  </div>
</body>
```

```css
/* setting some base variables */
:root {
  --font-family: sans-serif;
  --black-white-100: #ffffff;
  --black-white-60: #b3b3b3;
  --black-white-30: #323232;
  --black-white-0: #000000;
}
```

```javascript
let my = { ting: "hello world" };

// it do a thingy with x
/* what a surprise! */
function doThingy(x) {
  console.log(`I did a thingy with ${x}!`);
}

doThingy(my);
```

```lisp
; it do a thingy with x
(defvar thingy-doer
  (fn (x)
    (format t "I did a thingy with ~a" x)))
```

```toml
# a comment
[key]
inner_key = "val"

[[key2]]
index = 1

[[key2]]
index = 2
```

```yaml
# a comment
key:
  inner_key: val
key2:
  - index: 1
  - index: 2
```

```json
{
  "key": "val",
  "key2": [
    { "index": 1 },
    { "index": 2 }
  ]
}
```

### No background

When you scroll, the code block with a grey background
has some sort of "jiggle" effect,
where the background seems to move independently
of the foreground.
It's more visible if you rapidly scroll up and down.
I've tested it on at least 3 different phones.
Can't observe it on my laptop.

<pre style="background-color: #1a1a1a; border: none;">
<code>a pre-formatted code block</code>
</pre>

## Lists

Should support paragraphs, images, code blocks, and nested lists.

- unordered list item 1
  - unordered list item one point one 
- unordered list item 2
- unordered list item 3

1. ordered list item one
   1. ordered list item one point one
1. ordered list item two
1. ordered list item three

## Blockquote

> Ceci une blockquote
>
> Il n'est pas terriblé
>
> (What's wrong with me)
> 
> <cite>Pranab</cite>

The "Pranab" is in a `<cite>` tag.
Should add some further styling to that.
Maybe align it to right edge?
Can I rely on that having enough space?
One solution is a dash or em-dash.
"--- Pranab"

## Cards

Used in index pages, as well as resume items.

<!-- TODO: include cards as html. is there a shortcode? -->

## Portfolio grid

Grid of images, designed for square images.
Doesn't do any kind of refit, afaik;
just requires me to edit into square.

<!-- TODO: include grid as html. is there a shortcode? -->

## Pips/stars

Pips are like stars for 'n' out of 5 ratings,
except they use pill shapes.

Used in the Resumé.

<div class="pipgrid">
  {{ pips(title="Figma, Adobe XD, Penpot", n=5) }}
  {{ pips(title="Illustrator, Inkscape", n=5) }}
  {{ pips(title="Wireframing, Sketching", n=4) }}
  {{ pips(title="Photoshop, GIMP", n=3) }}
  {{ pips(title="Premiere Pro", n=3) }}
  {{ pips(title="Blender", n=3) }}
  {{ pips(title="HTML, CSS", n=3) }}
  {{ pips(title="Javascript", n=1) }}
</div>

## Thematic break

Three dashes or asterisks on a line by themselves
create a thematic break (`<hr>`).

Asterisks are preferred.

***
