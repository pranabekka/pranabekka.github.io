+++
title = "Rust to reference inference"
## remember to change date on publishing
date = 2026-02-01 19:55:00 # draft date
updated = 2026-02-01 19:55:00
+++

Evolving a new high-level language from Rust.

I'm going to be describing just the kernel of a new language,
which I'm going to call Airy
because it's high-level and everywhere,
and it's easier than saying
"the reference inference algorithm"
every time I mention it.

So, I liked pipes and the idea of a high-level Rust
for a while before I finally started learning Rust.
Soon after that,
looking at the move syntax sparked my imagination.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

It looks so nice and clean,
like a high-level language!
No borrow annotations whatsoever.

## Mutation by assignment

The problem, of course,
is that Rust functions are designed with `&mut`,
where they perform mutations "in-place",
with a convention of returning references
to the mutated variable for chaining.
Well, Airy removes `&mut` completely
and uses assignment syntax for all mutations.
Where Rust moves a value in and back out,
Airy uses mutable borrows.

```
// `mut point` in Airy
// is similar to Rust's `mut point`
// as well as Rust's `&mut point`.
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
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 3, y: 3 }
}
```

## Mutation by return only

Do keep in mind that this mutation system
isn't exactly like moves or mutable borrows.
Functions must return mutable parameters
for the mutation to take effect in the caller,
so Airy requires they be returned,
and prevents mutating immutably borrowed variables.
Similarly, function calls must have their return value
assigned to a variable to take effect.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	// WARNING: Return value of `offset_point` is ignored.
	offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 1, y: 1 }
}
```

If we needed to mutate a variable without returning it,
we must create a new variable or temporary value
within the function.

```
fn print_offset_point(point: Vec2, by: &Vec2) -> Nil {
	// Creating a new variable
	let mut new_point = point.clone();
	new_point.x = point.x + by.x;
	new_point.y = point.y + by.y;
	dbg!(new_point);
	
	// Using a temporary value
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
but we can 

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point.clone());
	dbg!(main_point);
}
```

We could change the second parameter of `offset_point`
to use a mutable reference instead of needing ownership.
It was only using it to see the values anyway.

```
fn main() {
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

That looks good,
but even newly created and independent values
would need to use borrows.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, &Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

It's honestly not too bad,
but it feels off to create an owned value
and immediately pass it out as a reference,
and it requires us to manually manage references.
Airy can infer immutable borrows
if there's no mutable borrows of the value,
which is impossible in this case,
where we construct a temporary `Vec2`.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}

fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

## Clone inference

At this point Airy completely removes
the need for all borrow annotations,
but that still leaves extra clone annotations.
Just like Rust, Airy doesn't allow any more borrows
while a mutable borrow exists.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point.clone());
	dbg!(main_point);
}
```

Instead of requiring a `clone()`,
Airy can see that `main_point`
is already borrowed mutably
as the first argument to `offset_point`,
so the only option is to clone `main_point`
for the second argument.
In that case, Airy can just do the clone
instead of forcing us to add it.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point);
	dbg!(main_point);
}
```

## Unique ownership

While I just said the only option is a clone,
Airy can actually use a second borrow there,
because `offset_point` uses the `by` parameter only once,
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

## New variable cloning

The above refinements to Airy
help when creating a new variable as well.
`main_point` will be copied once to `new_point`,
and then the new copy in `main_point`
will be passed into `offset_point` by reference.

```
fn main() {
	let main_point = Vec2 { x: 1, y: 1 };
	let new_point = offset_point(main_point, main_point)
	dbg!(main_point); // Vec2 { x: 1, y: 1 }
	dbg!(new_point);  // Vec2 { x: 2, y: 2 }
}
```

## Partial borrows

Airy can also perform partial borrows,
where it can borrow parts of a variable
instead of cloning the whole thing.
In the following example,
`offset_x` takes a mutable borrow of `main_point`,
so Airy shouldn't allow a second borrow
for the second argument.
However, Airy can see that `offset_x`
only mutates `x` and never touches `y`.

```
fn main() {
	let mut point = Vec2 { x: 1, y: 1}
	main_point = offset_x_twice(main_point, main_point.y);
	dbg!(main_point);
}

fn offset_x(point: mut Vec2, by: i32) -> Vec2 {
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
fn main() {
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
fn main() {
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

## Conclusion

Airy will automatically copy variables in some places,
so it'll be less explicit than Rust,
but it'll use references according to the same rules,
so it'll be just as safe and correct,
which makes for a great Rust-like high-level language.
