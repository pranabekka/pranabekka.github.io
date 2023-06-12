+++
title = "djot"
date = 2023-04-23 15:35:14
updated = 2023-04-23 15:35:14
+++

I was reading an article by [matklad][mklad]
and I realised the formatting looked a lot like
the default Asciidoctor output,
so I went hunting around for how he built his site
and found an [article on markup formats][mklad-markup].
Turns out [djot][djot] is a really nice format,
which includes some interesting ideas
from asciidoc as well as markdown.

Sadly, the tooling around it is quite limited.
Current implementations include one in Javascript,
another in Lua, and a third in Rust.
And the syntax reference link at [djot.net][djot] seems broken.

The Javascript implementation is the current focus,
while the Lua one is the first (that may be phased out),
and the Rust one is unofficial,
with a single link in the [djot.net][djot] page
and no other mention.

I think all three allow for creating an ast,
so it should be easy to work them in with other tools,
but it's still a fair bit of work
(for me [^1])
to set up a static site or generate other documents from it.

Maybe it's a good reason to really get into Javascript
(Rust is a bit overkill),
although the hexo static site generator has an extension for it,
and other Javascript ones like 11ty
should also be able to easily plug it in.

Alternatively, just use the cli given by djot.js
to output the ast and manipulate it in any language,
then feed it back into djot.js or pandoc.
Even the html output can act as an ast of sorts
if you're already familiar with it.
Maybe I'll try that,
but it's still a lot of work (as a non-programmer) to replicate
everything that static site generators and other tools
can do for you.

[mklad]: https://matklad.github.io
[mklad-markup]: https://matklad.github.io/2022/10/28/elements-of-a-great-markup-language.html
[djot]: https://djot.net
