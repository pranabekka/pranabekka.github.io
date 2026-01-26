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
Whenever we use a type,
we can attach any function from the same module
as long as it applies to that type,
without using any imports or parameters.

For example, I have a module with the type `Bar`:

```
// file: bar.code

type Bar { ... }

fn first_method(bar: Bar) { ... }

fn second_method(bar: Bar) { ... }
```

Here's another module implementing the same functions
with the type `Foo`:

```
// file: foo.code

type Bar { ... }

fn first_method(foo: Foo) { ... }

fn second_method(foo: Foo) { ... }
```

Here's how I'd use the types and their functions
in a different module:

```
// file: main.code

import bar.Bar
import foo.Foo

pub fn main() {
	let one = my_fn(Bar{...})
	one.second_method()
	
	let too = my_fn(Foo{...})
	too.second_method()
}

fn my_fn(var: any) {
	...
	var.first_method()
	...
}
```

I had no need to explicitly import
or pass around `first_method`;
only prefix it with the variable name.

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

Trying to use the function
without the value before it
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
plus we can still just do `import module.*`.
If we wanted to import and use
the same function name for different types,
we can have the language allow those imports
as long as the function signature is different.

```
import foo.{Foo, to_string}
import bar.{Bar, to_string}
import baz.*

pub fn main() {
	to_string(Foo{...})
	to_string(Bar{...})
	to_string(Baz{...})
}
```

There's still one issue with this.
Let's say you have an external module
with a function that expects a type
with the "method" `external_method`,
and an external type that doesn't have `external_method`,
then you'd need to wrap the external type,
in order to bundle `external_method` with the type.

```
// ##### file: main.code #####

import foo.expects_dothing
import bar.ExternalType
import baz.external_method

pub fn main() {
	let var = ExternalType{...}
	
	// Error: ExternalType does not bundle external_method
	expects_external_method(var)
}

// ##### file: baz.code #####

pub fn expects_external_method(var: any) {
	...
	var.external_method()
	...
}
```

One way to go about this is to simply disallow
public functions from using interfaces on unknown types.
This means libraries must use parametric polymorphism
and application code can still benefit
from ad-hoc polymorhism.

If we really wanted to, though,
we could perhaps attach functions to types
using a `with` keyword or something similar,
with the option to use it in function signatures
to specify the expected interfaces.

```
// ##### file: main.code #####

import foo.expects_external_method
import bar.ExternalType
import baz.external_method

pub fn main() {
	let var = ExternalType{...}
	
	expects_external_method(var with external_method)
}

// ##### file: baz.code #####

// could specify interface in function signature
// as `(var: any with external_method)`
pub fn expects_external_method(var: any) {
	...
	var.external_method()
	...
}
```

I think it might be better to restrict
ad-hoc polymorphism to private functions in app code,
but we do have the option to put it everywhere,
and so that solves all our problems
without any classes, interfaces or newtype issues.
