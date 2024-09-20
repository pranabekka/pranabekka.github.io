+++
title = "Metadata in Markdown"
date = 2024-06-24 14:41:56 # draft date
updated = 2024-09-20 18:01:53
+++

Alternatives to putting the markdown title in TOML/YAML.

Because frontmatter breaks Markdown syntax
and puts the title at the same importance as
other metadata like the date and thumbnail.

The title is a primary piece of data for the document,
and it is not on the same level of importance as the date.

With frontmatter, your Markdown (not metadata) document
starts with a level 2 heading and no level 1 heading,
or it has multiple level 1 headings (titles).

Instead, put the document heading at the top
using Markdown syntax,
and add metadata like the date below that.

## Solution 1: metadata tag

Since Markdown requires extension with HTML,
and is primarily an HTML generation tool,
we could use a 'metadata' tag.

```
# My document title

<metadata
  date="2024-06-24"
  update="2024-06-27"
/>

post content ...
```

'metadata' could also be shortened to 'meta'
for the convenience of authors,
but there should ideally be a simple template
and a `new` command to create a skeleton
and fill in the basic information.

You can also prefix the tag with a 'namespace' of sorts,
to avoid potential collisions.
Hugo would call it `hugo-metadata`,
while Zola might call it `zola-metadata`.

```
<my-metadata
  date="2024-06-24"
  update="2024-06-27"
/>
```

It should be easy to use HTML if the tool already uses it,
although XML/HTML can be verbose for some people.

## Solution 2: metadata "code" block

Another solution is to author metadata in YAML, TOML,
or whatever format is already used,
by using a code block with the 'metadata' language.

````
```metadata
date: 2024-06-24
update: 2024-06-27
```
````

In addition to the previous 'meta' suggestion,
you could also include the metadata format
if multiple formats are available,
with a default format if none is included.

````
```metadata/toml
date = 2024-06-24
update = 2024-06-24
```
````

Specifiers like `metadata/toml` are also used in
HTTP responses as well as HTML `link` elements.

Most markup formats include code blocks,
and setting the language should be easy.
Plus people tend to like YAML/TOML over XML/HTML.
