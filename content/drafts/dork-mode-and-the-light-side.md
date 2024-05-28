+++
title = "Dork mode and the light side"
## remember to change date on publishing
date = 2024-05-26 04:04:23 # draft date
updated = 2024-05-26 04:04:23
+++

<!--
prolly take out yo mama
NO! I REFUSE!
-->

A note on theming with dark and light mode in CSS.

If this is new to you,
you should probably watch Kevin Powell's
(YouTube) video on "Whatnot".
90% of this post is from there,
even though I've known of it all
at some point or the other.

[A simple mistake that can
screw up your light/dark theme
(and how to fix it)
by Kevin Powell (YouTube video)](
https://www.youtube.com/watch?v=zFFuV_vXNhY
)

## Summary for me

`color-scheme: dark` will handle colours
for extra bits like form controls,
without having to look up the `moz` and `webkit` selectors.

### Note for you

I stick to dark mode for personal projects
because it's easier to handle just one theme,
and I'm a regular night owl
who hates opening a bright white page.

## The browser has its own stylesheet

And it doesn't listen to the system theme.

Browser stylesheets usually come through in forms and controls,
like buttons, input boxes, number input controls, etc.

Use the `color-scheme` property
to make it listen to the system theme:

```
html { color-scheme: dark light; }
```

If you want to just make it dark,
set it to `dark`,
and if you want to make it light (the default),
set it to `light`,

```
/* for dork mode */
html { color-scheme: dark; }

/* for light mode */
html { color-scheme: light; }
```

I assume this is because of compatibility:
browsers had to add some default styling,
and they never knew dork mode would be a thing.
Web pages then started depending on this (light themed style),
and now browsers can't automatically make it dark,
so web pages must tell the browser
which `color-scheme`s are acceptable.

I find it easier to use `color-scheme` for little details
like the up-down arrows for number inputs.
Bigger projects and vibrant colours
will probably have you styling browser components
to match your colours.
Look for CSS selectors like `moz` and `webkit`.

## Your mother

In the voice of argentima (Valorant, YouTube).

Something's wrong with me.
Also, it's 4am.
Something's wrong with me anyway.

Do I watch to much YouTube? (Yes.)

## `prefers-color-scheme`

```
@media (prefers-color-scheme: dark) {
  your-element {
    /* dork mode css */
  }
}

@media (prefers-color-scheme: light) {
  your-element {
    /* light side css */
  }
}
```

As shown above, you can detect
what colour scheme the user has chosen,
which is shared by the browser [^1], 
based on the user's system or browser settings.

[^1]: Even though it doesn't listen to itself ;)

Use it to change properties directly,
or just colour variables.

## An additional note

Kevin's video also mentions some interesting interactions
between the two systems,
which allows you to implement an easy mode switcher.
Video:

[A simple mistake that can
screw up your light/dark theme
(and how to fix it)
by Kevin Powell (YouTube video)](
https://www.youtube.com/watch?v=zFFuV_vXNhY
)
