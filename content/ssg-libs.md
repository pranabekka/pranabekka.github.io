+++
title = "SSGs should be libraries"
date = 2024-06-24 15:25:30
updated = 2024-06-24 15:25:30
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
