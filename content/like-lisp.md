+++
title = "I Like Lisp(s). You Might Too"
draft = true
## remember to change date on publishing
date = 2023-07-01 21:29:12 # draft date
updated = 2023-07-01 21:29:12
+++

Here's my take on why Lisps are cool
(such as Common Lisp, Scheme, Clojure, and Janet).
I hope you find a few nice gems in here :)

Let me just start of with a tiny rant:
Why on Earth don't other programming languages
let you use hyphens for naming functions and variables!?
It's so much easier to type `do-this` instead of `do_this`.
I mean, you're already stretching your little finger
to type out that underscore ('`_`'),
and then you have to stretch the other little finger
in the opposite direction to _hold_ down the shift key.
Why. Plus `kebab-case` just looks nicer.
Hyphens are narrower, which leaves some whitespace on either end,
and they're balanced along the (vertical) centre of the line
instead of squatting on the baseline.

Alright, back on topic.

**NOTE**: None of the following is actual code,
unless you've defined the correct functions and variables in advance.

Here's the really cool thing about Lisps:
it builds on two very simple rules.
You break apart pieces of information with spaces,
and you group information together with parentheses ('`()`').

`(you get (1 + 2) kebabs)`

(Btw, we just got JSON and XML dead to rights
--- since 1970, at the least.)

There are only two exceptions to this (that I can think of),
and they might not apply to all lisps.
One, strings allow you to put spaces between double quotes.
This is common to all programming languages, as far as I know.
Two, escaped symbols
(either spaces surrounded by the pipe (`|`) character ---
not to be confused with `1`, `l`, or `I` ---
or spaces preceded by the backslash (`\`) character).

Then another cool thing is prefix syntax:
within the grouping, the first item is the action,
and the rest of the items are what it acts upon.

`(action object1 object2 object3 ...)`

Everything is prefix syntax!

`(cook my-kebab your-kebab their-kebab)`

Here's a brief look at everything so far:

```
(if (cooked? my-kebab)
    (eat my-kebab) ;then
    (cook my-kebab) ;else
```

First, the inside groupings are checked.
Is `my-kebab` cooked?
If the answer is yes,
then we eat it,
and the whole (outer) grouping says we ate it,
otherwise, it says we cooked it.

Have a look at this one:

```
(multiply (add 1 2 3 (subtract 5 1))
          2)
```

First, we see the grouping for `multiply`,
then we see it has a grouping for `add`,
which, in turn, has a grouping for `subtract`.
`subtract` has the numeric objects 5 and 1,
and it returns 4.
Now `add` has the number 4,
as well as 1, 2, and 3.
So `add` returns 10.
And now `multiply` has the numbers 10 and 2.
So `multiply` returns 20!

Now, people from other programming languages
also have the basic math operations available as
expressions that they can group withing parentheses,
but Lisps allow everything to be an expression!
Everything gives a result,
even if it's to say that there's nothing here.

For example, `(cooked? kebab)`
might tell you that no, `kebab` is not, in fact, cooked.
So here's something you could do:

```
; we have the question: is my kebab cooked?
; here's how we save the answer
; (maybe to determine what we do next)

(set! answer (if (cooked? kebab)
                 "cooked! :D"
                 "not cooked!"))
```

Many languages only got a feature like this
in the last few years.
(Scheme and Common Lisp are from the mid/late 1900s)
And still they're limited to specific constructs
that the language implementers have thought
feasible and of reasonable importance.
All the Lisps get this for free.

Now, I've hinted at this above,
but (most) Lisps allow you to use
(pretty much) any character for naming things.
So you can write a function like `cooked?`
instead of `is_cooked` or `isCooked`.
Or `string->array` instead of 
`string_to_array` or `stringToArray`.
It might not seem like a big deal,
but if you think about it,
this limitation seems a bit arbitrary.
Why shouldn't I be able to add a question mark?

Essentially, Lisps (especially Scheme and newer ones)
have really neat and cohesive syntax and semantics.
Everything follows a small set of foundational rules,
and now you just need to understand what a function does.

Remember that comparison to HTML and JSON?
Here it is:

```
;; lisp
(html
  (head
    (title "Title Goes Here"))
  (body "Body goes here."))
  
<!-- xml/html -->
<html>
  <head>
    <title>Title Goes Here</title>
  </head>
  <body>
    Body goes here.
  </body>
</html>

// json5 (because the base spec doesn't have any)
{
  "html": {
    "head": {
      "title": "Title Goes Here"
    }
    "body": "Body goes here."
  }
}
```

Notice how much shorter Lisp is.
Notice, for example, how it doesn't require
all those opening and closing tags that XML does.
Notice, also, how it doesn't require all those quotes and colons.
In fact, you could even strip out the quotes in the Lisp version
for something even simpler (depending on your requirements).
The first word defines the type of the grouping,
and everything else is the content of that grouping.

Err... I guess that reminds me:
Not everything that comes at the beginning
of a grouping (list) is an action.
You can say, for example, `list`,
to create a list of things:

```
(list
  (pranab likes kebabs)
  (you might like cats)
  (someone probably likes swimming))
```

And in this instance,
`pranab`, `you` and `someone` are not functions.
Each one is simply an object
inside a grouping that is an object itself.

_Sigh_. Lisps are such beautiful languages.
I honestly fail to see why people bother with anything else.
Oh well.

I encourage you to look up and read more about Lisps,
because I've just taken a shallow look
that glosses over a lot of details.
Some interesting points are:

- Paul Graham's [essays on lisp](http://paulgraham.com/lisp.html)
(really persuasive articles about the _power_ of lisp;
[this one](http://paulgraham.com/avg.html) is really inspiring)

- "[A Scheme Primer](https://spritely.institute/static/papers/scheme-primer.html)"
by Christine Lemmer-Webber from Spritely Goblins Insitute.
(A very simple introduction to some actual Scheme code)
