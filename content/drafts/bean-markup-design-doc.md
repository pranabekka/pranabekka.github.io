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
  newline and backtick delimited \
  default backticks to containers --- anonymous divs/spans
- reserved tag attribute characters \
  . for classname \
  \# for id \
  this will even turn paragraphs into generic divs/spans \
  if an element isn't specified like `[.class]` \
  something for a key attribute? \
  that automatically selects valid tag? \
  `[:lang thing]` might make it code? \
  although that might mean human language \
  so forget about that
- inline delimiters \
  backticks, asterisks \
  allow inline tag before delimiters as well?
  could be quite convenient for some use cases
- headings \
  provisionally use 3 hashes for level 1 header \
  level 4 and below can use generic block syntax
- metadata
- footnotes
- custom elements/components and extension \
  implementation dependent to start with \
  although i'd prefer a scheme or newer/custom lisp \
  use something like jsx components
- disable elements with config \
  implementation dependent
- namespaces/modules/imports/something

## Prior art

Bean borrows from the tradition of Markdown,
yet is more obviously influenced by
djot, AsciiDoc, and MDX.

[Markdown](https://www.markdownguide.org/getting-started/)

[Djot](https://djot.net)

[AsciiDoc](https://asciidoc.org/)

[MDX](https://mdxjs.com/)

Markdown suffers from being
an ad-hoc specification with many issues.
The author of CommonMark and djot
has already explained these issues
in 'Beyond Markdown'.

While I was initially enamoured by AsciiDoc,
I eventually realised that it has a lot of complex markup,
and even more complex rules of its own,
which makes it hard to implement and use.
However, it does have some clever syntax decisions.

Djot is the format I find the most appealing,
though it has made some choices
that I believe could be done better.

The biggest power of MDX is its components system,
which has a slightly different equivalent in Bean.
