+++
title = "Loop in Gleam"
## remember to change date on publishing
date = 2026-03-10 15:57:34 # draft date
updated = 2026-03-10 15:57:34
+++

How to survive without `for` loops.

This is a simple way to build intuition for recursion,
which can be used for looping in any language
with functions,
though it will be of limited use
if it's not optimised.

[Languages with optimised recursion](https://en.wikipedia.org/wiki/Tail_call#Language_support)

Let's get started.

Looping and recursion is all about repeating.
In fact, the regular word "recurse"
is a synonym for "repeat".

Say you have a function to greet somebody:

```
pub fn main() -> Nil {
	greet()
}

fn greet() -> Nil {
	io.println("Howdy!")
}
```

If we wanted to repeat the greeting multiple times,
we can just call the function again.

```
pub fn main() -> Nil {
	greet()
	greet()
	greet()
}
```

That's rarely a valid option, though.
Instead, we can simply call the function again
at the end of the function:

```
fn greet() -> Nil {
	io.println("Hallo!")
	greet()
}
```

This is the essence of recursion:
calling a function again at the end.
After this point we just need to take care
that it stops before the program
crashes or force quits.

For the `greet` function,
we will want a number to track how often
the greeting should be repeated.
The function must be called
with that parameter each time.

```
fn greet(times: Int) -> Nil {
	io.println("Hi!")
	greet(times)
}
```

Each time we repeat the function,
we decrease the number by 1.

```
fn greet(times: Int) -> Nil {
	io.println("Hi!")
	greet(times - 1)
}
```

If the number reaches 0,
then we don't repeat the function, just return `Nil`.
We also check if the number is negative,
otherwise the program would go on, as before,
until it crashes or force quits.

```
fn greet(times: Int) -> Nil {
	case times <= 0 {
		True -> Nil
		False -> {
			io.println("Hi!")
			greet(times - 1)
		}
	}
}
```

Now, let's greet four times.

```
pub fn main() -> Nil {
	greet(4)
}
```

The `greet` function will print,
then call `greet` with `3`,
print, then `2`, print, then `1`,
print, then `0`, and stop.

There are a few implications of this,
each leading into the other:
creating a loop means creating a function,
you can reuse this loop function anywhere,
you can reuse loops created by other people,
and you can share your loops with others.

See the language tour to learn more about
recursion, tail calls, common looping function,
and Gleam in general.
It takes just an afternoon,
and you can join the Discord server
to get help immediately.
The community is very friendly!

[The Gleam Language Tour](https://tour.gleam.run)

[Gleam Discord server](https://discord.gg/Fm8Pwmy)

[Gleam website](https://gleam.run)

[Contact me](@/about.md#contact)
