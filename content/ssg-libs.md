+++
title = "SSGs should be libraries"
date = 2024-06-24 15:25:30
updated = 2024-08-04 03:39:44
+++

Hugo (SSG) should've been a set of libraries
that the user imported and hooked up.

[Hugo](https://gohugo.io)

The basic proposal is that an SSG in Go
should provide a simple core API [^1]
and a set of libraries to customise and build your site,
similar to how Bevy and its ecosystem works for games.

[^1]: Or two or three,
starting with a dependency graph, I think,
but I wouldn't really know.

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

Soupault is an interesting reference here:
first, you define your page files and how to convert them to HTML,
then you define things to do with that HTML.
Another cool thing it does is that there's no content model.
You have to define what metadata to extract and how,
then you decide what to do with it.

[Soupault](https://soupault.app)

Zine is another interesting reference point.
It's a work-in-progress SSG
that uses the Zig build system to build your site,
and allows you to swap in components as you need,
though I haven't looked into it too much.
It also includes structural templating
that's a superset of HTML,
instead of the string templating you find
in non-Javascript SSGs.

[Zine](https://zine-ssg.io)
