+++
title = "Objects is modules <!-- cuz -->"
## remember to change date on publishing
date = 2026-01-27 19:33:36 # draft date
updated = 2026-01-27 19:33:36
+++

Makin' methods from plain ol' funcs, no interface.

Just import functions for a type as methods on it
when the module is imported.
That's what the other systems are doing
--- objects, interfaces, traits, what have you.

Let's say I have a module `foo`:

```
pub type Bar { ... }

pub fn new_bar() -> Bar {
	...
}

pub fn bar_func(bar: Bar) -> Bar {
	...
}
```

Here's how I can use it:

```
import foo

pub fn main() -> Nil {
	let my_var = foo.new_bar()
	
	// Call as method
	my_var.bar_func()
	
	// Call as plain ol' func
	foo.bar_func(my_var)
}
```

Probably change method syntax
to not look like a variable field or module access,
but yeah, we've made methods with plain ol' funcs.
Everything works the way you like,
but with less boilerplate.

```
import foo
import baz

pub fn main() {
	foo.new_bar()
		::bar_func()
		::mo_func()
		::een_mo_func()
}
```

```
// baz.file

import foo.Bar

pub fn mo_func(bar: Bar) -> Bar {
	...
}

pub fn een_mo_func(bar: Bar) -> Bar {
	...
}
```
