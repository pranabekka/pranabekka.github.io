+++
title = "Significant Whitespace Lisp Syntax"
date = 2023-07-11 04:39:16 # draft date
updated = 2023-07-11 04:39:16
+++

I was browsing the web when I came upon
the Rhombus language by the Racket team,
and I couldn't help but have
a few thoughts of my own for a Lisp syntax
with significant whitespace.
The key difference in my idea
is that it works quite transparently with s-expressions,
and has some extra sugar and rules
to help with parentheses elision.

NOTE: Some knowledge of Lisp is assumed.

NOTE: Elision (removal) rules only mean that there are ways
for the computer to infer the position of parentheses.
You can still use parentheses, as demonstrated later.

## Function Calls

The first word (symbol) in a line is a function call,
and the rest are arguments, subject to variable expansion.
This is an example of parentheses elision:
you can elide (remove) the parentheses,
since their position is inferred
at the beginning and end of a line
(not quite, see next point).

```
my-func arg1 arg2

; turns into:

(my-func arg1 arg2)
```

## Sub-Expressions/Blocks (Functions as Arguments)

An indented line starts a sub-expression
in the form immediately above it in the "indentation hierarchy".
So the automatic placement of parentheses
is slightly more complicated ---
if the next line (expression) is indented,
then the closing parenthesis is held off
until a line with less indentation is encountered
(or the end of the file).

```
fun1 arg-x
  fun2 arg-n

; turns into

(fun1 arg-x
  (fun2 arg-n))
```

```
fun3
  fun4
  fun5

; turns into

(fun3 (fun4) (fun5))
```

## Inline Syntax

The above rules with significant whitespace
might also be called "block syntax",
since it necessarily requires blocks
that span both dimensions.
The parentheses syntax may also be called "inline syntax",
since it can be written in a single line
without changing the meaning
(although it severely impacts readability).

The two syntaxes can be mixed together
to create more complicated forms.

```
let (
    variable value
  )
  my-fun variable

; turns into

(let (
    (variable value)
  )
  (my-fun variable))

; which is the same as

(let ((variable value))
  (my-fun variable))
```

(You need not write it as shown above.)

The following also achieves the same thing:

```
let (
    variable value )
  my-fun variable
```

## Sugar: `[]` (for List of Lists)

To help create a list of lists,
there will also be a `[]` reader macro
(used like a function)
that wraps its arguments into a list.

```
let
  []
    variable value
  my-fun variable

; turns into:

(let
  (
    (variable value))
  (my-fun variable))

; which is the same as:

(let ((variable value))
  (my-fun variable))
```

Here's another example with a lambda.

```
[]
  lambda (x)
    func x
  arg1

; turns into:

(
  (lambda (x)
    (func x))
  arg1)

; which is the same as:

((lambda (x) (func x)) arg1)
```

## Splitting Arguments Across Lines

If you must split arguments into multiple lines,
a "splice" (reader) macro is available.
(Another name might be more suitable,
given the pre-existing splice macro
--- in Common Lisp, at least.)

```
my-func arg1 arg2 arg3
      @ arg4 arg5 arg6

; is equivalent to

(my-func arg1 arg2 arg3
         arg4 arg5 arg6)
```

Without the "splice" macro
it would try to call `arg4` as a function
with the arguments `arg5` and `arg6`.

<!--
You can also mix up the `[]` and `@` macros.

```
[]
  @ item1 item2 item3
  @ item4 item5 item6

; turns into

(item1 item2 item3
 item4 item5 item6)
```
-->

## Infix Syntax

While this goes a long way towards
making lisp more palatable for some people,
(maybe even appealing)
there are two places where
programmers from other languages expect infix syntax.

### Math

The first place infix syntax is often used is for (simple) math,
for which the `$` macro is provided.
The `$` symbol was chosen because
it is used for indicating math in markup languages
like LaTeX, Typst, and Kramdown
(a feature-ful flavour of markdown).

```
$ 1 + 2 + var / 7

; turns into:

(+ 1 2 (/ var 7))
```

### Comparison

The second place where other languages use infix syntax
is for comparisons in conditionals and loops.
The `check` or `?` macro can be used for this.

```
? my-var != your-var

; turns into:

(? my-var != your-var)

; which is the same as:

(not (eq my-var your-var))
```

Maybe infix math could also be allowed here?
--- just to make things easier
for the kinds of people this syntax might appeal to.

## Benefits Over Other Significant Whitespace Syntaxes

This syntax might even be more appealing to some people
over other syntaxes with significant whitespace
for several reasons.

- Only spaces to separate arguments.
- Only spaces to separate function from arguments
- No colon for indented blocks
- Consistent syntax (for both block and inline)

Getting rid of commas means that
you no longer need to balance them.
Lots of recent languages have taken to
allowing trailing commas just to deal with that issue.
Having no commas makes it easier to move things around.
Furthermore, commas repeated the work
that spaces were already doing.
If whitespace is significant,
then you might as well lean into it.
Signifcant whitespace ++.

All languages (that I know of)
treat the first word as a (special) function call,
and the rest are just keywords or arguments
for that function call,
so the surrounding parentheses for the arguments
are largely unecessary.
The command-line does this beautifully.
We have now rid ourselves of all the superfluous parentheses
(that a host of other languages also have, might I add),
and made whitespace even more significant.

In Python, a colon is required at the end of some forms
like `if`, `else`, and `for`.
This is despite the fact that
the content of these forms is already indented.
So the colon is repeating work
that is already being achieved by indentation.
Furthermore, having tried some Python,
I know for a fact that I would get
annoying syntax errors for missing a colon in various forms.

This syntax also has very simple and consistent rules,
such that even if they are not explicitly mentioned,
a user should get a grasp of them
much sooner than other languages
that have special forms and exceptions of all kinds.
Essentially all language features reduce to
"functions" and lists describing various things.
(I say "functions" in quotes,
because there are special functions and macros as well.)
Only Lisp syntax is simpler and more consistent.

## Conclusion

We have a syntax with (even more!) significant whitespace,
consistent rules, infix syntax and easy inline syntax,
that should be more palatable to users of other languages,
and easy for existing Lispers to learn and share.
It might even reduce strain on Lispers' pinkies.
