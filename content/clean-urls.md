+++
title = "Clean URLs: bad!"
date = 2024-06-24 15:30:08
updated = 2024-06-24 15:30:08
+++

"Clean URLs" like `site.com/hello/` should not be used.

NOTE: This is a bit of a shower thought,
and the title is a shower thought title ---
I don't actually care all that much,
though the reasoning makes sense to me.

The reward for these is obvious:
clean URLs that are just words separated by slashes.
However, there are several (somewhat conceptual) costs.

- Abuse of the index page.

  `my-page/index.html` is not indexing anything.
  It's simply the contents you want to display at `my-page/`.

- `index.html` clutter.

  The file tree is littered with `index.html` pages
  --- files that have the same name
  and that are not really related.
  Not to mention folders with only one item.

- Obscure page names.

  A page on a specific topic is called `index.html`
  instead of `<topic>.html`.
  It does not reflect the contents of the file.

It might make sense for dynamic server side
and/or single page applications (with url rewriting),
but not so much for static files.

The average user will likely not notice
whether the URL ends with `.html` or not,
and someone who notices will likely know,
and if they don't know,
they might learn something new.
