+++
title = "UI/UX Design Principles"
date = 2023-11-07 14:52:17
updated = 2023-11-07 14:52:17
+++

Some of the choices behind most of my designs.
I can sometimes sacrifice these, based on context,
but I adhere to them most of the time.

## Mobile first

Most users of any digital product are on mobile.
Especially if it's a website ---
even users of a desktop application
will visit a website on mobile.

Designing for mobile also helps figure out
what is most important in a product.

Also, it's easier to spread out content
from a mobile layout to a desktop layout,
than to try to fit in the contents of
a desktop layout into a mobile screen.

### Interactive area in lower half

Having interactive elements in the top half
requires users to move a hand to the top of the phone,
or to make awkward reaches with their thumb.

Instead, I put buttons
at the middle of the screen or lower.
If the user scrolls down,
buttons will also move up the screen.

## Large fonts

I use large fonts to accomodate for
conditions with hampered vision,
such as age, moving vehicles, walking, etc.

This usually means 14pt or 16pt for body text.

## Clear labels

Icons can often have multiple meanings,
which might not be obvious to some users,
or might even have no meaning to some people.

## Large interactive areas

I make interactive areas roughly 44 pixels by 44 pixels or larger,
usually with a minimum of 8 pixel gaps between them.

This makes it easier to target for users,
without accidentally selecting the wrong element.

## Consistent interactive element style

I try to have a distinctive style for buttons and links
so that users immediately know
what elements can be interacted with,
and what elements are safe to select.

Modern UIs nowadays often have a dozen different button styles,
some of which even look like plain text.
It sometimes feels like there is no system
for what constitutes a button versus images or text.

## Dark mode

Using a website at night time, or in a dark environment,
shouldn't subject the viewer to (sudden) brightness,
which can negatively affect
their vision, their sleep, and more.

For the same reason, I try to use warm colours[^1],
though people generally expect blue for interactions,
and red for negative interactions.

[^1]: Night light filters do the same,
because of something to do with white or blue-ish colours.

### Slightly lowered contrast

100% white text on a 100% black background
can cause a "halation" effect for some users,
which means it looks like a light pointed at your eyes,
where the edges are blurry and hard to see.

There might be some other issues with full contrast,
but this is a good enough reason to lower it.

## Lightweight

Websites should be usable with low network conditions,
such as being underground, or in a building.

This can be achieved
by only including necessary content,
and optimising images and videos.

For images, I compare file sizes for different formats.
Generally, I use SVGs for simple graphics and illustrations,
and PNGs or JPGs for photographs,
though the AVIF format is supposed to be the best.

A related idea is progressive enhancement,
where you ensure a basic version of the main content
is actually usable as is,
and then build better UI/UX on top of that.
This requires some understanding of HTML,
and interacting with the developer.

## Content first

The content of the page should stand out.

You can see it in my site design:
in each page, the title is highlighted,
and then it continues on into the body of the post.
I even sacrificed the navigation bar on top
so that the content had more space/prominence
when the user first loads a page.

## Clarity over cleverness

I try to avoid clever designs,
because some users will simply be confused.
For example, it's not really that obvious
that you must scroll up (on mobile)
to show a hidden navigation bar.

## Design Annotations

On screen buttons aren't the only method of interaction.
Keyboard shortcuts and touch gestures
are not obvious from designs.
Designs should include annotations for these things.

While I don't actually annotate things,
that's mostly because of no particular need,
and I do consider them and explain them in writing.

## Accessibility for everyone

This ties into many of the points above:
Everyone has "disabilities" of some variety
at one point or the other.

Injuries can reduce dexterity in the hands,
moving vehicles can hamper vision and reading,
and crowded environments impact hearing.
