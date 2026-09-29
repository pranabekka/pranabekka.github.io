+++
title = "Don't mention tail calls"
## remember to change date on publishing
date = 2026-09-27 23:09:43 # draft date
updated = 2026-09-27 23:09:43
+++

(When teaching recursion.)

What are tail calls?
What's the tail of a function?
The other approach looks nicer.
What's a stack?
Overflow?

Recursive functions that aren't tail-call optimised
are confusing by themselves,
because they collect data from future calls,
which collect data from future calls,
which collect data from future calls,
which - you get the picture.
After learners wrap their heads around
non-tail-call recursion,
they must learn to not use it,
then they must learn of stack frames
to understand why.
All of this drives people away.

Instead, teach them of functions that
do a bit of work on part of the input,
and then pass along
the remaining input and accumulated result
along to the next call.
Even without hinting at tail calls or stacks
these functions are tail-call optimised.

```
fn sum(ints) {
	sum_loop(ints, 0)
}

fn sum_loop(ints, sum) {
	case ints {
		[int, ..rest] -> sum_loop(rest, sum + int)
		[] -> sum
	}
}
```

If there's no result to return at the end,
then there's no accumulator.
As simple as that.

```
fn greet(times) {
	case times > 0 {
		True -> {
			io.println("Hi!")
			greet(times - 1)
		}
		False -> Nil
	}
}
```

This should even be familiar
to experienced imperative programmers,
with how an accumulator must be initialised
and then updated in each iteration of a loop.

```
def sum(ints):
	sum = 0
	for int in ints:
		sum = sum + int
	return sum
```

Language implementation is
not the domain of most programmers.
They should not be learning of
tail calls and stack frames
in introductory material.
