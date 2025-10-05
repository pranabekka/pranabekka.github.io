+++
title = "Looping in Gleam (1)"
## remember to change date on publishing
date = 2025-09-26 01:42:16 # draft date
updated = 2025-09-26 01:42:16
+++

How do we loop without `for` and `while`?

If you're used to those statements for looping,
it can be confusing to learn that Gleam uses functions,
but it's honestly quite simple.

[Gleam](https://gleam.run)

The form of looping I'm going to describe
is called "recursion" in Gleam
as well as other functional languages.
If you were expected a tutorial on recursion in Gleam,
you're in the right place
(assuming I explained it well).

## On "recursion"

"Recursion" comes from "recur",
which means "re-occur", or "repeat".

We don't call it "looping"
because it's meaning has changed, in programming,
to the `for` keyword.

We don't call it "repetition" because...
mathematicians and other academics, probably?

Anyway, let's get into it!

## Repeating things

Why do we "loop"?
When we want to repeat things.

Say you were greeting the world:

```
fn greet() {
	io.println("Hello, World")
}
```

If you want to greet the world several times,
what do you do?

Well, you could just call it several times:

```
greet()
greet()
greet()
greet()
```

Mmmm... but why are we programming, then?
It's easier to click the "Hello world" button 10 times.

Well, we just call the function again at the end:

```
fn greet_repeat() {
	io.println("Hello, World")
	greet_repeat()
}
```

It might seem absurd, but it's honestly that simple.
Almost.

## Limiting repetition

While repeating is good,
our last function will repeat forever:

```
fn greet_repeat() {
	io.println("Hello, World")
	greet_repeat()
}
```

We need to figure out when to stop
and what to do at that point,
which is called a "base case".

In this instance, our base case is
when we've looped a given number of times.
Here's what it looks like:

```
fn greet(count) {
	case count < 1 {
		True -> Nil // Stop the loop.
		False -> {
			io.println("Hello, World")
			greet(count - 1) // Continue the loop.
		}
	}
}
```

We give the function a `count` variable to start from.
If `count` is less than 1, it stops.
If `count` is 1 or higher,
it greets the world and then starts again
with `count` reduced by 1.

Here's how it'll progress if we use `greet(4)`:

- Start `greet` with `greet(4)`
- `count < 1` is `False`
- Print "Hello, World"
- Repeat `greet` as `greet(4 - 1)`
- `count < 1` is `False`
- Print "Hello, World"
- Repeat `greet` as `greet(3 - 1)`
- `count < 1` is `False`
- Print "Hello, World"
- Repeat `greet` as `greet(2 - 1)`
- `count < 1` is `False`
- Print "Hello, World"
- Repeat `greet` as `greet(1 - 1)`
- `count < 1` is `True`
- Stop repeating

## `for` loops and function loops

It's honestly very similar to a basic `for` loop.
Here's an example of one:

```
for (i = count; i = 0; i--) {
//   ^ init     ^      ^ reduce count
//              stopping case
	io.println("Hello, World")
}
```

Here's how the simple function style matches it:

```
fn greet(count) {
//       ^ init
	case count < 1 {
//       ^ stopping case
		True -> Nil
		False -> {
			io.println("Hello, World")
			greet(count - 1)
//                ^ reduce count
		}
	}
}
```

Recursion is actually present in most languages,
but rarely used or advertised
because it doesn't fit well in those languages.

## The other `for` loop

Now, we rarely use the kinds of loops
where we count down.
There's another looping construct
that's used way more often:

```
// This is not actually possible in Gleam
for (name in names) {
	io.println("Hello, " <> name)
}
```

The way to do it with functions
is just to do one name at a time
and pass the rest to the next function call:

```
fn greet_all(names) {
	case names {
		[] -> Nil // Stop if no names
		[name, ..rest] -> {
			io.println("Hello, " <> name)
			greet(rest) // Continue with rest
		}
	}
}
```

This case statement compares the list to two patterns:

1. An empty list, in which case we stop.
  This is the base case.

2. A list with at least one element,
  where we capture the rest as `rest`.
  The "rest" can also be an empty list
  --- think of it as calling "Next!" for a line
  and realising you're done with the last person.
  We simply pass `rest` to the next function call
  after we say "Hello" to the current `name`,
  at which point it compares again to pattern 1 and 2.

Let's say we call it like so:

```
greet_all(["World", "Fello"])
```

Here's how it'll run:

- List is not empty
- First item is "World", rest is `["Fello"]`
- Print "Hello, World"
- Repeat `greet_all` with rest (`["Fello"]`)
- List is not empty
- First item is "Fello", rest is `[]` (empty)
- Print "Hello, Fello"
- Repeat `greet_all` with rest (`[]`)
- List is empty
- Return `Nil`. Don't repeat `greet_all`.

## Benefits over `for`

Comparing the `for` loop examples,
you might wonder why you should write
the longer "recursive" functions.

1. Your loops return a meaningful value by default.

2. You only need to know how to use functions,
  instead of learning two or more looping constructs.
  The language is smaller and easier to understand.

3. Common looping patterns are available as functions,
  with documentation in the relevant library.

4. When you need to write a loop manually,
  you naturally get a simple reusable function.
  No need to write a loop every time.

5. The result of the loop cannot be changed outside the loop.
  `for` loops require that you declare a variable
  outside the loop and change it from inside the loop.

## Recursion results

<!--
Not explaining tco at all.
Is there any reason to get into that instead?
Or will this explanation carry them through?
-->

The functions I've described so far only return `Nil`.
If you need to construct and return values,
then these functions won't do.

The best way to construct values is to use an "accumulator".
We use it to collect results from each step
and pass it along to the next.

For example, let's take a function
that adds up a list of scores.

```
fn total_score(scores: List(Int), current_total: Int) -> Int {
	case scores {
		[] -> current_total
		[first, ..rest] -> {
			total_score(rest, first + current_total)
		}
	}
}
```

Do you understand how this works?

If the list of scores is empty,
then there are no scores left to process,
so we return the total that we've calculated so far.
If there are any scores left to process,
we add the first one to the current total,
and then call the function again
to process the rest of the scores.

Here's how using it might look like:

```
total_score(
	[71, 100, 43, 85, 66],
	0
)
```

- current total is `0`
- `scores` is not empty
- `first` is `71`, `rest` is `[100, 43, 85, 66]`
- recurse with `rest` and `71 + 0`
	- current total is `71`
	- `scores` is not empty
	- `first` is `100`, `rest` is `[43, 85, 66]`
	- recurse with `rest` and `100 + 71`
		- current total is `171`
		- `scores` is not empty
		- `first` is `43`, `rest` is `[85, 66]`
		- recurse with `rest` and `43 + 171`
			- current total is `214`
			- `scores` is not empty
			- `first` is `85`, `rest` is `[66]`
			- recurse with `rest` and `85 + 214`
				- current total is `299`
				- `scores` is not empty
				- `first` is `66`, `rest` is `[]`
				- recurse with `rest` and `85 + 171`
					- current total is `365`
					- `scores` is empty
					- return `365`
				- return `365`
			- return `365`
		- return `365`
	- return `365`
- return `365`

## Nicer recursion results

There is one issue with this.
We need to type out 0 every time,
even though it's the only value.

```
total_score(game_scores, 0)
total_score(exam_scores, 0)
total_score(football_scores, 0)
total_score(dancing_scores, 0)
```

It's not too bad here,
but what if someone accidentally put a 10 there?
Computers should do this repetitive work for us.

What we do instead is create a separate function
that calls the main function with the starting value.

```
fn total_score(scores) {
	total_score_loop(scores, 0)
//                           ^ hidden starting value
}
```

Now we no longer need to supply a starting value
to every accumulator function we use.

**TODO**: mention accumulator a few more times
to keep it in the reader's memory

```
total_score(game_scores)
total_score(exam_scores)
total_score(football_scores)
total_score(dancing_scores)
```

## Results from `for`

This is also very similar to
another common `for` loop pattern:

```
function total_scores(scores) {
	let current_total = 0
	//  ^ collector     ^ starting value
	for (score in scores) {
		current_total = score + current_total
	}
	return current_total
}
```

```
fn total_score_loop(scores, current_total) {
//                          ^ collector
	case scores {
		[] -> current_total
		[score, ..rest] -> {
			total_score_loop(rest, score + current_total)
		}
	}
}

let total = total_score_loop(scores, 0)
//                                   ^ starting value
```

The benefit of using functions instead of `for` loops
is that your current_total remains constant
outside the looping function.
In the `for` loop,
`current_total` isn't guaranteed to remain constant
after the loop is done with it,
because we needed to change it in the `for` loop.

## Bonus `for` _function_

There's basically no use for it
and it's a smidge longer to use,
but you could write a `for` function
that looks very similar to the statement.

```
import gleam/io

pub fn main() {
	let i = 4
	for(i, fn(i){i>0}, fn(i){i-1},
		fn(_) {
			io.println("Hello, World")
		}
	)
}

/// Repeat body as long as cond is True
fn for(counter, cond, step, body) {
	case cond(counter) {
		True -> {
			body(counter)
			for(step(counter), cond, step, body)
		}
		False -> Nil
	}
}
```

Can you see how it's put together?

The reason it has limited use
is because it can only do things like IO,
since Gleam doesn't allow you to mutate variables.
Gleam doesn't have statements or functions like
`my_num = my_num + 1` or `my_list[i] = i`.

## Recursion recap

I hope all that made sense.

- The style of looping in Gleam is called "recursion".

- Looping is repeating a function,
  which is just calling the function again,
  with a check for when to stop repeating.

  - The check for when to stop and what to do then
    is called the "base case".

- To return a result from a loop,
  we add an extra argument to collect that result.

	- We generally refer to this extra argument
	  as the "accumulator".

	- To avoid providing an empty accumulator every time,
	  we create an extra function that calls the main one.

At this point, you should go and try out Gleam.

It might be a good idea to write a few loops.
Maybe figure out how to do the ones I showed
without actually looking back at them.

**TODO**: suggest some exercises

If you have Gleam installed and in front of you:

```
gleam new looping
```

If you don't have Gleam, try the playground:

[Gleam online playground](https://playground.gleam.run)

If you want to know more,
join the Gleam community
or read onwards for common patterns.

[Gleam Discord](https://discord.gg/Fm8Pwmy)

[Gleam discussions on Github](https://github.com/gleam-lang/gleam/discussions)

Once you've tried writing a few recursive functions,
you should have a look at the standard library,
which includes several useful looping functions.
I've described some of them below,
along with a few extra patterns.

## Looping patterns

list.each

list.map
into list.each
with person records
from where you extract names

list.take

int.sum
from list.map over score records

list update, as i need in connect 4
manual recursion
or actually, can this be done with fold? accumulator?
can fold update the previous item?
feels like an abuse of fold at that point
if i collect anything and everything
fn fold_body(acc: #(prev?, List(Cell)), cur: Cell) -> Row { }
i hain't sure

## Anti-pattern (sort-of)

The tutorial so far has taught you
the "correct" ways of looping,
so you will likely never need to know more.

If you think the following function makes little sense,
then you should be safe and return to your projects.

```
```

While it's not strictly an anti-pattern,
it's bad for performance with large sets of data,
and can even crash your program in extreme cases.

If that function appeals to you,
you should read on before you try using that pattern.
You can also read on if you want to know more.
Just be aware that the explanation is long.

### Memory usage

... explanation without mention of tco, stacks ...

### Tail-Call Optimisation and Stack Frames

... naming tco and stack frames, with a little explanation ...
