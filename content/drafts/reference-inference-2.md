+++
title = "Reference inference (2)"
## remember to change date on publishing
date = 2025-11-30 06:02:10 # draft date
updated = 2025-11-30 06:02:10
+++

A path to better high-level imperative languages.

High-level languages are meant to take away concerns
about the fine details of a machine,
such as resource allocation and memory addresses,
so that you can focus on the essence of your project.
The popular high-level languages are imperative
because they're similar to low-level languages,
which are required to build higher abstractions.
However, high-level imperative languages
provide leaky abstractions.

To use Python, you must learn about references
as soon as you go past numbers and strings.
While it's easier to manage than
pointers and dereferencing,
the user must still be concerned about aliasing.
Aliasing can lead to variables changing
for no apparent reason
and causing subtle bugs that won't be noticed for weeks.
In concurrent or parallel code,
it can even crash your program,
which is probably better than secretly corrupting data.
I shall provide small synchronous examples,
but the issue quickly gets out of hand in larger code.

```
pets_by_age = ['Merlin', 'Arthur', 'Zeus']
pets_by_name = pets_by_age
pets_by_name.sort()
assert pets_by_age == pets_by_name
```

Python uses aliasing to improve performance,
and Javascript tries to improve performance further
by comparing memory addresses for object equality
instead of bothering to check the whole object.
I doubt anybody wants that.
I've certainly never had a use for it.
Java is similar to Python in terms of aliasing issues.
Go handles this a bit better by using copies by default,
but copies are bad for performance,
so Go has syntax for referencing and dereferencing.
This means the user must either accept poor performance,
or carefully manage memory addresses.

```
func main() {
	pets := [3]string{"Arthur", "Merlin", "Zeus"}
	pets_renamed := pets
	pets_renamed[2] = "Lancelot"
	assert(pets != pets_renamed)

	pets_2 := []string{"Arthur", "Merlin", "Zeus"}
	pets_2_renamed := pets_2
	pets_2_renamed[2] = "Lancelot"
	assert(pets_2 == pets_2_renamed)

	hugo := Project{ "Hugo", "Go" }
	gron := Project{ "Gron", "Go" }
	assert(e.Language() != f.Language())
	assert(*e.Language() == *f.Language())
}

type Project struct {
	name string
	language string
}

func (p *Project) Language() {
	return &p.language
}
```

Rust is the only language that handles this well.
It guarantees high-performance
while preserving the independence of variables.
However, it's much more low-level than Go.
You must explicitly manage references and copies,
but especially the lifetimes of variables
in order to avoid garbage collection.
While Rust makes you go out of your way
to write incorrect code,
it also makes you go out of your way
to write correct code.

```
fn main() {
	let pets = ["Merlin", "Arthur", "Zeus"];
	let mut pets_sorted = pets.clone();
	pets_sorted.sort();
	assert!(pets != pets_sorted);
}
```

Rust does not include enough abstraction to make
a good high-level language for most people,
yet it's the only imperative language that
guarantees safety and predictability.
The design of Rust suggests that
users must annotate and manage references explicitly
in order to achieve safety and correctness
without awful performance by using copies everywhere.

We can, in fact, infer references completely,
by requiring assignment for mutation,
similar to how we do it for numbers.

```
fun main()
	let my_num = 21
	my_num = my_num * 2
```

This looks like nothing special,
but it makes mutation very clear to the user.
Passing a variable to a function only gives
the function a readonly reference.
The function cannot change the variable.
You must assign the result back to the variable.
The issue is that this uses copies,
because computers handle numbers very efficiently.
Using copies for other data types might lead to
performance that's significantly worse than Python.
The answer is to use a copy if the result
goes into another variable,
else use a reference if it goes into the same variable.

In this example,
the `sort` function takes in `pets` as an argument,
but its result is assigned to a different variable,
so `sort` receives a _copy_ of `pets`,
which is then moved into `pets_sorted`.

```
fun main()
	let pets = ["Lancelot", "Arthur", "Merlin"]
	let pets_sorted = list.sort(pets)
	assert pets != pets_sorted
```

In this example,
`sort` takes in `pets` as an argument,
and then we put the result back into `pets`,
so `sort` receives a _reference_ to `pets`.

```
fun main()
	let pets = ["Lancelot", "Arthur", "Merlin"]
	pets = list.sort(pets)
	echo pets as "Should be Arthur, Lancelot, Merlin"
```

With this syntax,
we can use references for performance
while still reducing errors.
Functions can no longer change arbitrary variables.
Variables don't change unless you assign to them.
A function contains everything you need to understand it.

It also simplifies how we write and use functions.
If all functions must return values to mutate,
then all functions can be chained together,
and there isn't a second version of each function
where it can mutate in place,
or a third version that mutates in place
and also returns a reference or copy for chaining.

The key benefit, however, is a language that is
easy to learn, predictable to use, and fast.
