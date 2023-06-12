+++
title = "Function Design Recipe"
date = 2023-05-11 12:36:29
updated = 2023-05-11 12:36:29
+++

How to Design Programs (HtDP)
specifies a simple method of designing programs,
called a recipe,
which they call the Function Design Recipe,
introduced in the preface.

It's a fairly simple practice,
and it helped me hammer out some 2048 code
that I've been chipping away at off an on for several months.
One help is my growing familiarity with the language, of course,
but the function recipe did a lot of work
in clarifying the design
and letting me know how and where to put my efforts.
This [video (YouTube)](https://www.youtube.com/watch?v=1SlGgCxJa3w)
presents a story of why it is useful
in a broader example.[^1]

You can find it at [htdp.org](https://htdp.org/2023-3-6/Book/part_preface.html) [^2].
I recommend you go through the book if you're
a new or intermediate programmer.
The preface is a good place to start.

## The Recipe

NOTE: This is not strictly the recipe.
I've borrowed basic ideas from it,
and managed to use it quite successfully.

The first step is to figure out the shape of the data
that you'll be working on.
You're recommended to do this using comments.

The next step is a signature and description
of the primary function and its purpose.
The signature says what inputs it requires,
and then what kind of output it spits out.
You can model this as simple data types,
also using the comments.
The purpose follows right after,
stating what the function is meant to do.

Then you create a template of the function,
based on the signature,
also using comments.
Feel free to use `...` for unknown parts.
My templates simply had a function name
and a list of arguments.
The tests will be run later to verify your code.

The next step is to write some tests for the code.
Write down the test input and the expected output using code.
Think of some edge cases and what their output should be.
These tests will be executed later to validate the program.
I skipped these for my 2048 code
because the game uses random input,
which is easier for me to test visually
than to write test cases for,
especially at the scale I'm working on.
It's probably a good habit though.
I might try to write tests further along,
with more complicated tests to check the random input.

Finally, you flesh out your template into complete code
and then run your tests on it.
This step took some time,
because I had to look up documentation
and play around with some functions
to see how they might suit my needs.
This is partially because I like to work without the internet,
in order to increase my capability of working offline,
with just the repl and the documentation.

As I mentioned above,
this is my loose interpretation of the steps,
meant to provide a gist of how it works.
Please reference the [book](https://htdp.org) if you're interested
--- click on the book title to open the index. [^2]

## Footnotes

[^1]: The idea is to take things step by step.
At the level of the team in the video
the steps are on a grander scale,
but at the level of beginners
it's very useful to follow the steps
of the Function Design Recipe.

[^2]: The book seems to be updated with some frequency.
If you see the URL, you'll see `2023-3-6`,
which suggests it was updated on 6th March 2023.
I recommend starting at [htdp.org](https://htdp.org)
and clicking the book title to open the index,
so that you have the latest edition.
