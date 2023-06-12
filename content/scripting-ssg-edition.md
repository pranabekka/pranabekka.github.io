+++
title = "Scripting (SSG Edition)"
draft = true
date = 2023-05-17 20:16:04
updated = 2023-05-18 12:11:46
+++

A lot of applications that are meant for creating media
benefit from some sort of scripting,
including SSGs (static site generators).
All of the Javascript ones seem to use Javascript,
but Hugo and Zola rely on templates to do everything,
which can be quite cumbersome, limited and generally painful.

However, it should be relatively easy to add scripting to them,
since Go and Rust have several scripting languages
that are designed to be easily embedded.
You can have a look at [this (Github) page on embedded scripting languages](https://github.com/dbohdan/embedded-scripting-languages)
for a full list,
but some interesting options include
[Rhai (Github)](https://github.com/rhaiscript/rhai)
for Rust, and [Tengo (Github)](https://github.com/d5/tengo)
and [Anko (Github)](https://github.com/mattn/anko/)
for Go.

The most interesting options, however, are
[Starlark(Github)](https://github.com/bazelbuild/starlark)
and [Nickel (Github)](github.com/tweag/nickel),
both of which are designed for configuring
build systems and related tools.

I think they're quite suitable
because they're designed with a very specific use case
instead of some abstract theory,
and that specific use case happens to be build systems,
which are what static site generators essentially are.

Starlark has implementations in both Go and Rust,
while Nickel is implemented in Rust.

## Benefits

As stated earlier, full fledged scripting languages
make it easier to write complex and reusable code.

They can also be used to make a more intuitive
and integrated templating system,
by using the same language in the templating system.
I've included a templating example with Starlark below,
but it can also be used to implement metadata
(or "frontmatter") with a simple function call
like `{{ meta("2022-03-05", draft) }}`
at the top of your markdown file.

## Starlark

Starlark is a Python-like scripting language
designed for build systems,
and static site generators are basically specialised build systems.
It's designed to be parallel (for fast builds),
safe (for executing untrusted code) and simple.
Honestly, sounds perfect for a static site generator.
The one downside might be randomness,
but that could be provided by the application (Zola or Hugo).
The [Buck2 build system (Github)](https://github.com/facebook/buck2/)
for example, provides an [API (Github)](https://github.com/facebook/buck2/blob/main/docs/benefits.md#benefits-for-rule-authors)
that can be accessed by scripts.

You could even embed it inside the template language.
As an example:

```
<h1>{{ page.title }}</h1>
<ul>
{%
  for page in pages:
    """
    <li>
      <a href={{page.permalink}}>{{ page.title }}</a>
    </li>
    """
%}
</ul>
```

NOTE: I'm not 100% sure about Starlark syntax and features,
and I'm not really a Python user either,
so this might not be correct.
Although, you could probably add additional features
through the app, such as a custom string format (I think).

This enables you to write more complex scripts directly,
instead of writing them in the (imho) awkward template syntax.

```
def page_list(pages):
  """create a list of pages"""
  result = "<ul>"
  for page in pages:
    result += """<li><a href="{page.permalink}">{page.title}</a></li>"""
  result += "</ul>"
  return result
```

That example is not so bad in the templating language,
but ending all your statements with `end-<statement>`
and scripting more complex logic can get quite annoying.

## Nickel

Another language that could be used is [Nickel](https://github.com/tweag/nickel).
It's designed with the Nix build/configuration system in mind,
and is inspired by the Nix language.

One advantage over Starlark is gradual typing and contracts.
(Contracts are basically like assertions.)
This is especially helpful when writing scripts
that expect data in a specific form,
but would otherwise return incorrect results
which you might find several weeks later.
You can also use it to ensure that your configuration
conforms to a certain type or contract,
instead of causing errors later on.
Contracts, for example, can ensure properties
about your strings, such as what they can contain,
what they can start or end with, and so on.
As a simple example, you can do

```
let dateToString : Date -> String
```

Another is easier multiline strings ---
in the Starlark/Python example above,
it would preserve the indentation of the text
(quite unintuitively, might I add).
Here's how it looks in Nickel:

```
let it's-a-multiline-string = m%"
  This isn't indented.
    This is indented.
  This isn't indented.
"%
```

(Yes, examples imply it allows hyphens
and single quotes in its identifiers.)

While most configuration languages try to avoid
turing completeness, Nickel is Turing-complete,
with restricted accessibility to side-effects.
This can allow things like reading file contents
and updating backlinks, which are quite useful.

Nickel can also import and reuse YAML, TOML and JSON,
which allows gradually migrating to it,
instead of completely invalidating older (site) configurations.

Have a look at the [Rationale (Github)](https://github.com/tweag/nickel/blob/master/RATIONALE.md)
to understand their design choices and
how it compares to other languages, including Starlark.
