+++
title = "A better document editor"
## remember to change date on publishing
date = 2024-09-04 13:15:22 # draft date
updated = 2024-09-04 13:15:22
+++

Document editors like Word tend to encourage bad formatting,
yet all "office" apps follow that design.

A better document editor should have a simpler interface
and naturally guide the author to write correct documents.

It's like cars before they had bumpers ---
they had everything to get you from point A to B,
but it could be quite painful.
A bad document editor just boils the frog slower.

I'm sure everyone's felt the pain of the current generation,
so I'd like to spend this post outlining an alternative,
the first step of which is
editing the _structure_ of the document
and making the style completely separate.

<!--
I like the more flowery writing,
though straightforward is a bit easier.
I think I'm aiming for a general audience,
and I could pull in more readers with this writing.

Don't go overboard.
I don't have any established readership.
-->

## Structural writing/editing

Instead of opening a menu and setting text size to "60",
and then making it bold,
you say "this is a title",
and the editor will handle it for you.
This is what computers are good for.

The author defines the structure of the document.
They're writing content instead of selecting style.

You can now get a list of contents
and trivially change how it looks.
You can organise sections by moving them up and down.
You can tell the editor to number all the titles.

Now writing and editing is much simpler.
What more do you need from a document editor?

The existing generation of editors have this,
yet they obscure it with unecessary buttons and menus.

Have you ever had to open a PDF on your phone?
Imagine exporting your document to a web page instead [^web].
You no longer have to zoom in and out with one hand
while the other holds it up.

[^web]: Web pages can be shared as files
and easily opened in your browser.
They don't need to be put on a www address.

<!--
emphasis and strong emphasis
-->

## A simpler interface

Now that you're not selecting "text size 60",
the interface is much simpler.
You simply select one of
paragraph, title, heading, and so on.

Fewer buttons, menus, and panels.
Fewer distractions.
More writing.

## Structure

<!--
A document is made out of several parts:

- Paragraphs,
- a title,
- headings,
- author(s),
- other metadata, like dates and topic tags,
- lists,
- images,
- videos (for screens [^video]),
- tables,
- and more.

[^video]: You could print "video" by extracting important frames.
-->

blocks and spans

A document is made out of "components",
which are identified by their type,
and contain contents like text, images, and other components.
These contents are subject to certain rules.

For example, a heading is a component,
and it cannot contain a paragraph or a list within it.
However, a heading _can_ contain an emoji component.

A table is another component,
and it _requires_ table cells within it.

## Quality of life

structural suggestions/auto-complete

kakoune style find and replace

structural selection (kakoune style)
with helix style visual mode?
not so different from kakoune, really
just turns shift into a toggle

linters

keyboard driven
modal editing?

auto metadata,
with auto date and update
can configure to also include author

delete table with last cell
which is what happens if you press delete
inside last empty cell
if there was text and you were holding delete
it deletes till cell is empty
but doesn't delete cell unless release and press

## Styling

visual editor, complex selectors, multiple includes

multiple includes: layer multiple stylesheets,
so that you can put in one or two custom styles of your own

would css benefit from modules?
how would programming lang modules work in css?
oh, you'd use exports and imports
so you can import everything, or just specific things
this would benefit from grouping styles together
using a label for the group
could also be a label for a single style
though i'm not sure how that helps?

other differences from css:
- classes are replaced with nodes/tags
- shouldn't expose ids?
  maybe you could id things with a custom component/variable
  and select the parent of that component/variable?
- simpler variable syntax?
- wispy/s-expression syntax?
  which means benefits from block and node editors

how would you visualise complex selectors?
a visual programming thing?
or when you select something in the preview,
it shows a list of valid ways to select it,
starting with the component name

would you ever want to style individual words?
the spaces between them?
perhaps a specific component could split them up?
attach spans for each word and space?

## Blocks and spans

## Base components

## Plugins, unknown components

## Templates

## Package management

## File format: database

benefits over a zip file of text files, images, etc.:
- update in-place
- atomic updates to combat corruption

For devs: sqlite or other in-memory dbs.

## Compat

if you've heard of md, mdx, tex,
you might like this.
if you use them, you might not.

i do have some compat ideas, however,
which might let you collab with doc editor users.

dunno bout tex, but take a look at sile sil syntax

\node[attrs]{content}

while markdown's syntax isn't as uniform,
it has limited elements, past which you use HTML/XML:

<node attrs>content</node>

i think something like djot is better than both.
to start with, it's less verbose than markdown,
and provides more convenience than latex:

{attrs}
content

bean, which i based on djot, has a little more than djot.
it's essentially equal to LaTeX, XML, etc.

[node attrs]
content

## Research questions

### multi-lingual support

i'm not quite sure how to do that

the fluent system/api is likely an important component

#### interface

perhaps the base components have multi-lingual support
and plugin authors use the same api to support multiple.
this means nodes themselves have names in multiple languages
in addition to being able to author content in multiple languages

the ui should also adapt to the language.
some languages are right to left,
and others are vertical first.

#### authoring

document authors might be concerned with matching translations.
this might mean components that support multiple languages.

ah, yes: a language attribute for all nodes.

could have export templates that only export
components that match one language.
could also pair with editor views that only show one language.
"filter by language:"
dropdowns and tabs are a decent ui element
for switching language view filters.

another option might be using cross-references instead:
have a single source document
and translations cross-reference it for various sections.
a cross reference is a link the editor can follow
to show previews and links to the source.

### visually separate ui from doc

especially if themes match.
easy if ui stays in same place,
but you'll have some markers,
and it's encouraged to show ui at the cursor,
where the user's focus is.

## Presentation

If the author requires more control
over layout and visuals,
they should use a design application.

It would offer to reference content from their document
and automatically include it for them.
This would include updating
when the author edits the document.

They could specify default styles and specific overrides.

## Inspiration

Markdown, LaTeX, MDX, Typora

macromania by aljoscha meyer
apparently has safe stateful macros that can be composed,
and the code is the documentation,
so i have to read through it carefully to understand.
it uses JSX, though, which is like XML,
and should thus fit any syntax.

see github.com/worm-blossom/macromania

> the design ensures meaningful error reporting,
> principled interactions between stateful macros,
> and static typing for the input expressions.
