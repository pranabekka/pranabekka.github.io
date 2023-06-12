+++
title = "Lispy Templates"
draft = false
date = 2023-05-15 20:32:10
updated = 2023-05-15 20:32:10
+++

Lisp makes a pretty great system for templating all kinds of material.
Simply let people write lisp code directly in their files
and evaluate it in the context of the document,
while blocking features unsuitable for templating.

In the most basic form treat `,<anything>`
as a call to evaluate `<anything>`.
So `,var` expands to the variable `var`,
and `,(func arg1)` expands to the function `func`
with the argument `arg1`.

The next step after this is to create content blocks.
If you need to wrap some content inside a function
(such as a loop),
you wouldn't want to worry about escaping all the quotes.
For that purpose, use square brackets
(Borrowed from [Typst](https://typst.app/docs/reference/types/content/).
This allows you to write
`(link [Link to article called "Hello, World"])`
without worrying about escaping the quotes or using single quotes.
You still have to escape closing square brackets,
but that's not as big a problem in my opinion.

In addition to representing flat data,
s-expressions can easily model nested data structures as well,
which is where their power truly shines.
HTML is a common format that represents nested data.
All you need is custom functions to create various HTML elements,
which allows you to write something like the following:

```
,(:para
   [This is some content with a 
     ,(:link [link text] "example.com")
    in it])
```

The coolest part is that you don't need to
embed a scripting language.
You just re-use the lisp programming language!

```
;; definitions

,(define fn1
   (:footnote [I am but a Lisp newbie]))

,(define fn2
   (:footnote
     (:link [CommonMark specification] "commonmark.org")))

,(define fn3
   (:footnote
     (:link [LaTeX Website] "latex-project.org")))

;; html content

<h2> ,next-steps </h2>

<p>I have yet to see or implement this ,fn1 ,
but imagine using it in regular prose
as a Markdown ,fn2 or LaTeX ,fn3 alternative?</p>

<p>It would probably require being able to define
custom syntax, since it would be tedious to type
<code>,(:link [This is my title])</code>
every time you wanted to insert a link,
for example.</p>
```

A lot of these ideas were inspired by [Typst](https://typst.app), by the way.
Check it out.
