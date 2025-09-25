+++
title = "Looping in Gleam (1)"
## remember to change date on publishing
date = 2025-09-26 01:42:16 # draft date
updated = 2025-09-26 01:42:16
+++

How do we loop without `for` and `while`?

**TODO**: look for sections catering towards
people who don't know the language
and remove them
they can pick it up by skimming if they really want
or they could visit the website

If you're used to those statements for looping,
it can be confusing to learn that Gleam uses functions,
but it's honestly quite simple.

[Gleam](https://gleam.run)

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

## On "recursion"

As a brief aside,
this form of looping is called "recursion".

"Recursion" comes from "recur",
which means "re-occur", or "repeat".

We don't call it "looping"
because that's come to mean
things like the `for` keyword.

We don't call it "repetition" because...
mathematicians and other academics, probably?

Anyway, let's continue!

## Better repetition

While repeating is good, our last function,
`greet_repeat`, will repeat forever.

We need to figure out when to stop
and what to do at that point,
which is called a "base case".

In this instance, our base case is
when we've looped a given number of times.
To do this, we give the function a `count` variable
and count down till 0.
As long as the count isn't 0,
we perform the main body of our loop,
but if it reaches 0 or below, we stop.

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

It's actually present in most languages,
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

3. The modules for various types provide
  useful looping functions with documentation,
  such as the `list`, `dict` and `string` modules
  from the standard library.

4. When you need to write a loop manually,
  you naturally get a simple reusable function.
  No need to write a loop every time.

5. The result of the loop cannot be changed outside the loop.
  `for` loops require that you declare a variable
  outside the loop and change it from inside the loop.

## Advanced recursion

Even though you can usually
use an existing function for looping,
and recursion is otherwise quite simple,
there are some cases where a basic solution
might slow down or even crash the program.

Take, for example, getting somebody's total score:

```
fn total_score(scores) {
	case scores {
		[] -> 0
		[score, ..rest] -> {
			score + total_score(rest)
		}
	}
}
```

If there are any scores left,
it calls a function with the remaining input,
and then it adds it to the current one.
Every time it does this,
it needs to save the current progress of the function,
then call the next function,
which will do the same,
before finally getting the result
and resuming the function.
This is quite inefficient,
and can cause crashes if repeating too often.

Say, for example, I used it like so:

```
total_score([71, 100, 43, 85, 66])
```

Here's how it would work:

1. Score is 71, rest is `[100, 43, 85, 66]`
	1. Score is 100, rest is `[43, 85, 66]`
		1. Score is 43, rest is `[85, 66]`
			1. Score is 85, rest is `[66]`
				1. Score is 66, rest is `[]`
					1. List is empty
					2. Return 0
				2. Receive 0 for rest
				3. Add score 66 to 0
				4. Return 66
			2. Receive 66 for rest
			3. Add score 85 to 66
			4. Return 151
		2. Receive 151 for rest
		3. Add score 43 to 151
		4. Return 194
	2. Receive 194 for rest
	3. Add score 100 to 194
	4. Return 294
2. Receive 294 for rest
3. Add score 71 to 294
4. Return 365

At each stage, the outer function has to wait
for the function that was called inside it,
and then it adds the result to another number,
before it returns its own result.
It doesn't have much of an impact with just 5 scores,
but imagine several years of scores,
or scores for a few hundred or thousand people.
Your computer will run out of space
and shut down your app in the best case,
or shut down everything in the worst case.

What you need to watch out for
is that the function is doing extra work at the end.
In this case, it needs to add things before returning.

If we remove that extra work,
then the inner function can return its result
all the way up and skip all the functions in between.

We do that by collecting the result of each call,
and directly return the result at the end,
instead of having to add it in each function.

In this case, we collect the latest result
in `current_total`.
When we reach the end of the list,
we know that the `current_total` is the final result,
so we return it directly.

```
fn total_score_loop(scores, current_total) {
	case scores {
		[] -> current_total
		[score, ..rest] -> {
			total_score_loop(rest, score + current_total)
		}
	}
}
```

Here, the function finishes everything it needs to do
before it calls the next function to continue the work.

Let's call it with the same data:

```
total_score_loop([71, 100, 43, 85, 66], 0)
```

1. Current total is 0, Score is 71, rest is `[100, 43, 85, 66]`
2. Score of 71 + current total of 0 is equal to 71
	1. Current total is 71, score is 100, rest is `[43, 85, 66]`
	2. Score of 100 + current total of 71 is equal to 171
		1. Current total is 171, score is 43, rest is `[85, 66]`
		2. Score of 43 + current total of 171 is equal to 214
			1. Current total is 214, score is 85, rest is `[66]`
			2. Score of 85 + current total of 214 is equal to 299
				1. Current total is 299, score is 66, rest is `[]`
				2. Score of 66 + current total of 299 is equal to 365
					1. Current total is 365
					2. Scores is empty
					3. Return 365
				3. Receive 365
				4. Return 365
			3. Receive 365
			4. Return 365
		3. Receive 365
		4. Return 365
	3. Receive 365
	4. Return 365
3. Receive 365
4. Return 365

Notice how the functions receive the final result
and just return 365 again and again?
Gleam eliminates that in-between receiving and returning,
and returns the final result directly:

1. Current total is 0, Score is 71, rest is `[100, 43, 85, 66]`
2. Score of 71 + current total of 0 is equal to 71
	1. Current total is 71, score is 100, rest is `[43, 85, 66]`
	2. Score of 100 + current total of 71 is equal to 171
		1. Current total is 171, score is 43, rest is `[85, 66]`
		2. Score of 43 + current total of 171 is equal to 214
			1. Current total is 214, score is 85, rest is `[66]`
			2. Score of 85 + current total of 214 is equal to 299
				1. Current total is 299, score is 66, rest is `[]`
				2. Score of 66 + current total of 299 is equal to 365
					1. Current total is 365
					2. Scores is empty
					3. Return 365

This is called tail-call optimisation,
because you put the repeating function call
at the end, or tail, of the function.
This means there's nothing else to do,
and it can return directly all the way up.

## Nicer advanced recursion

There is one issue with this.
When we first start the loop,
we need to pass in a useless starting value of 0.

What we do instead is hide `total_score_loop` in a module,
and call it from a nicer public function:

```
// this function is `pub` --- usable by others
pub fn total_score(scores) {
	total_score_loop(scores, 0)
//                           ^ hidden starting value
}
```

This is also very similar to
another common `for` loop pattern:

```
let current_total = 0
//  ^ collector     ^ starting value
for (score in scores) {
	current_total = score + current_total
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
It doesn't have statements or functions like
`my_num = my_num + 1` or `my_list[i] = i`.

## Recursion recap

I hope all that made sense.

- Looping is repeating a function,
  which is just calling the function again,
  with a check for when to stop repeating.

  - This style of looping is called "recursion".

  - The check for when to stop and what to do then
    is called the "base case".

- Sometimes, we need to optimise a recursive function
  by collecting calculations in a variable
  and passing it along to the repeated function.

  - Such a function is "tail-call optimised"
    because it takes advantage of tail-call optimisation.

At this point, you should go and try out Gleam.
It might be a good idea to write a few loops.
Maybe figure out how to do the ones I showed
without actually looking back at them.
After that you should have a look at the standard library,
which includes several useful looping functions.

[Gleam online playground](https://playground.gleam.run)

If you want to know more,
join the Gleam community
or read onwards for common patterns.

[Gleam Discord](https://discord.gg/Fm8Pwmy)

[Gleam discussions on Github](https://github.com/gleam-lang/gleam/discussions)

## Looping patterns

list.each

list.map
into list.each
with person records
from where you extract names

list.take

int.sum
from list.map over score records
