+++
title = "A better Soupault introduction"
## remember to change date on publishing
date = 2024-06-26 12:52:04 # draft date
updated = 2024-06-26 12:52:04
+++

Soupault is an incredible static site generator (SSG),
but the documentation can be a confusing.

[Soupault](https://soupault.app)

**NOTE:** This is written with Soupault 4.x in mind,
and specifically tested in 4.6.0.

<!-- TODO: test with more versions -->

## Expected knowledge

- the CLI
- file paths
- TOML and/or other config files
- HTML
- CSS selectors
- jinja style templates

## Why this is better

The official blog quickstart introduction is a bit front-loaded,
instead of gradually introducing concepts,
and the reference manual has a decent introduction
in the "Overview" section,
but it comes after extensive build and install instructions,
and is followed by another hefty config example.

This guide is meant to ramp up slowly,
starting with the absolute basics,
and introducing things as they're required.

[Blog quickstart](https://soupault.app/tips-and-tricks/quickstart/)

[Overview](https://soupault.app/reference-manual/#overview)

## Overview

Soupault works by breaking down a template
into an HTML element tree,
then it goes through the `site` folder,
turn each page into HTML,
and if it doesn't have an `<html>` element,
it insert it into the template.
The results are then inserted into the `build` folder.

All of these things can be changed.

If you don't want it to do templates,
then set `generator_mode` to `false`.

If you want to change which folder it searches for content,
change the `site_dir` option.

If you want to change how it defines a complete page[^1],
change the following option:

```
complete_page_selector = "html"
```

[^1]: a page that isn't put into the template.

If you want to change where it outputs files,
change the `build_dir` option.

With that said, let's get started!

## Installation

Soupault is available to download as a single executable.

[Soupault install](https://soupault.app/install/)

Simply move the executable to a folder in
your `PATH` environment variable,
or add the folder it's in to the `PATH` environment variable.

## Page files

First, we create the `soupault.toml` configuration file,
and tell it what pages to read and how.

```
[settings]

  # Treat files with "md" extension as "page files"
  page_file_extensions = ["md"]
  
# "Page files" need to be turned into HTML
# before everything else
[preprocessors]

  # Markdown is converted to HTML with the `cmark` CLI.
  # Remember to install cmark,
  # or use a different markdown CLI.
  md = "cmark"
```

See how Soupault doesn't depend on Markdown,
or even a specific implementation of Markdown?
You could easily use your preferred Markdown format,
or an entirely different markup format like djot instead.

[Introduction to Djot](https://pranabekka.github.io/djot-1/)

[Djot home page](https://djot.net)

## Create a template file

Since "page files" don't generate complete HTML documents,
we must insert it into a full HTML document.

The default template file is `templates/main.html`,
so that's where we'll insert the following:

```
<!DOCTYPE html>
<html>
  <head>
    <title>Generated with Soupault</title>
  </head>
  <body>
    <!-- content will go here -->
  </body>
</html>
```

By default, content is added at the end of the `body` element,
though you can change it with the following options:

```
default_content_selector = "body"
default_content_action = "append_child"
```

[Page template options](https://soupault.app/reference-manual/#page-templates)

## Your first page

For Soupault to actually generate a page,
you'll need to write something.

Let's create an `index.md` file in the `site` folder [^2]:

[^2]: Remember, Soupault reads files from `site`,
and we've asked it to treat `md` files as pages.

```
# Index

Welcome to the index.
```

Now we can start generating a site with Soupault.

## Generate

To generate the site, just run `soupault`.

It will automatically create a build folder,
if there isn't one already,
and inside it there should be an index.html file.

If you have any issues, run Soupault with
the `--debug` and/or `--verbose` flags.
I'd recommend you run it like that at least once,
even if you don't have any issues,
so that you can see what Soupault does.

## Preview

![Home page with heading and welcome paragraph](/soupault-intro-preview-no-index.svg)

To serve your pages for preview, 
you can use a simple web server,
but if you have Python installed,
just use the http.server module.

{% details(summary="Web servers") %}

[miniserve](https://github.com/svenstaro/miniserve)

[Caddy](https://caddyserver.com)

{% end %}

Python http server:

```
python3 -m http.server --directory build
```

Running the command will give you an address
which you can open in your browser.

To automatically rebuild the site, use watch:

```
watch --interval 1 'soupault'
```

If you're using Windows instead, just use an infinite loop:

```
while (1) {soupault; sleep 1}
```

This will run `soupault` every second,
and you only need to reload the page to see your changes.

And that's it!
You have a basic site up and running!
But Soupault has more powerful features
to help you create the site you really want.

## Creating an index

Soupault doesn't have any default content model.
It doesn't require pages to have any specific metadata.
Instead, you tell it what metadata to extract from where,
and what to do with it.

### Extract metadata

Because we want the title to show up in the index,
and we want to sort the posts by date,
we'll define those as the metadata fields.

```
[index.fields.title]
  selector = ["h1"]
  
[index.fields.date]
  selector = ["div#post-date"]
  fallback_to_content = true # get the date from the contents, not attribute
```

Note how we're using the "h1" selector for the title.
This is because `cmark` turns `# Index` into an `h1`,
and Soupault runs the `preprocessors`
before it starts working with the page.

### Add a page to index

Right now, there's nothing for the index to list,
so let's create another page (in `site/`).
Maybe `hello.md`.

And since we've specified the date metadata field
as the contents of the `div` with the `post-date` id,
we'll also add that in.

```
# Hello, world

<div id="post-date">
  2077-07-07
</div>

This is a page. Wow.
```

### Allow HTML

By default, `cmark` replaces raw HTML with a comment.
To disable that, we need to use the `--unsafe` option.
So change the `preprocessors` section:

```
[preprocessors]
  md = "cmark --unsafe"
```

### Generate an index

Now that we have the metadata, 
and a page to index,
let's generate the index.

<!-- TODO?: mix in the views section and put most config there? -->

```
[index]
  index = true
  
  # We specified date as one of the index fields
  # in [index.fields.date]
  sort_by = "date"
  
  # Treat values as dates
  sort_type = "calendar"
  
  # Use the YYYY-MM-DD format for dates
  date_formats = ["%F"]
  
  # Ensure all dates are valid
  strict_sort = true
```

This is only the index data though.
We need a place to put this before we turn it into HTML.

### Make space for index HTML

Soupault will need to know where to put the index.
We'll just add a `div` with the `index` id
to the index.md file.
It should look like this:

```
# Index

Welcome to the index.

<div id="main-index"></div>
```

We'll tell Soupault to put the index in `div#main-index`.

### Insert index HTML

Now that we have the index data,
and a place to put the index,
we can render it into html.

Before we do that, we must understand views.

Since you might want to have different ways to index data,
such as grouping posts by author or tag,
Soupault lets you define "views".
Views have an "index_selector" property,
which will put the index HTML
into the element which matches that selector.
This allows you to have multiple index views in the same page.
Yes, we've already sorted it by date,
but you can put those options independently for each view,
or use different index rendering options.

{% details(summary="Index views and options links") %}
[Index views](https://soupault.app/reference-manual/#index-views)

[Index view options](https://soupault.app/reference-manual/#index-view-options)

[Index rendering options](https://soupault.app/reference-manual/#ways-to-control-index-rendering)
{% end %}

In our `index.md` file,
we're using a div with the id `main-index`,
so we want an index view that applies to `div#main-index`.

```
[index.views.main]
  # Use the main view for divs with the "main-index" id
  index_selector = "div#main-index"
  
  # The html to generate for each item
  index_item_template = """
    <h2>
      <a href="{{url}}">
        {{title}}
      </a>
    </h2>
    <p>Date: {{date}}</p>
  """
```

`{{url}}`, `{{title}}`, and `{{date}}` tell Soupault
to replace them with the related metadata fields.
The title and date are fields that we defined in `[index.fields]`,
and the url is a built-in field
that is automatically collected by Soupault.

[Built-in index fields](https://soupault.app/reference-manual/#built-in-index-fields)

Now you can reload the page in the browser
and see your index appear!

![Home page with index](/soupault-intro-preview-with-index.svg)

## Widgets!

Soupault's power feature is the ability to manipulate HTML.

For this, it uses an extensive set of "widgets",
though it provides a Lua scripting interface as well,
where you can create your own widgets.

[Widgets](https://soupault.app/reference-manual/#widgets)

[Built-in widgets](https://soupault.app/reference-manual/#built-in-widgets)

[Lua plugins/widgets](https://soupault.app/reference-manual/#plugins)

As an example, we'll use an `insert_html` widget
to add in the author name:

```
# add-author is a name *we* choose
# to help keep track of our widgets
[widgets.add-author]

  # Widget type
  widget = "insert_html"
  
  # Replace "Pranab" with your name
  html = "<p>by Pranab</p>"
  
  # Insert the HTML after the title
  selector = "h1"
  action = "insert_after"
```

This will insert a paragraph with the text "by Pranab" after the h1.
Remember to change "Pranab" to your name.

![Home page with "by Pranab" text](/soupault-intro-preview-by-pranab.svg)

You can use this same widget to insert a link to the home page,
as well as a link to some CSS.

Have a look at the built-in widgets as well as the Lua plugins for more.
Plugins are as simple as putting a Lua file
in the (configurable) plugins folder,
and then adding them like a widget to your `soupault.toml`.

[Built-in widgets](https://soupault.app/reference-manual/#built-in-widgets)

[Lua plugins reference](https://soupault.app/reference-manual/#plugins)

[Available plugins](https://soupault.app/plugins/)

## Final setup

This is a summary of what you should end up with.

### Folder structure

```
soupault-blog/
  soupault.toml
  site/
    index.md
    hello.md
  templates/
    main.html
```

### `soupault.toml`

```
[settings]
  page_file_extensions = [ "md" ]

[preprocessors]
  md = "cmark --unsafe"

[index]
  index = true
  sort_by = "date"
  sort_type = "calendar"
  date_formats = ["%F"]
  strict_sort = true

[index.fields.title]
  selector = ["h1"]
  
[index.fields.date]
  selector = ["div#post-date"]
  fallback_to_content = true

[index.views.main]
  index_selector = "div#main-index"
  index_item_template = """
    <h2>
      <a href="{{url}}">
        {{title}}
      </a>
    </h2>
    <p>Date: {{date}}</p>
  """

[widgets.add-author]
  widget = "insert_html"
  html = "<p>by Pranab</p>"
  selector = "h1"
  action = "insert_after"
```

### `site/index.md`

```
# Index

Welcome to the index.

<div id="main-index"></div>
```

### `site/hello.md`

```
# Hello, world

<div id="post-date">
  2077-07-07
</div>

This is a page. Wow.
```

### `templates/main.html`

```
<!DOCTYPE html>
<html>
  <head>
    <title>Generated with Soupault</title>
  </head>
  <body>
    <!-- content will go here -->
  </body>
</html>
```

## Learn more

If you want to see more options to set up your website,
have a look at the official blog quickstart,
as well as the reference manual.

[Blog quickstart](https://soupault.app/tips-and-tricks/quickstart)

[Reference manual](https://soupault.app/reference-manual/)
