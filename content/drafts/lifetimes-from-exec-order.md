+++
title = "Infer lifetimes from execution order"
## remember to change date on publishing
date = 2026-07-07 13:37:20 # draft date
updated = 2026-07-07 13:37:20
+++

<'x.x>

Execution order starts at 0,
as programmers are required to do,
and it ticks up from there to 1, 2, 3, and so on.

```
let a = [1, 2, 3]
//  ^1  ^0
let b = a
//  ^3  ^2
a[1] = 20
//^5   ^4
print(a)
//    ^6
print(b)
//    ^7
```

We store the lifetimes as a start and end point,
and we also store mutation points.

```
a:
	lifetime:
		start: 1
		end: 6
	mut:
		- 5
b:
	lifetime:
		start: 3
		end: 7
```

When the compiler sees `let b = a`
it considers the data for `a` and `b`.
It sees they have overlapping lifetimes from 3 to 6,
then it sees there's an overlapping mutation at 5.
Because of this, `b` must be a copy of `a`.
The compiler can do it automatically,
or require that it be explicitly copied.
Resource types, like files,
can never be copied implicitly.

Functions can share the exact lifetime data,
using function local execution order,
or they can simply share whether parameters
have overlapping mutation or not.

```
fn main() {
   let point = { x: 3, y: 4 }
   move_x(mut point)
   print(point)
   // { x: 6, y: 4 }
}

fn move_x(mut p, x) {
//            ^0 ^1
   p.x += x
// ^3     ^2
}
```

The `p` parameter in `move_x`
is mutated after the lifetime of `x` ends.
`x` ends at 2, `p` is mutated at 3.

```
move_x:
	p:
		lifetime:
			start: 0
			end: 3
		mut:
			- 3
	x:
		lifetime:
			start: 1
			end: 2
```

This means we can safely alias `point` twice
in `move_x(mut point, point.x)`.

---

Async assumes all lifetimes are overlapping,
unless a mechanism like `await` is used
to join secondary threads into the main one,
in which case the lifetimes and mutation points
can be analysed further to avoid copies.

Loops make all involved variables
have overlapping lifetimes,
although the flow within an iteration
can be analysed for further optimisation.
I haven't thought much about it.
I've been thinking about conditionals instead.

Conditionals can make mutation _maybe_ overlap,
which means data should _maybe_ be copied.
This requires collecting more information.

There's a main execution path and then branches.
A set of branches split at a given point
and then join the main execution path.
The split and join points are the range,
which is used to group related branches.

```
let a = [1, 2, 3]
//  ^1  ^0
let b = a
//  ^3  ^2
if (random_int(10) == 1) {
//  ^5         ^4     ^6
   a[0] += 1
// ^a8   ^a7      a = range 7-10, branch 1
} else {
   b[1] *= 10
// ^b8     ^b7    b = range 7-10, branch 2
   b[2] += b[2]
// ^b10    ^b9
}
print(a)
//    ^11
print(b)
//    ^12
```

Execution order in the main path
continues from the longest branch.
Because branch 1 would cause overlapping mutation,
it requires that `b` be a copy of `a`.
The same applies to branch 2.
Because both branches in the range require copying `b`,
this can be done before the conditional.
If only one path required `b` to be a copy,
and the other branches would work correctly
with `b` as an alias of `a`,
then the copy would only go
in the branch that needs it.

If all branches in a range require a copy,
then we just do the copy on creating the variable,
otherwise we can have the copy
only be inserted in the branch that requires it.
Branches don't really care about each other
in the first pass,
where we determine if they require copies.
Ranges also don't care about each other
while we determine if they require copies.
But once a copy is guaranteed
by the main execution path or any range,
then overlapping lifetimes and mutation don't matter
for other ranges and their branches.
