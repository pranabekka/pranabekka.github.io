+++
title = "Rust to reference inference"
## remember to change date on publishing
date = 2026-02-01 19:55:00 # draft date
updated = 2026-02-01 19:55:00
+++

Evolving a new high-level language from Rust.

I'm going to be describing a "borrow inferrer",
and I'm going to call it Airy
because it's high-level, everwhere in the language,
and shorter and clearer than "the reference inferrer".

## Begin

So, I realised a while back that pipes
in functional languages like Gleam
require functions to return values,
but I didn't really know where that would go,
and then several weeks after that
looking at Rust's move syntax
suddenly sparked my imagination.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

It looks so nice and clean,
like a high-level language!
There's no borrow annotations at all.

<!--
The problem, of course,
is that Rust functions are designed with `&mut`,
where they perform mutations "in-place",
with a convention of returning references
to the mutated variable for chaining.
-->

## Mutation by assignment

When used like this,
moves are basically just mutable borrows,
so Airy removes `&mut` completely
and uses assignment syntax for all mutations.
Where Rust moves a value in and back out,
Airy uses mutable borrows.

```
// `mut point` in Airy is similar
// to Rust's `mut point` and `&mut point`.
fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x
	point.y = point.y + by.y
	point
}
```

Because we're assigning the result back to `point`,
the mutation is obvious even without
separate `&mut` annotations.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 3, y: 3 }
}
```

If we ignore the return value of a function,
then it won't affect any variable in the caller,
so Airy will generate a warning for it.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	// WARNING: Return value of `offset_point` is ignored.
	offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 1, y: 1 }
}
```

## Mutation by return

Functions receive parameters for reading or mutating.
If they take a parameter for mutating,
they have to return it for it to take effect,
similar to moving ownership in and out.
If we didn't return a mutated variable,
then there would be no reason to call the function,
so Airy will create an error if it's not returned.

If we don't want to return a parameter,
it would have to be an immutable parameter,
and if we wanted to mutate it,
our function would need its own copy,
or a new temporary value.

```
fn print_offset(point: &Vec2, by: &Vec2) -> Nil {
	// Copying to a new variable
	let mut new_point = point.clone();
	new_point.x = point.x + by.x;
	new_point.y = point.y + by.y;
	dbg!(new_point);
	
	// Using a new temporary value
	dbg!(
		Point(
			point.x + by.x,
			point.y + by.y
		)
	);
}
```

Creating a new variable is pretty explicit,
so Airy can remove the need for also calling `clone()`,
but I'll address that later.

## Immutable borrows

We've taken care of mutable borrows,
but we still have to clone variables to reuse them,
since Rust moves ownership.
For example, we need to clone `offset` to use it again.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	let offset = Vec2 { x: 2, y: 2 };
	main_point = offset_point(main_point, offset.clone());
	dbg!(main_point);
	dbg!(offset);
}
```

We could change the second parameter of `offset_point()`
to use a mutable reference instead of needing ownership.
It was only using it to see the values anyway.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, &main_point);
	dbg!(main_point);
}

fn offset_point(point: mut Vec2, by: &Vec2) -> Vec2 {
	point.x = point.x + by.x
	point.y = point.y + by.y
	point
}
```

That looks good enough,
but even newly created and independent values
would need to use borrows.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, &Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

It's honestly not too bad,
but we're having to manually manage references.
Instead, Airy makes parameters
use immutable borrows by default,
which means that `by` is an immutable borrow
in `offset_point()`.

```
fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

Airy can then infer immutable borrows
if there's no mutable borrows of the value,
which is impossible in this case,
because we're constructing a temporary `Vec2`.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

Inferring immutable references allows us to
reuse variables even after supplying them
as function arguments.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	let offset = Vec2 { x: 2, y: 2 };
	main_point = offset_point(main_point, offset);
	dbg!(main_point);
	dbg!(offset);
}
```

## Clone inference

At this point Airy completely removes
the need for all borrow annotations,
but that still leaves some clone annotations,
because just like Rust,
Airy doesn't allow any more borrows
while there's a mutable borrow.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point.clone());
	dbg!(main_point);
}
```

Instead of requiring a `clone()`,
Airy can see that `main_point`
is already borrowed mutably
as the first argument to `offset_point()`,
so the only way to reuse `main_point` in the same call
is to clone it for the second argument.
In that case, Airy can just do the clone
instead of forcing us to add it.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point);
	dbg!(main_point);
}
```

The same applies when assigning to a new variable.
In the example below,
`main_point` is being reused after the `new_point` declaration
so the only way to use it in `offset_point()`
is to clone it into `new_point` and pass that
into `offset_point()` by reference,
and create a second clone for the immutable borrow.

```
fn main() -> Nil {
	let main_point = Vec2 { x: 1, y: 1 };
	let new_point = offset_point(main_point, main_point)
	dbg!(main_point); // Vec2 { x: 1, y: 1 }
	dbg!(new_point);  // Vec2 { x: 2, y: 2 }
}
```

## Unique ownership

While I just said the only option is a clone
for the immutable borrow by `offset_point()`,
Airy can actually use a second borrow there,
because `offset_point()` uses the `by` parameter only once,
after which it will never be used again,
meaning that the reference to `by` is unique,
like moving ownership in Rust.

```
fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

Because Rust requires explicit borrows,
it would need a separate function
to offset by self without cloning.

```
// NOTE: Temporarily interrupting
// our scheduled Airy evolution
// with a bit of Rust.

fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	// Notice the call to `clone()`.
	main_point = offset_point(main_point, main_point.clone());
	// No need to clone, but we had to create a new function.
	main_point = offset_by_self(main_point);
}

fn offset_by_self(point: Vec2) -> Vec2 {
	point.x = point.x + point.x;
	point.y = point.y + point.y;
	point
}
```

Alright, back to Airy.

## Partial borrows

Airy can also perform partial borrows,
where it can borrow parts of a variable
instead of cloning the whole thing.
In the following example,
`offset_x()` takes a mutable borrow of `main_point`,
so Airy shouldn't allow a second borrow
for the second argument.
However, Airy can see that `offset_x()`
only mutates field `x` and never touches field `y`,
so it's safe to pass in `main_point`.

```
fn main() -> Nil {
	let mut point = Vec2 { x: 1, y: 1}
	main_point = offset_x_twice(main_point, main_point.y);
	dbg!(main_point);
}

fn offset_x_twice(point: mut Vec2, by: i32) -> Vec2 {
	point.x = point.x + by
	point.x = point.x + by
	point
}
```

## No-copy types

There are some types that can't be cloned automatically,
such as file handles and network connections,
so Airy will prevent it with an error.

```
fn main() -> Nil {
	let mut file = open_file("./example.txt").unwrap();
	// ERROR: `file` moved to `fillle` here
	(fillle, let contents) = read_file(file).unwrap();
	// ERROR: attempt to use `file` after move
	file = write_file(file, "Test contents");
}
```

Airy will also prevent automatic clones
for any types that use these non-copyable types
in any of their fields.
Users would have to call functions
if they intend to copy such types.

```
fn main() -> Nil {
	let file = open_file("./in.txt").unwrap();
	let new_file = copy_file(file, "./out.txt");
	dbg!(new_file); // Ok(...)
}
```

**TODO:** mention unique refs/moves here

## Looping

Loops are another place where restrictions show up,
because while we're iterating over a variable
Airy will only allow mutating its individual items.
The following code is rejected by Airy.

```
let mut list = [1, 2, 3]
for list item {
	// ERROR
	append_list(list, item + 3)
}
```

We'd have to iterate over indexes to do the above.

```
let mut list = [1, 2, 3]
for 0..last_index(list) index {
	item = list[index]
	append_list(list, item + 3)
}
```

I think it's possible for Airy
to optimise the "incorrect" loop
to look like the above loop,
but this solution works well enough for now.

## Lifetimes

Airy doesn't allow us to create references,
and only creates temporary aliases,
which means no references to other variables
and no passing references out of functions,
so there's no need to match lifetimes.

## Threads and closures

Threads can use the same reference inference strategy:
immutable variables will use references by default,
non-copyable types will use moves or unique references,
and mutable references will use copies, partial borrows
or unique references like moves.
If threads are passed out of a scope,
all relevant variables will be moved out with it.
Closures will also work the same way.

## Pending review

This reference inference idea is flawless in my head,
but I'm just a programming enthusiast,
and I don't know what I don't know,
so I'd love any feedback and questions.

## Conclusion

Airy will automatically copy variables in some places,
so it'll be less explicit than Rust,
but it'll use references according to the same rules,
so it'll be just as safe and correct,
with nearly the same performance as well,
which is a great foundation
for a high-level Rust-like language.
