+++
title = "Objects are modules are objects"
## remember to change date on publishing
date = 2026-01-26 13:54:18 # draft date
updated = 2026-01-26 13:54:18
+++

Resolving the expression problem
without interfaces and newtypes.

Objects allow bundling functions with a type,
and using the type as a qualifier to use them,
which means passing the type to any function
also passes along the function,
without having to create a parameter for it.
This makes it easy to create a new type
and swap it in without changing anything else.
This is the one benefit
that's unique to objects and interfaces.

We can instead emulate them by
automatically bundling associated functions in a module.
Any function in the same module as the type
that also applies to the type
is used automatically when added after a type,
without requiring separate imports or parameters.

For example, I have a module with the type `Bar`:

```
// file: bar.code

type Bar { ... }

fn first_method(bar: Bar) { ... }

fn second_method(bar: Bar) { ... }
```

Here's how I'd use the type in a different module:

```
// file: main.code

import bar.Bar

pub fn main() {
	let my_var = Bar{...}
	my_var.first_method()
}
```

I had no need to explicitly import `first_method`;
only prefix it with `my_var`.

We can also use pipe syntax instead,
so that the function isn't disguised as a property.

```
// file: main.code

import bar.Bar

pub fn main() {
	let my_var = Bar{...}
	my_var |> first_method()
}
```

Trying to use the function before the type
would cause an error.

```
// file: main.code

import bar.Bar

pub fn main() {
	let my_var = Bar{...}
	// Error:
	first_method(my_var)
}
```

We would have to qualify the function name,
or import it explicitly.

```
// file: main.code

import bar.{Bar, second_method}

pub fn main() {
	let my_var = Bar{...}

	// Qualified function name:
	bar.first_method(my_var)

	// Imported explicitly above:
	second_method(my_var)
}
```

These automatic imports would supersede
functions with the same name and type
that come from other modules.

```
// file: main.code

import bar.Bar
import external.first_method

pub fn main() {
	let my_var = Bar{...}
	
	// always uses bar.first_method
	// because it's from same module as Bar type
	my_var |> first_method
	
	// uses external.first_method
	// because bar.first_method isn't imported
	first_method(my_var)
}
```

If that feels wrong, like it could cause bad surprises,
we could have the language create a conflict
if we attempt to import such functions from an external module
and require that they be aliased to something else.

```
// file: main.code

import bar.Bar
import external.{first_method as bar_func}

pub fn main() {
	let my_var = Bar{...}
	
	my_var |> first_method
	
	bar_func(my_var)
}
```

This also takes care of the newtype pattern,
because implementing an external interface
for an external type
just means writing a function for it.

Functions from external interfaces aren't
resolved automatically,
but that's only true of languages
that use interfaces instead of objects,
and even for those,
I believe it's nicer to see where exactly
you're importing functions from,
instead of importing a bunch of interfaces
that magically pull in arbitrary functions.
If we wanted to import and use
the same function name for different types,
we can have the language allow those imports
as long as the function signature is different.

```
import foo.to_string
import bar.to_string

pub fn main() {
	to_string(foo.Foo{...})
	to_string(bar.Bar{...})
}
```
