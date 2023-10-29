+++
title = "Static Site Build Tool"
date = 2023-04-20 23:34:47
updated = 2023-05-11 20:08:03
+++

I've just been thinking of what it would be like
to have a static site build script.
You would have
dependency management,
parallelisation,
task runners/commands,
and access to all sorts of (cli) tools
(including your own scripts and binaries).

**NOTE:** Some of this might require
a more advanced understanding of static site generators,
or at least an understanding of my understanding of them ;p \
See [my article](@/how-ssgs-work.md) on how they work to know more
(It's a bit long and quite exhaustive,
so feel free to skip it unless you're really confused).
Also, the article won't describe build systems.

## Prior Art

Some similar tools already exist
in the form of [mkws.sh][mkws]
and [sss][sss] (inspired by mkws), 
but my idea is a bit different —
you use a build tool to stitch everything together,
as opposed to a shell script,
which can easily track which files need to be rebuilt,
gives you simple commands to run,
can (usually) easily perform parallel computation,
and is quite easy to extend.
Plus, I discovered you can use python as the shell in make.
And I wouldn't really want to use [pp][pp] —
it's a bit cumbersome.

## Templating

I'd prefer it if pp used a cleaner syntax like `{{ shell }}`,
which makes inlining so much cleaner,
and it handles indenting better as well,
which some file formats really care about.
I'd also like to have the option to customise which shell to use,
since I'm more familiar with fish shell —
there is absolutely no reason to use (d)ash for a personal site.
Update: turns out it's quite easy to make your own
[templating engine in fish shell](@/shell-templating.md)!

Otherwise, you could always use
a cli templating engine like [j2cli][jinja-cli].

Going through the Pop!_OS package repository,
there are a lot of cli html templating engines,
such as ace, amber, cl-lml2, and aft.


## Build Tools

The build tool can also be anything that you like —
I like something like make, [tup][tup] or [redo][redo]
since they integrate with the shell pretty well,
and there's a lot of file management in there,
plus the shell makes excellent glue code.
Otherwise you could use something like
[meson/ninja][meson] or [shake][shake],
if you want something _really_ powerful.
Actually, shake might be a good bet if you know haskell,
since (I think) you can plug in other libraries for each step,
to make a much more cohesive and well-integrated program.
There's even [overlord][overlord] for a (common) lisp build system,
or [buck2][buck2] if you want somethind industrial grade<sup>TM</sup>
(that's a joke).

**NOTE:** If you're using make,
the `.ONESHELL` directive runs the steps in a command
in the same shell instance,
otherwise make runs each one in a separate shell.

## Authoring

You can use any file format you want for authoring,
including the dialect of whatever markup language you choose.
Some interesting languages are [typst][typst] and [djot][djot],
although typst doesn't have HTML output yet
(as of the time of writing this article;
if you look at the design of typst, the pdf output,
and the github issues, however,
you can be sure that it'll be really solid).
I used to really like [asciidoc][asciidoc],
but the tooling around it is a bit limited,
so you need to know ruby/java to extend it,
which is why I didn't get around to having a blog for bloody ages.
Use a common static site generator if this is your first time,
and read through the docs, examples and discussion —
you can do almost anything you want and more.
It might help to start with a test blog,
where you just write down random thoughts and articles,
without actually deploying it anywhere.
Anyway, rant aside, the point is that
there's some really cool markup languages out there.

### Front Matter

You could use a different front matter format,
or no front matter at all!
Let your site builder handle the rest automatically!
Maybe read it out from the file system.
Maybe with a git hook that gets dates from git.
Maybe some other step that creates file hashes
and stores dates in a db?
Maybe a prompt for metainformation about unknown files
that gets saved in a db.

## Content Layout

You could adopt a structure where
you dump everything into the content directory,
and if there's a build step for that file (type)
it gets processed according to the build step,
else it's copied directly to the build directory.

Some (most?) build systems even prioritise specificity
when it comes to applying a build step,
so you can set certain files
(or classes of files, based on the file name)
to use custom processing/templating.
You could just rely on ordering, otherwise —
simply place the more specific ones higher up,
and the files it doesn't match will get passed along
to the more general rules,
while the ones you want to treat specially
are caught by the more specific rule at the top.

## Development and Testing

For serving the pages live while you develop and test,
you can plug in something like [miniserve][miniserve]
(to serve files on your device and local network),
with [entr][entr] (to automatically rebuild on file change)
and [live.js](https://livejs.com)
(injected into your html pages for auto-reload).

You'll need to set up your site builder
to use relative paths
or set the url to be the local ip
used by miniserve [^mini-ip] or your preferred dev server
in order to preview the links locally,
otherwise it would take you to your production site.

[^mini-ip]: miniserve displays a list of ips,
but you could also find out by running
`ifconfig | grep 192`.
If you use `ifconfig` use the second ip
starting with `192.168` and add `:8080` at the end.
miniserve tends to use 8080,
but you might need to change it if it says something else.

You could even use [caddy][caddy]
or some other server thing.
There's actually plenty of them —
especially in the Go and Rust space.
You can even use a python one-liner —
I _think_ it's `python3 -m http.server`.

In fact, caddy seems to have markdown rendering
and template evaluation.
Dang.
That makes a great development environment,
although it might be a bit overkill,
and it will probably cause some config duplication.

Alternatively, you could write your own tool to
create a file server that works as expected —
it would automatically serve index.html files from directories,
and edit the base url in internal pages
to point to the local network.

## Image Optimisation

You can add build steps for most images,
where they are optimised for file size
and converted to multiple (display) sizes.
Multiple display sizes directly affect resolution
and therefore the final file size,
and the browser can often decide which one to pick
if you simply list all of them in a figure tag
(or something like that).

Using this entire system gives you the freedom
to plug in all sorts of things
and create a system that aligns with your workflow,
instead of tying you to the assumptions
(such as markdown authoring)
of the static site generator.

You will, of course, have to edit your templates
to use the processed images.
You can use `srcset` attributes in `img` tags,
or use a figure element,
and the browser will automatically pick
the most appropriate image.

See the mdn web docs
[article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
for a comprehensive guide.

CSS-Tricks also has a great
[article on reponsive images](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset).

## Content Templates

You can make content file templates
that you can instantiate with a simple `new` command.
This is especially useful
if you're using custom front matter or special pages,
which you might forget about.
For example, if you're authoring files in markdown,
then you could store some template markdown files,
like blog.md and tutorial.md,
and then use `build-tool new blog`
or `build-tool new tutorial`
to create a new post using the given template.

## HTML Processing

You might want to edit the generated HTML for your pages,
even to a small degree where you replace a span with a div,
or the other way around.

One tool I've found [xmlstarlet][xmlstar],
which can structurally edit xml files,
and has some amount of praise around the internet.

Alternatively, xml2 [^xml2] converts XML/HTML to line-oriented formats
that can be manipulated with the usual Unix tools,
which frankly sounds exciting.
(A very similar tool for json is [gron](https://github.com/tomnomnom/gron).
You should check it out if you already know the unix tools.)
Additionally, a github user called dbohdan maintains a list of
[structured text tools](https://github.com/dbohdan/structured-text-tools#xml-html),
which includes some xml tools that could be useful.

[^xml2]: See xml2 in the Ubuntu package repositories.
Website available on [archive.org](web.archive.org/web/20160719191401/http://ofb.net/~egnor/xml2).

You could also use a mardown converter
that lets you hook into it's HTML generator
and create custom HTML output.
I don't know of any such tool yet,
but it could expose the parts of the structure as variables,
which you could feed into a template.

## Documentation and Help

Getting this method to really work for people
would require some good documentation and examples to accompany it,
because it's all about customisability and control,
which will require a lot of research and experimentation
that could prohibit people from developing the site they want
if the information is not available up front.
This includes
a list of tools,
how to use them,
best practices,
common issues,
a public forum or chat (like Zulip [^zulip]),
and more.

[^zulip]: Zulip allows you to make some chats
visible to everyone on the internet,
regardless of whether they're signed up
and part of your organisation or not.
I believe this is a very important step for
reducing friction for new users.
See the [oilshell/oils-for-unix](https://oilshell.org) project
for an example.

A good documentation project around this system
should allow anyone to easily create their own site builder
in a programming language of their choice
(except, perhaps, for a good parallel build system).
And then they could contribute further to the documentation.
Maybe.
Is there a general website
covering different static site generators
and how they work?
That might be the place for such documentation.
Maybe link to good shell scripting practices as well.

## Feedback

Do [let me know](@/about.md#contact) if there are any
interesting tools for these things.

[mkws]: https://mkws.sh
[sss]: https://github.com/kmaasrud/sss
[pp]: https://adi.onl/pp.html
[tup]: https://gittup.org/tup/
[redo]: the-apenwarr-link
[meson]: https://mesonbuild.com
[shake]: https://shakebuild.com
[overlord]: https://github.com/ruricolist/overlord
[buck2]: https://buck2.build/
[jinja-cli]: https://github.com/kolypto/j2cli
[caddy]: https://caddyserver.com/
[miniserve]: https://github.com/svenstaro/miniserve
[entr]: https://eradman.com/entrproject
[typst]: https://typst.app
[djot]: https://github.com/jgm/djot
[xmlstar]: http://xmlstar.sourceforge.net
