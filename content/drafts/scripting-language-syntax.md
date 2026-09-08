+++
title = "Scripting language syntax"
## remember to change date on publishing
date = 2026-09-08 13:22:23 # draft date
updated = 2026-09-08 13:22:23
+++

//

The semantics of a scripting language
are generally agreed upon,
but the syntax could feel nicer.
Something lightweight
borrowed from functional languages.
"Elm-ish" sounds like a fun name.

Define a variable with the walrus:

```
length := 20
```

Mutate a variable with an equal:

```
length = length + 4
```

Define a function with the walrus as well:

```
area x y := return x * y
```

Because text inputs don't preserve indentation,
the language must work without it,
so separate expressions with a comma:

```
area x y :=
	print "Calculating area" ,
	return x * y
```

To close and exit a block,
such as a function body,
use a full-stop:

```
area x y :=
	print "Calculating area" ,
	return x * y
	.

length := 24 .
width := 4 .
label_area := area length width
```

To group expressions,
including function calls,
use round brackets:

```
length := (10 + 10) * 4 .
twice_area := (area length width) * 2
```

`:=` and `=` start a block,
`,` separates expressions in the block,
`(` and `)` group expressions,
and `.` ends the block.

Good bones!
