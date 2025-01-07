+++
title = "Listy"
## remember to change date on publishing
date = 2024-09-03 02:00:32 # draft date
updated = 2024-09-03 02:00:32
+++

A beginner's programming language.

In the sense that I'm a beginner in programming.
But also in the sense that I hope it's easy for beginners.

S-exps with whitespace.
Imperative programming.

expected to have some programming knowledge
a separate tutorial style thing could work better
for newer programmers
plus a gradual introduction would be nice to write

this is basically design notes

## Syntax

S-expressions yer mama.

s-exps provide an incredibly simple syntax.
there's a "function" and its arguments.
everything is just that.
you don't need to remember all the different symbols
and how they fit in with each other.
now you can focus on the language.

at the same time,
managing parens can get tedious
and turn people off even otherwise.
this is mainly a "marketing" problem,
yet perceived familiarity is a valid concern.

given how popular python is
significant whitespace syntax can do well.
look also at godot.
they deprecated their visual programming
because people were so comfortable with gdscript,
which has python-like syntax.

listy syntax is mostly inspired by wisp,
but deviates from sexps/lisps a little more.

```
function arg arg arg

def 'me : trim " Pranab    "

# greet takes a string and returns a string
type-of greet ': (string) (string)
def-fn greet : name
  print : concat "Hi, " name "!"
  
greet me
```

comparison:

```
function(arg, arg, arg);

me = " Pranab    ";
trim(me);

fn greet(name: string) -> string {
  printf("Hi, {{name}}!");
}

greet(me);
```

## Semantics

gradual learning curve

### imperative

while there's room for functional things,
it's often too abstract for me.

imperative programming just makes more sense,
even if it can make state management harder over time.
good programming practices should help.
plus you could build functional over imperative.

### No objects

In the last few weeks
objects have started making a little more sense to me,
but they still seem very complex.

they seem to require an unecessary amount of ceremony.

also, if you go with composition over inheritance,
you can achieve the same thing with types,
which make more sense to me.

I still don't quite get the rest of oop,
so i can't address those.

### functions as values

maybe my lisp experiments help here,
but having functions as values makes sense,
plus they enable so much

### Types

static, with inference.

probably have type manipulation like idris?

this is something to adopt gradually.
you can start with using primitives,
despite what some articles say.

then you can slowly refine your types
and eventually do idris-style advanced type manipulation.

i'm pretty sure you can express everything with static types.

### no variadic args

pass an optional array.
easier to reason about deconstructing an array
than magically having it done
and adding/remembering the extra syntax for it

### keyword args?

imagine a function for creating a rectangle.
it takes in 4 numbers for
x position, y position, width, and height:

```
make-rect 0 0 10 20
```

note: use quoting for symbols (`func 'key value`),
instead of special :keyword syntax

with keywords:

```
make-rect :pos-x 0 :pos-y 0 :width 10 :height 20
```

reasons not to include:

- expressing is tedious and verbose,
- types generally address the same issues,
- this specific api (making a rect) is quite established
  in terms of argument order
- editor tooling makes it fully obsolete
- adds extra syntax/complexity

there's one way to make keyword args less tedious ---
if the variable name matches the argument name,
you can remove the argument name,
and the variable will be passed to the correct argument:

```
def-fn keyword-func : arg1 arg2
  # do things

keyword-func :arg1 val1 :arg2 val2

def arg1 something
def arg2 something-else

keyword-func arg1 arg2
# expands to `keyword-func :arg1 arg1 :arg2 arg2`
```

types also have the benefit of being easily applied
in multiple places.
you can define a url type and use it in multiple places.
a nominal type can be basically the same as keyword args,
and you can refine the type over time.
for the make-rect example:

```
def-type position ': x y
def-type rect-size ': length length

def-fn make-rect ': :pos position :size rect-size
  # ...

make-rect '(0 0) '(10 20)
```

you could still mess up order, but it's harder, right?
okay, maybe keyword args still have the upper hand here
but the points at the beginning still apply

you could also use comments if it's really that helpful

```
make-rect #(x) 0 #(y) 0 #(w) 10 #(h) 20
```

slightly more verbose than keyword args with 0 extra syntax
plus you don't have to define which args
are keywords args in the function definition

### references

felt the use for it in javascript.
using objects/arrays for refs felt like such a hack.

### Garbage collection

The rewards of manual memory management
don't outweigh the costs for me.

I'd have progressed much further with programming
if I didn't buy into the discourse against GC.

if it's possible to fit lifetimes and manual mem mgmt,
such that you could dive into it for perf critical stuff,
that would be great,
but delegating to rust/zig/c is also cool.
i know common lisp has interesting low-level facilities,
including defining memory layout (for objects, at least).

copy on write stuff

### Tooling

A uniform and well-enforced style guide.

A fast and incremental compiler.

decentralised package registry like go (and rust?)

maybe a repl like cl/scheme

language server, editor support

visual/structural programming
with blocks and nodes

### effects and capabilities

they're basically "tokens" that are passed down
from the main program to functions
including library functions

haskell passes effects through the type system,
and capabilities are quite similar
though often more fine-grained

essentially, the main "top-level" possesses full capabilities
to do things like read and write files, and make network calls.
this can be limited by passing custom flags
to the compiler/interpreter.
anyway, the top-level can pass it on to functions
through the type-system
ah, maybe limit it to the main function
so main function can request capabilities

### macros?

probably not common lisp style ones,
or lock it somehow with unsafe or other tooling.

scheme's safe macro api could be nice.

could try nim-style macros,
though i have no idea about it, actually.
just saw a complicated snippet
that seemed to manipulate nodes.
looked like it had more info about the code
than raw lisp macros,
which might've been manipulating semantics over syntax.

how do rust macros work?
ocaml macros?
sml macros?

### common lisp condition system?

might be too complicated?
i don't actually know it much.
just heard of it here and there.
basic error types like rust/gleam could be enough

the other end option is go style errors,
but i'm convinced nil is a problem,
and that making it inexpressible is important

result and option types

### text, not string

### closures

it's intuitive enough.
you just pack values into a function

## The language

def/define

loops

pattern matching

types

ref type
