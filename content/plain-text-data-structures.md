+++
title = "Plain Text Data Structures"
date = 2023-06-18 20:29:28
updated = 2023-06-18 20:29:28
+++

This is a wild one,
which stems from my education as a visual designer,
as well as a regular terminal user.
The gist my idea is that there are many ways
of representing data in plain text for easy use.
This is especially useful in a terminal based workflow,
but even basic users can adopt some of this in
something like Notepad or any simple text editor.

## An Example

Around two or three years ago,
I had a colleague trying to balance some accounts
and she had a discrepancy between two different reports
of the same accounts.
I helped her by opening Notepad
and just listing down the costs
with each report in a different line.
Then we just had to line up the matching costs
and the odd ones out were easy to pick out.
Here's an example:

```
1050 | 100 | 250 | 320     | 1200 | 3200 | 80 | 20 20 20 |
1050 |     | 250 | 120 200 | 1200 | 3200 | 80 | 60       |
```

Here you can see that some costs
were given as a single entry in one report
but were split into multiple entries in the other,
which made it quite hard to organise.
Furthermore, the ordering of the entries also had to be matched up.
Using this method it was easy to see what was missing,
and she used it later on as well.

## Why Plain Text

You might ask why Notepad, or plain text in general.
The answer is manifold:

- Editors for spreadsheets and rich text documents
  require several seconds or minutes to start up,
  which breaks your flow.
- These editors also bog down slower computers further.
  Especially if you have several reports already open
  on a low-budget work computer.
  This also breaks your flow.
- These editors have complex controls for aligning data.
- Most of their features have no use for you,
  and in fact interfere with your work.
- Monospaced text makes it easier to align and compare data.

Basically, you get everything you need, and nothing you don't.

## Data Structures

### Notes and (Draft/Personal) Documents

When you're just writing down your thoughts,
or a draft of your final document,
write normal paragraphs as continuous lines,
separate paragraphs with a blank line,
and use a marker like '#' or '=' for titles.
You can also use the other data structures in this page,
to represent other kinds of data.

```
# Note/Draft Title

This is a normal paragraph
that wraps across multiple lines.

This is another paragraph, that also continues
across multiple lines.
```

Try out [Markdown](https://www.markdownguide.org/cheat-sheet/),
and [the various applications](https://www.markdownguide.org/tools/)
that can make note taking incredibly fast and easy
across any device that you like.
You can write and view these documents without any special app,
and most of these apps (if not all)
open in the blink of an eye.

### Tables

When representing table-like data,
use a delimiter to separate each column
and a new line to separate each row.
The delimiter can be spaces and/or vertical bars,
like the example above,
or any other character,
such as commas, tabs, colons, and more.
Use spaces or tabs to align the columns properly.

Choose your delimiter character based on
what is least likely to appear in your actual data.
In the above example it was just numbers,
so I used spaces because there's a huge spacebar
to easily add spaces and visually separate the numbers.
If you're going to be using commas and spaces,
try semicolons (";").

### Lists

Use a dash to mark the beginning of each entry,
maybe with a blank line in between.
Indent sub-lists to indicate that they belong
to a parent item.

```
- List Item 1
  - List Item 1.1
  - List Item 1.2
- List Item 2
- List Item 3
```

### Task Lists

Task lists can often benefit from additional information.
Mark done tasks with a '.' to make them less prominent,
or use an 'x' if that feels more intuitive.
Mark important tasks with an '@' or '#' symbol,
simply because they're large and more prominent.

```
- Normal task to do
. Finished task
@ Important task
```

You can add date stamps at the beginning of a task
to indicate when it should be completed,
or when you created it,
or when it was completed.

```
- () No completion date
. (Jan 15, 23) Completed on 15th Jan 2023
@ (Jul 21) Complete by 21st July!
```

Have a look at [todo.txt](https://github.com/todotxt/todo.txt)
for even more ideas and features.
The benefit of it is that there are
a bunch of applications that can
make it easy to manipulate your data across devices.

## Choosing a Representation

Lists are actually very similar to tables.
Take the following table for example:

```
Chef's Special? | Name                     | Spiciness | Description                                   | Cost
No              | Dragon-Glaze Salmon      | Medium    | Sweet and spicy glazed salmon topped with ... | 200
No              | Fried Shrimp             | Low       | Crispy shrimp with cocktail sauce. Served ... | 300
No              | Parmesan-Crusted Chicken | Low       | Grilled all-natural chicken, creamy white ... | 250
No              | Crispy Chicken Tenders   | Low       | Served with coleslaw, seasoned fries and H... | 320
Yes             | Simply Grilled Salmon    | Low       | Seasoned with hickory-smoked sea salt and ... | 500
No              | Fish & Chips             | Low       | Battered golden cod fillets served with se... | 300
```

The descriptions are so long they're basically unusable
(I've truncated them to avoid typing it all),
and some columns take up more space than they need.

Instead, you could represent it like so:

```
Item Name
Chef's Special?
Spice
Price
Description
...

Dragon-Glaze Salmon
-
Medium Spice
200
Sweet and spicy glazed salmon
topped with ...

Fried Shrimp
-
Low Spice
300
Crispy shrimp with cocktail sauce.
Served ...

Parmesan-Crusted Chicken
-
Low Spice
250
Grilled all-natural chicken,
creamy white ...

Crispy Chicken Tenders
-
Low Spice
320
Served with coleslaw,
seasoned fries and H...

Simply Grilled Salmon
Chef's Special
Low Spice
500
Seasoned with hickory-smoked sea salt
and ...

Fish & Chips
Low Spice
300
Battered golden cod fillets
served with se...
```

Here, each row is separated by a blank line,
and each column is separated by a new line.
Empty fields are marked with a simple -,
and additional lines before the blank line
are part of the item description.
You can also use a list,
but this saves you a lot of typing,
because you don't have to add the dashes for each item
and the spaces for indenting item information
(price, description, etc).
In fact, this is a sort of hybrid of lists and tables,
and you can see how one can be transformed into the other.

You can also mix it up with headings:

```
# The Grill

Dragon-Glaze Salmon
-
Medium Spice
200
Sweet and spicy glazed salmon
topped with ...

...

# Drinks
```

Basically, you should think about how you're using the data.

Here's the basic list format, if you were curious:

```
- Dragon-Glaze Salmon
  - Not Special
  - Medium Spice
  - 200
  - Sweet and spicy glazed salmon
    topped with ...
- Fried Shrimp
  - Not Special
  - Low Spice
  - 300
  - Crispy shrimp with cocktail sauce.
    Served ...
...
```

It requires a dash for each row and column,
as well as two extra spaces for each column.
Additionally, it's harder to scan quickly,
because all the items are squeezed up next to each other ---
in the blank line delimited format (tables use delimiters!) 
you just skip to the line after every empty line
to get the name of the item.

## What About JSON, YAML, etc

JSON is too verbose for typing out manually.
In fact, YAML is quite verbose as well.
These are primarly formats for transmitting data,
and are more computer friendly than reading/writing friendly.

If you expect to be using this data in a lot of places,
and you don't want to write a custom parser,
then you can of course go with a more popular format.

## Conclusion

If you're going to be typing out stuff for yourself,
maybe for a small use case,
then try using one of these formats,
and/or even changing them for your own use case.

If you have programming knowledge,
you can also write simple parsers for them,
which will allow you to manipulate them easily
and even export them to other formats.

Learn
[Kakoune](https://kakoune.org),
[(Neo)Vim](https://neovim.io/)
or [Emacs](https://www.gnu.org/software/emacs/)
if you want even more power out of these plain text formats.
They can allow you to _interactively_ transform the data,
instead of writing a parser the traditional way,
and can enhance your general text writing and editing as well.

## Credits

Menu items copied from [How to Make a Better Restaurant Menu (Pinterest)](https://www.pinterest.com/pin/458733912047759557/)
only for use as examples.
