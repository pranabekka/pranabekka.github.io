+++
title = "Two random foughts"
date = 2024-05-21 18:01:10
updated = 2024-05-21 18:01:10
+++

1\) Hugo (SSG) should've been a set of libraries
that the user imported and hooked up.
2\) Clean URLs like `site.com/hello/`
should not be used.

[Hugo](https://gohugo.io)

## SSG libraries for Go

The basic proposal is that an SSG in Go
should provide a simple core API [^1]
and a set of libraries to customise and build your site,
similar to how Bevy and its ecosystem works for games.

[^1]: Or two or three,
starting with a dependency graph, I think
--- I wouldn't really know.

[Go](https://go.dev)

[Bevy](https://bevyengine.org)

You would import the libraries you want,
maybe implement some specific functionality,
and build your site from that.

Given that one of Go's advantages
is a fast compile/feedback cycle,
this approach seems viable,
and perhaps even desired.

It enables better customisation
than trying to program in a templating language,
and you can use the language that you already know.
For those unfamiliar with the language,
it could make a good introduction as well.

## Clean URLs: bad!

The reward for these is obvious:
clean URLs that are just words separated by slashes.
However, the are several (somewhat conceptual) costs.

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
