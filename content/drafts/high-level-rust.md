+++
title = "High-level Rust"
## remember to change date on publishing
date = 2025-12-23 21:24:40 # draft date
updated = 2025-12-23 21:24:40
+++

Safe and performant without any annotations.

```
def num_fn(num):
	num = 10
	return num

def list_fn(list):
	list[0] = 10
	return list
	
a = 1
b = num_fn(a)
print(a) # 1
print(b) # 10

x = [1, 2, 3]
y = list_fn(x)
print(x) # [10, 2, 3]
print(y) # [10, 2, 3]
```

Many people think Rust makes C safer,
and that's about it.
The truth is that it's an improvement in safety
over all imperative languages.
It doesn't just stop at catching potential crashes.
Rust prevents many subtle errors
like the one that occurs with `number_fn` above.
The problem, however, is Rust's learning curve.
You have to learn all kinds of concepts
and the incantations that invoke them.
Hylo attempts to make Rust's safety easier to use
with its concept of mutable value semantics,
but that "lo" in "Hylo" (probably) stands for lo-level,
which means Hylo still has annotations
for the different ways that variables can be used.
It's not truly suitable for a Hy-level language ---
the likes of Python, Javascript, Java or C#.

[Hylo](https://hylo-lang.org)

**TODO:** check following example with compiler

```
fn main() {
	let a = [1, 2, 3];
}

fn list_fn(list: [i64]) {
	list[0] = 10;
	list
}
```

I was, instead, inspired by Rust's ownership syntax.
Coming from other high-level languages,
it might look like Rust is performing copies,
but I learnt to think of moves as unique references.
I later learnt that moves are not exactly references,
and might actually have some overhead,
but then I thought "Why can't it be a reference?"
If we remove the annotations for borrowing,
then assignment becomes the only form of mutation,
which means it's fairly easy to infer references.

```
pub fun main() {
	let pets = ["Lancelot", "Arthur", "Merlin"]
	let pets_sorted = list.sort(pets, string.compare)
	echo pets // ["Lancelot", "Arthur", "Merlin"]
	echo pets_sorted // ["Arthur", "Lancelot", "Merlin"]
}
```

In the above example,
we supply pets as an argument to `list.sort`,
but the result is assigned to `pets_sorted`,
so the sorting function receives a copy of `pets`.
`pets` and `pets_sorted` are separate values.
Let's change that code a bit.

```
pub fun main() {
	let pets = ["Lancelot", "Arthur", "Merlin"]
	pets = list.sort(pets, string.compare)
	echo pets // ["Arthur", "Lancelot", "Merlin"]
}
```

In the new example above,
the result of `list.sort` is put back in `pets`,
so `list.sort` receives a reference to `pets`.
`string.compare` is also sent as a reference,
but only because it's not mutated by the sort function.
`pets` can be thought of as a mutable borrow,
while `string.compare` is an immutable borrow.

There's a lot of work to do past this,
but where I used to ruminate for days,
it now takes me less than an hour
to sketch out possible solutions for most problems,
so I believe this idea is fully viable.
Trying to explain all the edge cases
will be a very long post
or a short post with months of editing,
so I'd like to do that in a separate post
in response to various feedback.
Instead, I'd like to mention the benefits.

There's a lot of cool things that this syntax allows.

References become completely invisible.
There's no annotations like Rust.
Even Python requires knowing about
where the language uses references
and when you need to make copies.

Mutating all types looks the same.
In other languages,
numbers and strings are treated differently
from other kinds of values.

When you call a function from outside
you know exactly what it mutates,
because only the variables you assign to are mutated.
It does not mutate unrelated variables.

When you edit the body of a function
you know it cannot mutate unrelated external variables.
You don't need to worry about
how variables are passed in.

When you call a function,
the return value is always meaningful.
Tooling can guide you better.

There's only one way to write functions.
Other languages allow mutating in place,
returning a value, or both.

All functions can be chained,
because they all use return values.
They don't need to be written to
specifically allow chaining.
