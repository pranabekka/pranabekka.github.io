+++
title = "Rust to reference inference"
## remember to change date on publishing
date = 2026-02-01 19:55:00 # draft date
updated = 2026-02-01 19:55:00
+++

Evolving a new high-level language from Rust.

**TODO:** what do bout type annotations?
evolve them away?

I'm going to be describing just the kernel of a new language,
which I'm going to call Airy
because it's high-level and everywhere,
instead of saying "the new semantics" everywhere.

I liked pipes and the idea of a high-level Rust for a while,
then I finally started learning Rust,
and soon after the move syntax sparked my imagination.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x:2, y:2 });
	dbg!(main_point);
}
```

It looks so nice and clean,
like a high-level language!
No borrow annotations whatsoever.
The problem, of course,
is that Rust functions are designed with `&mut`,
and the return values of functions
have little relation at the language level.
Well, with Airy we infer `&mut` from moves!
Where Rust requires moving a value in and back out,
Airy can just use a mutable borrow in most places.

```
// `mut point` is the same as Rust's `mut point`
// or even Rust's `&mut point`.
fn offset_point(mut point: Vec2, by: Vec2) {
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
	main_point = offset_point(main_point, Vec2 { x:2, y:2 });
	dbg!(main_point);
}
```

We're still being forced to use clones, though.

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
```

That looks good,
but even newly created and independent values
would need to use borrows.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, &Vec2 { x:2, y:2 });
	dbg!(main_point);
}
```

It's honestly not too bad,
but it feels off to create an owned value
and immediately pass it out as a reference.
Airy removes `&` for immutable borrows,
and it doesn't just move ownership without question.
Instead, if it's a new value,
it just moves it, or passes an immutable borrow,
without any unusual symbols
that confuse high-level developers.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x:2, y:2 });
	dbg!(main_point);
}

<!-- oh, this is why Rust needs arg labels. -->
<!-- it's unreasonable to use a separate Offset type. -->
<!-- at least it feels like it would be. is it? -->
<!-- anyway, here's Airy without annotations -->
fn offset_point(mut point: Vec2, by: Vec2) {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

Just like Rust, Airy doesn't allow any more borrows
while a mutable borrow exists.
Since `point` is already borrowed mutably
as the first argument to `offset_point`,
Airy will clone it for the second argument.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point);
	dbg!(main_point);
}
```

Airy can actually use a second borrow there,
because `offset_point` uses the second parameter only once,
during which time both borrows
will always have the same value.

```
fn offset_point(mut point: Vec2, by: Vec2) {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

Because Rust requires explicit borrows,
it would need a separate function
to handle the case where we want to offset by self.

```
// NOTE: Temporarily interrupting
// our scheduled Airy evolution
// with a bit of Rust.
fn offset_by_self(point: Vec2) {
	point.x = point.x + point.x;
	point.y = point.y + point.y;
	point
}
```

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

fn offset_x(mut point: Vec2, by: i32) {
	point.x = point.x + by
	point.x = point.x + by
	point
}
```

There are some places where Airy won't clone automatically,
because some types just can't be cloned like that,
such as file handles and network connections.

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

Loops are another place where restrictions show up,
because while we're iterating over a variable
Airy will only allow mutating its individual items.
The following code is rejected by Airy.

```
let mut list = [1, 2, 3]
for list item {
	// ERROR
	list_push(item + 3)
}
```

We'd have to iterate over indexes to do the above.

```
let mut list = [1, 2, 3]
for 0..last_index(list) index {
	list_push(list[index] + 3)
}
```

We can't create references to other variables anymore,
which means not storing references in variables
and no passing references out of functions,
so lifetime problems are also gone.

Threads can use the same reference inference strategy:
immutable variables will use references by default,
non-copyable types will use moves or unique references,
and mutable references will use copies
for the whole or just the relevant fields/items.
If threads are passed out of a scope,
all relevant variables will be moved out with it.
Closures will also work the same way.

Airy will automatically Box and heap allocate things,
and it'll automatically copy variables,
so it'll be less explicit than Rust,
but we don't need that from a high-level language.
