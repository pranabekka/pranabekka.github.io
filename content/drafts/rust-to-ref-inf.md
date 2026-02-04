+++
title = "Rust to borrow inference"
## remember to change date on publishing
date = 2026-02-01 19:55:00 # draft date
updated = 2026-02-01 19:55:00
+++

Evolving a new high-level language from Rust.

I realised while looking at Rust's move syntax,
that when you move ownership in and back out,
it's basically a mutation without any annotations,
like a slightly different looking Typescript.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

## Mutation by assignment

What if we just remove `&mut`
and use "moves" for mutable borrows.
Using assignment makes mutation obvious,
even if arguments aren't annotated as `&mut`.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 3, y: 3 }
}
```

Even function signatures only need `mut` annotations,
and they must return the parameter
for the mutation to apply for the caller.

```
// `mut point` with the borrow inferrer is similar
// to Rust's `mut point` and `&mut point`.
fn offset(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x
	point.y = point.y + by.y
	point
}
```

If we ignore the return value of a function,
then it won't affect any variable in the caller,
so the borrow inferrer will generate a warning for it.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	// WARNING: Return value of `offset` is ignored.
	offset(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
	// Vec2 { x: 1, y: 1 }
}
```

## Not quite moves

`mut` in a function signature does not mean a move,
it means a mutable borrow,
but unlike Rust's mutable borrows
it will only work if it's returned.
This means functions will be required to
return a parameter if the parameter is mutated.

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
fn print_offset(point: &Vec2, by: &Vec2) -> () {
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
fn offset(point: Vec2, by: Vec2) -> Vec2 {
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
In the following `offset()` function,
`by` is an immutable borrow.

```
fn offset(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

We can then infer immutable borrows
if there's no mutable borrows of the value,
which is impossible in the following example,
because we're constructing a temporary `Vec2`.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, Vec2 { x: 2, y: 2 });
	dbg!(main_point);
}
```

Inferring immutable borrows instead of moves
allows us to reuse variables even after supplying them
as function arguments.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	let offset = Vec2 { x: 2, y: 2 };
	main_point = offset(main_point, offset);
	dbg!(main_point);
	dbg!(offset);
}
```

## Safety enforced at call site

If functions always take borrows,
then the function caller is responsible for
making sure that aliasing xor mutability is followed.

```
fn main() {
	let mut main_point = Vec2 { x: 1, y: 1 };

	main_point = offset(main_point, main_point.clone());

	let offset_amount = main_point.clone();
	main_point = offset(main_point, offset_amount);

	let new_point = offset(main_point.clone(), main_point.clone());

	main_point = offset(main_point, Vec2 { x: 1, y: 1 });
}
```

Every call to `clone()` is enforced
by our incomplete borrow inferrer,
to ensure that there's no shared borrows
while using a mutable borrow.
Rust's borrow checker would do the same,
in addition to requiring `&mut`.

<!--
## No storing or returning borrows

Because we've removed borrow annotations,
there's no way for a variable to borrow another,
and functions can't return borrowed variables either.
-->

## Clone inference

At this point we've completely removed
the need for all borrow annotations,
but that still leaves some clone annotations,
because it's unsafe to allow shared borrows
while a mutable borrow exists.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, main_point.clone());
	dbg!(main_point);
}
```

The only way to reuse `main_point`
for the second parameter
is to clone it or rearchitect our code.
In the following example,
the second use of `main_point` in `offset()` is a clone.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, main_point);
	dbg!(main_point);
}
```

The same applies when assigning to a new variable.
In the example below,
`main_point` is being reused after the `new_point` declaration
so the only way to use it in `offset()`
is to clone it into `new_point` and pass that
into `offset()` by reference,
and create a second clone for the immutable borrow.

```
fn main() -> () {
	let main_point = Vec2 { x: 1, y: 1 };
	let new_point = offset(main_point, main_point)
	dbg!(main_point); // Vec2 { x: 1, y: 1 }
	dbg!(new_point);  // Vec2 { x: 2, y: 2 }
}
```

## Unique references

`offset()` actually doesn't need a clone
when passing the same variable as the second arg.
Because `offset()` uses the `by` parameter only once,
after which it will never be used again,
the reference to `by` is unique,
like moving ownership in Rust.
This means `main_point` is passed by mutable borrow
and then also passed by immutable borrow.

```
fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };
	main_point = offset(main_point, main_point);
	dbg!(main_point);
}

fn offset(point: mut Vec2, by: Vec2) -> Vec2 {
	point.x = point.x + by.x;
	point.y = point.y + by.y;
	point
}
```

When `offset()` performs its mutation,
both borrows have the same value,
and the immutable borrow is never used again.

Because Rust requires explicit borrows,
it would need a separate function
to offset by self without cloning.

```
// NOTE: Temporarily interrupting
// our scheduled borrow inferrer evolution
// with a bit of Rust.

fn main() -> () {
	let mut main_point = Vec2 { x: 1, y: 1 };

	// Notice the call to `clone()`.
	main_point = offset(main_point, main_point.clone());

	// No need to clone,
	// but we had to create a new function.
	main_point = offset_by_self(main_point);
}

fn offset_by_self(point: Vec2) -> Vec2 {
	point.x = point.x + point.x;
	point.y = point.y + point.y;
	point
}
```

Alright, back to the borrow inferrer.

## Partial borrows

The borrow inferrer can also infer partial borrows,
where it can borrow parts of a variable
instead of cloning the whole thing.
In the following example,
`offset_x()` takes a mutable borrow of `main_point`,
so the borrow inferrer shouldn't allow a second borrow
for the second argument.
However, the borrow inferrer can see that `offset_x()`
only mutates field `x` and never touches field `y`,
so it's safe to pass in `main_point`.

```
fn main() -> () {
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
fn main() -> () {
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

## Move types

There are some types that can't be cloned automatically,
such as file handles and network connections,
so the borrow inferrer will prevent it with an error.

```
fn main() -> () {
	let mut file = open_file("./example.txt").unwrap();
	// ERROR: `file` moved to `file_two`.
	let (file_two, contents) = read_file(file).unwrap();
	// ERROR: attempt to reuse `file` here.
	file = write_file(file, "Example contents");
}
```

We would either need to assign to `file`,
or use the new owner of the file handle.

```
fn use_same_ref() {
	let mut file = open_file("./example.txt").unwrap();
	(file, let contents) = read_file(file).unwrap();
	file = write_file(file, "Example contents");
}

fn use_new_ref() {
	let file = open_file("./example.txt").unwrap();
	let (mut file_two, contents) = read_file(file).unwrap();
	file_two = write_file(file_two, "Example contents");
}
```

The borrow inferrer will also prevent automatic clones
for any types that use these non-copyable types
in any of their fields.
Users would have to call functions
if they intend to copy such types.

```
fn main() -> () {
	let file = open_file("./in.txt").unwrap();
	let new_file = copy_file(file, "./out.txt");
	dbg!(file); // File { ... }
	dbg!(new_file); // Ok(File { ... })
}
```

## Looping

Loops are another place where restrictions show up,
because while we're iterating over a variable
the borrow inferrer will only allow mutating
its individual items.
The following code is rejected by the borrow inferrer.

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

I think it's possible for the borrow inferrer
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
it can compile to any imperative language like C or JS,
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
