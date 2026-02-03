+++
title = "Rust to reference inference"
## remember to change date on publishing
date = 2026-02-01 19:55:00 # draft date
updated = 2026-02-01 19:55:00
+++

Evolving a new high-level language from Rust.

I realised while looking at Rust's move syntax,
that when you move in and back out,
it's basically a mutation without any annotations,
like a slightly different looking Typescript.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

## Mutation by assignment

When used like this,
moves are basically just mutable borrows,
so we can remove `&mut` completely
and use assignment syntax for all mutations,
which makes mutation obvious even without `&mut`.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 3, y: 3 }
}
```

Even function signatures only need `mut` annotations,
and they must return the parameter
for the mutation to apply for the caller.

```
// `mut point` in Airy is similar
// to Rust's `mut point` and `&mut point`.
fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x
	point.y = point.y + by.y
	point
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

`mut` in a function signature does not mean a move,
it means a mutable reference
that will only work if it's returned,
so users will be required to return mutable parameters.

```
fn bad_func(point: mut Vec2) {
	point.x = point.x * 2
	// ERROR: `point` is mutated but not returned.
	// The mutation will be ignored by the caller.
}
```

If a function needs a private mutable variable
that it doesn't want to return,
then it'll need to create its own copy.

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

Whenever a function mutates and returns a parameter,
we can infer that it's a mutable parameter.
A high-level language can make the annotation optional
so that it becomes easier to explore ideas.
The following example has no explicit `mut` annotation,
but the first parameter is mutated and returned at the end.

```
fn offset_point(point: Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x
	point.y = point.y + by.y
	point
}
```

## Immutable borrows

When a function parameter is not a mutable borrow,
then it's an immutable borrow.
It's still not a move, only a reference.
This is why functions need to create
their own private mutable variables.
In the following `offset_point()` function,
`by` is an immutable borrow.

```
fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

Airy can then infer immutable borrows
if there's no mutable borrows of the value,
which is impossible in the following example,
because we're constructing a temporary `Vec2`.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

Inferring immutable borrows instead of moves
allows us to reuse variables even after supplying them
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
Airy doesn't allow shared borrows
while a mutable borrow exists.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point.clone());
	dbg!(main_point);
}
```

The only way to reuse `main_point` for the second parameter
is to clone it or rearchitect our code.
Airy simply clones it for us.

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

We can actually use a shared borrow
when calling `offset_point()` with the same variable
for both parameters.
Because `offset_point()` uses the `by` parameter only once,
after which it will never be used again,
the reference to `by` is unique,
like moving ownership in Rust.
This means `main_point` is passed by mutable borrow
and then also passed by immutable borrow.

```
fn main() -> Nil {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset_point(main_point, main_point);
	dbg!(main_point);
}

fn offset_point(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

When `offset_point()` performs its mutation,
both borrows have the same value,
and the immutable borrow is never used again.

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

## Partial clones

We can have the language track
how variables are used down to the fields,
and if variables copied from each other
never mutate or read the same fields,
then they can share those fields instead.

```
fn main() -> Nil {
	let mut point = Vec2 { x: 1, y: 1}
	main_point = offset_x_twice(main_point, main_point.y);
	new_point = offset_y_twice(main_point, main_point.x);
	dbg!(main_point.x); // 3
	dbg!(main_point.y); // 3
}
```

In the above case,
`main_point` only touches the `x` field,
and `new_point` only uses the `y` field,
so it's safe for them to use the same memory.

## Move, no-copy types

There are some types that can't be cloned automatically,
such as file handles and network connections,
so Airy will prevent it with an error.

```
fn main() -> Nil {
	let mut file = open_file("./example.txt").unwrap();
	// ERROR: Created new reference `file_two`.
	let (file_two, contents) = read_file(file).unwrap();
	// ERROR: attempt to reuse `file` here.
	file = write_file(file, "Example contents");
}
```

We would either need to assign to `file`,
or use the new reference to the file.

```
fn use_same_ref() {
	let mut file = open_file("./example.txt").unwrap();
	(file, let contents) = read_file(file).unwrap();
	file = write_file(file, "Example contents");
}

fn use_new_ref() {
	let mut file = open_file("./example.txt").unwrap();
	let (mut file_two, contents) = read_file(file).unwrap();
	file_two = write_file(file_two, "Example contents");
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
	dbg!(file); // File { ... }
	dbg!(new_file); // Ok(File { ... })
}
```

## Looping

Loops are another place where restrictions show up,
because while we're iterating over a variable
Airy will only allow mutating its individual items.
The following code is rejected by Airy.

```
let mut list = [1, 2, 3];
for item in list {
	// ERROR
	append_list(list, item + 3);
}
```

We'd have to iterate over indexes to do the above.

```
let mut list = [1, 2, 3];
for index in 0..len(list) {
	item = list[index];
	append_list(list, item + 3);
}
```

I think it's possible for Airy
to optimise the "incorrect" loop
to look like the above loop,
but this solution works well enough for now.

## Lifetimes

Because we can't take a reference to a variable
and store it in another variable,
we don't need to worry about the stored reference
moving around without the variable it refers to,
which means we don't need to worry about lifetimes.

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

The main thing here is that
users only need to think about copies!
It's not as explicit as Rust,
but it has the same safety and correctness,
which is a great foundation for a high-level language.

There's a few quick observations I'd like to make
about reference inference:
all functions can be chained,
there's no garbage collector,
it can compile to any imperative language,
users get safe and simple async,
it can be bootstrapped with a compiler
that copies everything,
and the compile speed and run speed can be tuned
by using compiler flags instead of code edits.

## Pending review

This reference inference idea is flawless in my head,
but I'm just a programming enthusiast,
and I don't know what I don't know,
so I'd love any feedback and questions.
