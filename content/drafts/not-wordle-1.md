+++
title = "Ceci n'est pas Wordle devlog part 2"
date = 2023-12-29 10:38:16
updated = 2023-12-29 10:38:16
+++

So I lied.
Welcome to devlog 2 of 1:
how to make your own Wordle.
(even if you're a Javascript beginner)

If you just want something that you can simply edit and share,
then XXXXXXXXX (see devlog 1?).

[Previous devlog](@/not-wordle.md)

Btw, "ceci n'est pas" means "this is not".

Btw btw, this is mostly faff ---
if you really want to see how the
(kinda ugly) broth is made,
then have a look at the source.

## Step juan: the page

Start with a display element,
which is where all the fun stuff will happen,
then add an input below it,
and you're done!
Maybe add some basic instructions, if you want.

```
<div id=display></div>
<input type=text id=guess placeholder="Guess here"></input>
<button>Submit</button>
```

Oh, and a title.

```
<h1>Ceci n'est pas Wordle</h1>

<div id=display></div>
<input id=guess></input>
```

## Step two: make the cells visible

Add a bit of CSS to make sure all your empty cells
don't just collapse into nothing ---
set a width and height for them.

## Step three: sprinkle javascript

Start by setting your word.
We'll go with 'hello' (duh).

Then we have to draw the grid. \
Select your display and make 6 rows
(each row is a guess),
and a cell for each letter of the word.

```
'use strict';

const WORD = 'hello';

const display = document.getElementById('display');

for ( let i = 0; i < 6; i++ ) {
  const row = document.createElement('div');
  for ( let j = 0; j < WORD.length; j++ ) {
    const cell = document.createElement('div');
  }
}
```

(don't forget your 'use strict'*)

\* I don't really know what all it actually does though ---
still learning :p
