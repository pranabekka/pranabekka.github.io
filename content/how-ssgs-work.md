+++
title = "How Static Site Generators Work ft. Zola"
date = 2023-04-19 00:26:05
updated = 2023-04-19 00:26:05
+++

<!--
TODO: clarify where to use terminal commands.
TODO: mention template engine
-->

This is a general guide about how static site generators work,
using the Zola static site generator as an example,
with a sprinkling of why they are organised this way.
Other static site generators have the same requirements,
and generally use the same ideas and structure,
so this knowledge should help you get started with
any static site generator.

This post will be easier to digest if you understand
the difference between static and dynamic sites,
HTML and CSS, text editors, and the terminal.
Also, follow the Zola [installation instructions][install]
so that you can follow along with the examples.

**NOTE:** Please don't write the files as presented in this post
for an actual blog/website for others.
One reason is that I'm only putting partial HTML
(it works, but it's a good way to make a terrible site),
and I've also skipped on some other more advanced topics.
This post only explains how a static site generator
brings everything together.

## Structure

Let's get right into it.
The basic folders a static site generator needs are as follows:

1. content
2. static
3. templates
4. public

The `content` folder is meant for the posts you write.
Zola and other popular generators use [markdown][md] for writing,
and then these posts are processed
before being placed in the `public` folder,
using roughly the same file and folder structure.
They usually also include some more advanced features
that go beyond markdown.

The `static` folder is for files that are to be served as is,
without any modifications.
This includes images and CSS files.
These files and folders are copied directly to the `public` directory.
You can duplicate the folder structure from your `content` folder
and the files will then be placed in the same places
under the `public` directory,
next to the processed files from the `content` folder,
if they have the same relative path.
i.e. if you have the files `content/posts/post1.md`
and `static/posts/post2.html`
then your `public` folder will have `post1.html`
(remember, files from `content` are processed)
and `post2.html` under `public/posts/`.

The `templates` folder includes a bunch of html
files that are processed along with
a markdown file from the `content` folder
whenever you tell the markdown file to use that template,
or according to some special rules
so that you don't have to specify it every time.
Templates allow you to do things like
putting a list of important links on every page,
or creating a list of all your pages.
To do this, they allow some special codes in them
to access the contents of the folders and files
in the `content` folder.

Finally, the `public` folder is where all the processed content
is finally output for the "public" to view.
This is where the "static" from "static site generator" comes in —
they're simply a bunch of static files,
served as-is to anyone who visits your site.

Most generators also include a `theme` folder
where you can place "themes" from other people,
which include custom styling (css) and templates
to do most of the heavy lifting —
all you have to do is write your markdown posts.

Other files and folders can also be included for various things.
The config file is a common one, placed with the other folders,
to control things like your website name, url, theme, etc.
The website url is used when generating the paths for links,
amongst other places.

## Getting Started

The easiest way to get started in Zola is to create an `index.html`
file within the `templates` folder.
All you would need to put is `<h1>Hello, world</h1>`,
and you're done.

If you run `zola build` and check the `public` directory,
you'll see the `index.html` file, which is copied as-is.
Open it in your web browser to see what it looks like
(kind of ugly, unless that's your taste).
Open it in your editor to check that
it's actually copied `templates/index.html` as-is.

The `templates/index.html` file is required because
every website needs an index file to start,
and markdown files can't be processed without a template.

The `_index.md` file is not required
because there's no reason to edit it often,
which means that there's little benefit to writing it in markdown,
so Zola simply assumes it exists.

A cleaner way would have been to accept
an `index.html` file in the `static` folder,
since you only need Zola to copy it as-is,
but Zola has (rightly) assumed
that there is no reason to do that,
so they never check for it.

## Authoring Pages

Like I said above, a markdown file requires a template
for it to be processed.
Zola automatically applies the `templates/index.html` file
to the (automatically created) `content/_index.md` file,
and any other pages are usually assigned the `page.html` template,
unless you specify otherwise.

So, the first thing to do is to create a `page.html` file
inside the `templates/` folder.
Within that file, we enter the following:

```html
<h1>{{ page.title }}</h1>
{{ page.content }}
```

The text between the braces (`{{ }}`) are the special codes
that I mentioned earlier.

When the `page.html` file is processed with a markdown file,
it is given access to parts of the markdown file using
the `page` variable.
The `page` variable has fields called `title` and `content`.
Our `page.html` template file puts the page title inside a heading tag,
then dumps the rest of the page under that.

Now, we can write our first page in the `content` folder.
Choose a name for your file.
We'll choose `first-post.md`,
and within it, we'll write some text:

Try to write your own title and text,
so that you can see Zola respond to your wishes.

```md
+++
title = "My First Post"
date = 2023-04-19
+++

Hi, this is my first post!
```

The section between the two sets of plus symbols (`+++`)
is known as the frontmatter.
Different sites use different styles for frontmatter.
The frontmatter is used to specify basic information about your post,
including some custom information you can pick for yourself.
The title field is what is accessed by `{{ page.title }}`
in your `page.html` template,
and everything outside the frontmatter is the content,
accessed by `{{ page.content }}`.

If you run `zola build`,
and open the `public` folder,
you'll see a `first-post/` folder,
within which is an `index.html` file.
This is done because opening `first-post.html`
would show the `.html` at the end of the url,
which people might find ugly
because they're not used to seeing it,
and it's something that a visitor to your site
doesn't need to know.
It works because whenever the browser opens a folder on a server,
it automatically shows any `index.html` file within that folder.
This will not work when opening a folder on your computer.
In that case the browser shows a list of files in that folder.

If you open `first-post/index.html` in your editor,
you'll see the following:

```html
<h1>My First Post</h1>
&lt;p&gt;Hi! This is my first post.&lt;&#x2F;p&gt;
```

Open the file in your browser to see exactly what it's doing.
`page.content` has basically created the text
`<p>Hi! This is my first post</p>`,
and Zola makes sure by default that random text
is not converted into HTML elements,
otherwise it might mess up your page.

To correct the issue, edit your `page.html` file
in the `templates` folder.
Change `{{ page.content }}` to `{{ page.content | safe }}`.
The safe command tells Zola that page.content
(or whatever comes before the `|`)
is properly formatted HTML,
and is thus safe to show as is.

Run `zola build` again and check the file
in your editor and the browser
to make sure that everything is working.
Your editor should now show the following:

```html
<h1>My First Post</h1>
<p>Hi! This is my first post.</p>
```

Feel free to create a second post to test it out further.

## Static Files

The _static_ folder is a good place to put your `style.css`.
Just put `body { background: cyan; }` to test it out.

Remember to edit your template file
so that it links to the CSS file:

```html
<link rel="stylesheet" href="../style.css">
<h1>{{ page.title }}</h1>
{{ page.content | safe }}
```

Run `zola build` and refresh the browser page to review your changes.

## Actually Using Zola

I explained things using the slightly cumbersome way
so you could see the things I explain for yourself,
and I omitted several other features that were
not necessary to explain the main components.

The first thing to know is that `zola serve`
creates a local url that you can open in your browser,
and whenever you save changes to any of your files,
Zola will refresh the page
and serve any new pages that you create.
You don't have to run `zola build` and manually refresh the page,
so you can focus on simply editing your website
while Zola does the rest of the work.

[install]: https://www.getzola.org/documentation/getting-started/installation/
[md]: https://spec.commonmark.org/dingus/
