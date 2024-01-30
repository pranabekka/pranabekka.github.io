+++
title = "Bean markup design document"
## remember to change date on publishing
date = 2024-01-30 16:30:02 # draft date
updated = 2024-01-30 16:30:02
+++

Bean is an extensible markup language,
with constructs for delimiting and marking up text,
as well as syntax sugar for commonly used markup,
such as emphasis, lists, and tables.

- prior art
- rationale
- element attributes
- nesting rules
- blocks \
  newline and backtick delimited
- inline delimiters \
  backticks, asterisks \
  allow inline tag before delimiters as well?
  could be quite convenient for some use cases
- headings \
  provisionally use 3 hashes for level 1 header \
  level 4 and below can use generic block syntax
- metadata
- footnotes
- custom elements and extension \
  implementation dependent to start with \
  although i'd prefer a scheme or newer/custom lisp \
  use something like jsx components
- disable elements
- namespaces/modules/imports/something

## Prior art

Bean borrows from the tradition of Markdown,
yet is more obviously influenced by
djot, AsciiDoc, and MDX.

[Markdown](https://www.markdownguide.org/getting-started/)

[Djot](https://djot.net)

[AsciiDoc](https://asciidoc.org/)

[MDX](https://mdxjs.com/)
