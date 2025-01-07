+++
title = "Bagatto notes"
## remember to change date on publishing
date = 2025-01-01 01:24:28 # draft date
updated = 2025-01-01 01:24:28
+++

An interesting new SSG using scripting.

Bagatto is implemented using
the Janet programming language,
which is a descendant of the Lisp family.
I've provided some Python syntax as well.

TODO: BAGATTO LINK
TODO: JANET LINK

It provides a bunch of helper functions in a library,
such as listing files,
and reading metadata and markdown.
You hook it all up with a configuration using a dictionary/map,
and then your site is generated from that configuration.

First, you specify the data you want to go into your site,
and ways to convert it into meaningful data.

TODO: data definition snippet
TODO: if this was python

Then, you specify the layout of your final site,
and what data goes where in that layout.

TODO: site definition snippet
TODO: if this was python
