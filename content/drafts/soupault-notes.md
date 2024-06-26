+++
title = "A quick Soupault introduction"
## remember to change date on publishing
date = 2024-06-26 12:52:04 # draft date
updated = 2024-06-26 12:52:04
+++

Soupault is a static site generator (SSG),
that works by manipulating HTML,
which makes it more capable and flexible
than any other SSG I know.

[Soupault](https://soupault.app)

The fact that it works with HTML
means that it can trivially support
any markup language that can be converted to HTML.

## Setup

We set it up using a `soupault.toml` file.

```
[settings]

  # Read files from here
  site_dir = "site"
  
  # Write files here
  build_dir = "build"
```

## Read your markup format of choice

By default, Soupault just copies files over [^1].

We need to tell it which pages to treat specially,
for which we'll choose markdown.

[^1]: This makes it useful for processing HTML,
such the output from your previous SSG,
or some static HTML files you want to
improve incrementally.

```
[settings]

  # Previous config
  site_dir = "site"
  build_dir = "build"
  
  # Don't just copy "md" files
  page_file_extensions = [ "md" ]

# Pre-process any "page_file"
[preprocessors]

  # Run "md" files through a markdown to HTML converter
  md = "cmark"
```

See how Soupault doesn't depend on Markdown,
or even a specific implementation of Markdown?
You could easily use your preferred Markdown format,
or an entirely different markup format like djot instead.

## Add in arbitrary HTML

Soupault's power feature is the ability to manipulate HTML.

For this, it uses an extensive set of *widgets*,
though it provides a scripting interface as well.

Use an `insert_html` widget:

```
# add-author is a name we choose
# to keep track of our widgets
[widgets.add-author]

  # Widget type
  widget = "insert_html"
  
  html = "<p>by Pranab</p>"
  
  selector = "h1"
  
  action = "insert_after"
```

This will insert a paragraph with the text "by Pranab" after the h1.

## More

For a more complete guide for setting up a blog in Soupault,
including templates, a table of contents, and more,
have a look at their guide.

[Soupault blog quickstart](https://soupault.app/tips-and-tricks/quickstart)
