+++
title = "Log"
date = 2024-06-24 15:52:46
updated = 2025-10-10 20:12:25
+++

Where I add short thoughts, TODO items, links, etc.,
that shouldn't be a separate page.

I intend to keep adding entries under sub-headings by date,
without deleting old entries.

Somewhat similar to "now" pages
or Sara Joy's "Weak Notes".

["Now" pages](https://nownownow.com/about)
(warning: bright white page)

["Weak Notes" by Sara Joy](https://sarajoy.dev/basic/notes)

## 2025-12-19 The eye

I've always been a bit "edgy",
though it waxes and wanes,
and I don't express it all that much.
It feels silly sometimes,
but I also enjoy it.
So.

## 2025-10-09 A little funny, a little sigh

- Functional programming languages essentially
  allow pass around references nearly everywhere,
  and you can mutate pretty much anything,
  unless you hide it in a module.
  
  That's the funny.

- You don't need an accumulator for tail-call optimisation
  if the function calls itself only once.
  
  So that's the other kind of loop
  that's tail-call optimised,
  while constructing a value,
  without requiring an accumulator.
  
  We could still just teach a simple function like that
  followed by something with an accumulator.
  Perhaps the difference can be stated as "combining".
  A function calling itself more than once
  is for when it needs to combine results, right?
  So the accumulator stores a part of the combination,
  and the second part is calculated and combined
  in the next repetition of the function.
  
  I'm pretty sure that's it though.
  
  That's the little sigh.
  It's a bit more complicated than I thought,
  but I think we can still avoid teaching
  stack frames and tail-call optimisation.
  I can't believe I completely forgot that.

## 2025-10-05 Accumulator functions

I think we can teach functional programming
without teaching tail-call optimisation.

Functions that return nothing are optimised,
because there's nothing to be done with the return value.

Functions that need to return something
use an accumulator for tail-call optimisation.

Accumulators encourage function designs
that are tail-call optimised,
the same way functional languages
encourage program designs that are
optimised for modularity and composability.

So we can teach accumulation instead
and keep tail-call optimisation as an advanced topic.

## 2025-10-04 Not corrections

Huh, I thought I'd put up some nonsense about the NoSQL stuff.
I didn't. There's nothing strictly wrong there.

The only thing to add is that the general requirements
might be immediately fulfilled by
an embedded document database (engine?).
Maybe an embedded _graph_ database?

The other option, going the plain text route,
is to pick a "configuration and policy" language,
like CUE, KCL, Nickel, Dhall, etc.

I also realised that application code
ideally checks the data before storing it,
so it could use the same checks to import it,
instead of reimplementing types in the database.
So it makes some sense for SQLite to be "untyped".

Anyway, I can't comment on a specific pick.
I'll get around to it when I actually need it ---
spend an innovation token.

## 2025-10-03

Oh, hello there.

I keep thinking of this page,
but I never get around to it.
Part of it is because I only edit this at my laptop,
and this is mostly a place for short or idle thoughts
which don't seem worth the effort.

I'm also working on a few big things,
trying to get them just right,
but in the meantime:

- Objects are a bad patch over poor type systems.

  Encapsulation is done by modules.
  So they might be patching poor module systems as well.

  Multiple inheritance is reviled.

  Inheritance trees are just variants.

  Types associate functions with data.
  And as I said, modules to separate them.

  Types are just one additional concept,
  while objects mean classes, methods,
  private fields, private methods, inherited methods,
  and more.

  What do you think?

- Something mildly inappropriate

- We don't need SQL for most projects.
  Especially if we're using ORMs,
  but also if our project is something small.
  I just don't know of a good NoSQL database.
  Something like SQLite meets MongoDB.
  Maybe a binary format,
  I don't mind a text format like KDL.

  Oh, CUE is a really interesting option!
  It's like JSON with less typing, adding rules,
  generating repeated parts, and more.

  [KDL](https://kdl.dev)

  [CUE introduction](https://cuetorials.com/introduction/)

- I was thinking of having individual log posts,
  with a page aggregating them all like this.

  I wouldn't be editing the same post again and again,
  possibly forgetting to update the data.

  New updates would show up on the home page,
  labelled something like "Log 2025-10-03"
  to indicate the kind of post it is.

Enjoy my braindump :)

## 2024-09-21

- Beware the NodeList (and use the console/repl often)

  Had an issue where I got a list from `getElementsByClassName`
  to copy their contents and delete them from the DOM.
  For some reason, it would only delete every other node,
  and leave half the nodes untouched.
  Turns out it was because a NodeList can update live
  to reflect the current contents of the DOM.
  Still note sure why it was every other.

  It's not an array, see the [MDN docs on NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

- I should really get Soupault set up.
  (Which means turning my SASS to CSS.)

  Had to use JS to do extra stuff
  that Zola should've let me do at build time.

## 2024-08-09

- i made some character concept art!
  it's cute, simple, and easy to pose/animate.
  ![Sheep and cat 2d art](/concept-art-character-sheep-cat.jpg)
- how did people let apple get away
  with the notch, then the cutout?
  it makes the screen shape awkward,
  and adds very little extra space.
- when treating s-expressions as nodes,
  the top-level is a special node with variable args,
  and the main nodes in your program feed into it.
- also two more draft posts in the works:
  good game checklist, and spaceship security!

## 2024-08-05 Shower thoughts

this might be my shower thoughts place

- you could use hair ties or wrist bands to mark glasses
- s-expression lists are also blocks,
  in the mit scratch sort of way

## 2024-08-05 New log entry!

- had this thought for a while now:

  s-expressions are perfect for visual programming.

  take `(o o o)`.

  `()` is a node.

  each `o` is an input for that node.

  think of blender shader/geometry nodes.

- soupault intro nearly done

  just some small edits, and maybe screenshots left

- should start CSS refactor by using `--var: val` in SASS
  
  ```
  :root
    --highlight: var(--yellow)
  ```

- almost have switch to soupault figured out.

  should write a doc about it.

## 2024-06-24 Theming TODOs

this became all about theming ¯\_(ツ)_/¯

TODO:

toggle post is the easiest,
and might be helpful for future implementation,
but css from sass is also important.
the rest are for down the line.

edit: i wrote the post

- write post on light theme toggle

  see [https://codeberg.org/pranabekka/pages](https://codeberg.org/pranabekka/pages)

  depends on css for core functionality,
  with js fallback where possible.

  check the html template to see how stored theme is loaded.
  refer also to a lobste.rs discussion on implementing dark mode ---
  toastal suggests that the script has to be in the html for that.

  [lobste.rs discussion on implementing dark mode](https://lobste.rs/s/iefspl/notes_on_implementing_dark_mode)

- switch to css from sass.

  css has all the features i need,
  and the built output is cleaner.
  i'm not using any advanced features from sass,
  and knowing css better means working with it.

  also a precursor to adding more themes
  for light mode as well as lower and higher contrast.

- create a light theme

  - add a light theme toggle

    see [https://codeberg.org/pranabekka/pages](https://codeberg.org/pranabekka/pages)

    check the html template to see how stored theme is loaded.

- create themes for different contrasts

  increase default contrast above current minimum AAA compliance,
  add lower contrast colours for `prefers-contrast: less`,
  and higher contrast colours for `prefers-contrast: more`.

  [https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)

  probably have variables for
  `--black-full`, `--black-low`, `--black-high`, etc.

  also add a switch, similar to the light theme one

  consider full black/white toggle for oled screens and e-readers.
  maybe call it "full-contrast".
