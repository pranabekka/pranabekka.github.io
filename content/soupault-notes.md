+++
title = "Notes on Soupault"
date = 2024-11-20 19:41:56
updated = 2024-11-20 19:46:13
+++

An SSG (static site generator) that understands HTML.

[Soupault](https://soupault.app)

This is what "An introduction to Soupault" was going to be.
For some reason I turned that into a full beginner's guide.
Maybe because these notes might only make sense in context.
Anyway, if you have the terminal open
and want to start making a website,
that's what you're looking for.

[An introduction to Soupault](@/soupault-intro.md)

If you just want a brief introduction,
this is what you're looking for.

## Understand&shy;ing HTML

Here's what I mean when I say Soupault understands HTML:
it uses CSS selectors to extract and add information.

This means that it turns the HTML into a series of nodes
with attributes and children ---
it's not just arbitrary text being put together.

The way Soupault works is by
configuring everything in a TOML file.
This is where you specify "widgets",
which are steps in a pipeline that work on a page.
Widgets that interact with the HTML use CSS selectors.

``` toml
[widgets.add-author]
	widget = "insert_html"
	html = "<p>by Pranab</p>"
	selector = "h1"
	action = "insert_after"
```

This is a widget that adds "by Pranab"
under the title of every page in the site.
Here's how it works:

- `add-author` is like a comment,
  to help you keep track of how your site is made.
  Soupault also uses it for logging and debugging.

- `widget` specifies the type of the widget.
  `insert_html` is a built-in widget type,
  which inserts HTML into the page.

- `html` is the HTML you want `insert_html` to insert.
  I'm inserting a paragraph (`<p>`) with the text "by Pranab".

- `selector` is a CSS selector for the element
  where you want to insert the HTML.
  I chose to add the HTML near the `h1` element.

- `action` provides finer control over where
  you want the HTML to be inserted.
  The CSS `selector` can only select an element,
  while the action specifies if it must be inserted
  after the element, inside it, or instead of it.

## Widget = function

It helps to think of a widget as a function call.

The `widget` key specifies the name of the function,
and the rest of the keys are arguments to it.

The widget title is simply a description of
what the widget does:

```toml
[widget.<description>]
	widget = "<type>"
	<arg1> = "<val1>"
	<arg2> = "<val2>"
	...
```

This, specifically, was the revelation
that made Soupault finally click for me,
and what prompted me to write the first "introduction",
before it turned into a full beginner's guide.

## HTML and markup languages

If Soupault works with HTML,
what about all the Markdown?

Well, Soupault first converts your markup to HTML.

You tell it which file extensions should be converted to HTML,
and which shell command to use for conversion.

For example, Cmark is a widely available tool
that converts Markdown to HTML.

Here's how you'd use it:

```toml
[settings]
	page_file_extensions = [ "md" ]

[preprocessors]
	md = "cmark --unsafe"
```

As long as you can convert it to HTML,
you can use any markup language you want.

If you really wanted,
you could author your pages in JSON,
and write a custom CLI tool to convert it to HTML.
Just tell Soupault to use your program.

```toml
[settings]
	page_file_extensions = [ "md", "json" ]

[preprocessors]
	md = "cmark --unsafe"
	json = "my-cli"
```

If all this didn't make sense,
maybe the full introduction might be for you:

[An introduction to Soupault](@/soupault-intro.md)
