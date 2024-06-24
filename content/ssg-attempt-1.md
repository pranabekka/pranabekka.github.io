+++
title = "SSG attempt 1 notes"
date = 2024-06-24 13:44:00 # draft date
updated = 2024-06-24 13:44:00
+++

I made a little progress on creating my own SSG,
but I decided it would take too much time
and I need to work on my base skills first.

One roadblock was Codeberg pages redirects not working properly,
Then I also figured that doing proper builds
would require a lot of work.

## Goals

Before I start, this project was an attempt of two things:
using djot for authoring pages,
and using HTML (manipulation) to glue things.

## Codeberg pages redirects

So, I like my built files to be
in the same directory that I'm working in,
and I see no reason to not build the site on my machine,
since I'm already doing the work.

In light of that, I liked Codeberg's `_redirects` file.
It lets you specify something like `/* /build/:splat 200`,
which serves all requests at the root from the build folder,
without rewriting any URLs.

It just has a few bugs right now.

[Issue report on Codeberg](https://codeberg.org/Codeberg/Community/issues/1545#issuecomment-2033496)

I could try using worktrees or submodules
with a simple git hook to deploy pages,
but then I'd have to deal with other issues
like managing builds correctly,
not to mention the complexity of git.

## Proper builds

There's a lot of things to be handled here:

- Removing stale files

  If I delete source files, I need to remove
  the corresponding build files.

- Depending on the build file

  If your build rules change,
  then you want (changed) builds to be redone.
  If I'm doing a build script in the language,
  then everything will need to be redone,
  unless I come up with a clever way to structure builds,
  or maybe work on a constructed dependency graph.

- Dependency graph

  A way to manage which items depend on which,
  so that individual build jobs can be scheduled.

Some of these ideas are from the ninja author's
notes on ninja and a successor called n2,
which would be good resources for approaching the issue.
The design notes have a lot of useful information,
as well as the links in the project's README file.

[Design notes on n2](https://neugierig.org/software/blog/2022/03/n2.html)

[n2 (pronounced "into") on Github](https://github.com/evmar/n2)

Using some sort of build library might also be an option,
though that'll be another dependency to figure out,
which might require me to contort my design,
and they might encounter the pitfalls
recorded in the design notes for n2.

I could try using a simple method of rebuilding everything
and working through all the pages in the contents folder,
but it would probably cause strife,
and I still have to deal with other issues.

## Other issues

I have to figure out the design and code for things like
backlinks, custom components, build hooks, templating, etc.

In addition to that, I have to do a lot of reasearch
to figure out which APIs I can use and how.
I've already encountered many little roadblocks.

At a certain scale, I might also want to use Typescript,
but I'm still learning Javascript.

I'm also working on multiple layers of abstraction right now.
In the current project repo,
I have a bunch of custom CSS/JS stuff
for handling a dark/light mode toggle.

[SSG attempt 1 repo](https://codeberg.org/pranabekka/pages)

There's a few more issues
at the end of the design introduction:

## Design introduction

Folder structure:

```
build/
content/
  index.djot
  main.js
  main.css
  ...
extra/
  template-default.html
_redirects
ssg.js
```

`build` is where the built site is stored.

`content` and `extra` are the two types of input
for generating the site.
`extra` contains "extra" data like templates
and maybe some data files to build pages from?
`content` contains files that will be copied over
with minimal changes, that form the content of the site.
Maybe `main.js` and `main.css` shouldn't be in there ---
I probably put them there because I had logic
for copying anything that wasn't djot files.

`_redirects` is something specific to Codeberg pages,
which allows you to specify redirects for your pages.

`ssg.js` is the build script.

It works by working through all the files in `content/`.
If it's *not* a djot file,
it simply copies it over to `build/`,
and if it *is* a djot file,
then it converts it to HTML,
inserts its contents into the template,
and copies over the resulting page to `build/`.

### Few more issues

This reminds me of a few more issues:

- How do I handle data files that generate pages?

  Does the `content` folder treat data formats
  as something special to generate pages from?
  (data formats like JSON or whatever I like)

  Or do I put data files in `extra`,
  and have a special component or content file
  to take in data and spit out a page or more?

- How do I copy djot or data files verbatim?

  This is probably the work of a `static` folder,
  where `main.css` and `main.js` should also go.
