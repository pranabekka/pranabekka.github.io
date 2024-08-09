+++
title = "Log"
date = 2024-06-24 15:52:46
updated = 2024-08-05 19:14:38
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
  refer also to https://lobste.rs/s/iefspl/notes_on_implementing_dark_mode ---
  toastal suggests that the script has to be in the html for that.

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
