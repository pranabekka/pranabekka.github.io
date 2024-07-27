+++
title = "A better Soupault (blog) introduction"
## remember to change date on publishing
date = 2024-06-26 12:52:04 # draft date
updated = 2024-06-26 12:52:04
+++

Soupault is a static site generator (SSG),
that works by manipulating HTML,
which makes it more capable and flexible
than any other SSG I know.

[Soupault](https://soupault.app)

NOTE: If you're using Windows,
you might want to change all paths
to use `\` instead of `/` for path separators.
See the relevant section in the documentation:

[Using soupault on Windows](https://soupault.app/reference-manual/#using-soupault-on-windows)

## Expected knowledge

- the CLI
- file paths
- TOML and/or other config files
- HTML
- CSS
- jinja style templates

## Why this is better

The official quickstart introduction is a bit front-loaded,
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

## Setup

First, we tell Soupault where our input and output will be.
Configuration is put in the `soupault.toml` file:

```
[settings]

  # Read files from here
  site_dir = "site"
  
  # Write files here
  build_dir = "build"
```

## Read your markup format of choice

By default, Soupault just copies files over.
This means CSS, images and other assets
are copied over as is,
but then so are our Markdown files.

We need to tell it which pages to treat specially,
for which we'll choose markdown files (ending in "md"),
and we'll tell soupault where to insert the HTML
that is generated.

```
[settings]

  # Previous config
  site_dir = "site"
  build_dir = "build"

  # Treat files with "md" extension as "page_files"
  page_file_extensions = [ "md" ]
  
  # "page_files" generate incomplete HTML.
  # They're not full HTML pages,
  # so we put that inside a template HTML page.
  # By default it goes at the end of the body,
  # which can be changed with default_content_selector
  default_template_file = "templates/default.html"

# Pre-process "page_files"
[preprocessors]

  # Run "md" "page_files" through a markdown processor
  md = "cmark"
```

Remember to install cmark.
It's available in the package manager
for most operating systems.

[Cmark](https://github.com/commonmark/cmark)

See how Soupault doesn't depend on Markdown,
or even a specific implementation of Markdown?
You could easily use your preferred Markdown format,
or an entirely different markup format like djot instead.

[Introduction to Djot](https://pranabekka.github.io/djot-1/)

[Djot home page](https://djot.net)

## Create a template file

Since "page_files" don't generate complete HTML documents,
we must insert it into a full HTML document.

We've specified this as "templates/default.html",
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

## Write a page

For Soupault to actually generate a page,
you'll need to write something.

Let's create an `index.md` file in the `site` folder [^1]:

[^1]: Remember, we've configured Soupault
to read files from `site/`,
and pre-process files with the `md` extension.

```
# Index

Welcome to the index.
```

Now we can start generating a site with Soupault.

## Generate and preview

To generate the site, just run `soupault`.

It will automatically create a build folder,
if there isn't one already,
and inside it there should be an index.html file.

To serve your pages for preview, use this simple one-liner:

```
python3 -m http.server --directory build
```

It'll give you an address which you can open in your browser.

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
It doesn't require pages to have specific metadata in a given format.
Instead, you tell it what metadata to extract from where,
and what to do with it.

### Add a page to index

It would be quite silly for an index to only list itself,
so let's create another page (in `site/`).
Maybe `hello.md`.

Since we usually sort posts by date,
we'll also add a date.
Soupault will need a way to identify it,
so we'll put it in a `div` with the id `post-date`.

```
# Hello, world

<div id="post-date">
  2077-07-07
</div>

This is a page. Wow.
```

### Extract metadata

Now we need to tell Soupault what metadata we want,
and how to get that metadata.

For the index, we'll be using the title and the date.

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

### Generate an index

Now that we have the metadata, let's generate the index.

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
but you can use index view options
or index rendering options.

{% details(summary="Index views and options links") %}
[Index views](https://soupault.app/reference-manual/#index-views)

[Index view options](https://soupault.app/reference-manual/#index-view-options)

[Index rendering options](https://soupault.app/reference-manual/#ways-to-control-index-rendering)
{% end %}

In our `index.md` file,
we're using a div with the id "main-index",
so we want an index view that applies to "div#main-index".

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
# add-author is a name we choose
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
Remember to change "Pranab" with your name.

Have a look at the built-in widgets as well as the Lua plugins for more.

[Built-in widgets](https://soupault.app/reference-manual/#built-in-widgets)

[Lua plugins/widgets](https://soupault.app/reference-manual/#plugins)

## Final setup

### Folder structure

```
soupault-blog/
  soupault.toml
  site/
    index.md
    hello.md
  templates/
    default.html
```

### `soupault.toml`

```
[settings]
  site_dir = "site"
  build_dir = "build"
  
  page_file_extensions = [ "md" ]
  default_template_file = "templates/default.html"

[preprocessors]
  md = "cmark"

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

### `templates/default.html`

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

If you want to see more options to set up a blog,
have a look at the official blog quickstart,
as well as the reference manual.

[Blog quickstart](https://soupault.app/tips-and-tricks/quickstart)

[Reference manual](https://soupault.app/reference-manual/)
