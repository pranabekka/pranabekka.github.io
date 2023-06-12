+++
title = "More Ideas on CL SSG"
date = 2023-05-31 21:50:57
updated = 2023-05-31 21:50:57
+++

So Coleslaw didn't really work out (more below).
Instead, I'm imagining a static site generator based on
a build system,
a typst-inspired language,
and a simple server.

[Here's](@/cl-ssg.md)
my initial post on a Common Lisp Static Site Generator.

Regarding Coleslaw,
I had some bugs that I didn't feel like going through,
plus it loaded a lot of modules I wasn't interested in
(but not the incrememental build one?),
and I didn't feel like learning all about it.
Even the preview didn't work properly.
So I just let it be.
Zola gives me most of what I need anyway.

Overlord seems to be a good build system.
It should get me incrememental and parallel builds.

For the authoring and templating,
I want to use a typst-like language.
Templates will simply be functions that wrap
the rest of the content.
I wonder how I'd extract metadata.
Perhaps a metadata function?

Hunchentoot seems to be the most popular server,
and it should be more than good enough.
I simply need to serve pages locally,
and it should be well documented,
with enough guides and references.

The first step is to start messing with cl-typst.
Should be as simply as evaluating anything starting with `,(`
and simply passing along anything else as regular text.
Then figure out a system for sharing state or environment?
Or should I strive to keep it functional?
Oh, well. Get the parser-evaluator figured out first.
