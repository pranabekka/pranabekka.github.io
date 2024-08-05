+++
title = "No, Soup-oh!"
## remember to change date on publishing
date = 2024-06-26 13:38:51 # draft date
updated = 2024-06-26 13:38:51
+++

I quite like Soupault (SSG),
but there's some things I'm not too fond of.

[Soupault](https://soupault.app)

## "Widgets" terminology is confusing

I think I only got it after my last read,
which is not even one of my two or three deep dives
into the Soupault website and documentation.

Widgets are basically a transformer.
They take in HTML, transform it, and output HTML.
I think most of the time, at least.

I admit I don't know what to name it,
but maybe it could be explained up front.

Ideas: 'thingy-doer', 'transformer', 'pipe(line)'.

## Confusing widget configuration scheme

Part of the widget confusion is their configuration scheme.

Take the following example:

```
[widgets.add-toc]
  widget = "toc"
  selector = "#generated-toc"
```

Is it an "add-toc" widget or a "toc" widget?

The name (`add-toc`) is the main key for the widget,
and then there's a `widget` key inside that,
which is essentially the *type* of the widget.
The 'name', however, is essentially a comment,
for the user to track what it's doing.
It's only other significance might be for error logging.

## Odd widgets list syntax/layout

The list of widgets could've used
the TOML syntax for arrays of tables.

It's not obvious, but it's there.

```
[[widgets]]
  name = "add table of contents"
  type = "toc"
  selector = "#generated-toc"

[[widgets]]
  name = "scream h1"
  type = "insert_html"
  selector = "h1"
  html = "!!!!!"
```

This will add two elements to the `widgets` list,
with the values set as described.

## TOML is awkward

With a large enough configuration,
you'll find yourself typing the same thing repeatedly.
Alternatives include a stricter subset of YAML,
a version of JSON with comments,
or the KDL document language!

[KDL document language](https://kdl.dev)

TOML:

```
[widgets.add-toc]
  widget = "toc"
  selector = "#generated-toc"

[widgets.scream-h1]
  widget = "insert_html"
  selector = "h1"
  html = "!!!!!"
```

KDL:

```
widgets {
  add-toc { widget "toc" ; selector "generated-toc" }
  scream-h1 {
    widget "insert_html"
    selector "h1"
    html "!!!!!"
  }
}
```

YAML, JSON, and KDL support simple nesting,
where you don't have to repeat the parent key.

KDL is especially uniform and simple, compared to YAML or TOML,
and the syntax is less verbose than JSON,
with pretty nice commenting.

## Confusing document&shy;ation

It took me multiple visits to the site,
and a few deep dives to properly understand everything.

Part of it is that Soupault is so different,
that it's so capable and flexible,
and that it's maintained by a single person.

I think the guides could add things more gradually.
For example, the debug and log options
in the blog quickstart
could be moved lower down in the page.

## Widgets are function calls

But with an awkward syntax.
Maybe the configuration could've been also been Lua?

This isn't really a big deal,
but the configuration could've just been in Lua.
Maybe basic configuration could go into a table?
This would also allow you to
break apart your config into modules.

Consider the following:

```
[widgets.scream-h1]
  widget = "insert_html"
  selector = "h1"
  html = "!!!!!"
```

`insert_html` is basically a function name,
with `selector` and `html` as arguments.

```
# scream h1
insert_html(selector = "h1", html = "!!!!!")
```

The TOML is like some form of contorted LISP.
I wouldn't mind s-expressions for config ;)
