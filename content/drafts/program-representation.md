+++
title = "Program representation"
## remember to change date on publishing
date = 2024-12-30 20:21:16 # draft date
updated = 2024-12-30 20:21:16
+++

To enable easy collaboration between visual coders and text coders.

---

Take the following text representation:

```
(make-command greet [name]
	(write "Hello, {name}.")
)

(greet "Pranab")
```

## S-expressions

This text representation is known as an s-expression.

- The program is represented as lists and sublists.

- There are two types of lists:
a command list, and an information list.

- Command lists give commands to the computer,
and information lists describe
details you want the computer to remember.

- List items are separated by spaces,
unless the spaces are within quoted text (`"quoted text"`).

- A command list begins and ends with parentheses (`()`).

	- The first item in a command list is a command to the computer.
	In this code, `make-command`, `write` and `greet` are commands.
	
	You might know commands as functions,
	which is a term borrowed from mathematics.

	- The rest of the items in a list are details
	that the computer needs to know
	before performing the command.
	
	  The `write` command needs to know
	  the text it needs to write.

- An information list begins and ends with square brackets (`[]`).

  We use commands to manage this information ---
  such as `save-file` and `open-file`.

## Code breakdown

Here's another look at the code
so that I can explain what it does.

```
(make-command greet [name]
	(write "Hello, {name}.")
)

(greet "Pranab")
```

- First, we create a new command.

  ```
  (make-command greet [name]
  	(write "Hello, {name}.")
  )
  ```

  - `make-command` is a command for defining new commands.
  Other items in this list represent information needed by it.

  - `greet` is the name of this new command.

  - `[name]` is a list of details the new command needs.
  The new `greet` command only needs a name.

    When we command the computer to greet someone,
    we give it a name.
    In our code, the name we give is "Pranab".

  - `(write "Hello, {name}.")` is another command
  that needs to be performed as part of
  the new `greet` command that we're defining.

  - The `write` command will replace `{name}`
  with the name given to the `greet` command.

    In `(greet "Pranab")` we give the `greet` command
    `"Pranab"` as the only information.
    The first (and only) information expected
    by the `greet` command is called `name`.

    So if I command the computer to `(greet "Pranab")`,
    the `write` command will replace `{name}` with "Pranab"
    and write "Hello, Pranab."

    If I command the computer to `(greet "you")`,
    the `write` command will replace `{name}` with "you"
    and write "Hello, you."

- At the end of the code,
we use the new `greet` command that we created.

  ```
  (greet "Pranab")
  ```

For reference, here's all the code again:

```
(make-command greet [name]
	(write "Hello, {name}.")
)

(greet "Pranab")
```

## Representation

The above code is functionally equivalent to the following:

```
(make-command greet [name] (write "Hello, {name}."))

(greet "Pranab")
```

Let's represent that in a few different ways.

image of a coloured s-expression

## Benefits

people can code in the way that makes sense to them.
coders can use a visual editor to manipulate code
at the level of its structure instead of its text.
no more missing commas and semicolons.
coders with highly personal workflows
can continue using their existing tools and workflows.
beginners can use visual coding to avoid confusing syntax errors,
like missing parentheses,
and focus on the application they want to create.
visual coders and text coders can easily collaborate.
one can write text and the other can use a visual editor.
they can learn each other's tools with minimal fuss.
they won't have to struggle to understand
the contents of the other's screen.
