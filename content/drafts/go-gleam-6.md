+++
title = "Go Gleam (6)"
## remember to change date on publishing
date = 2025-09-26 00:13:14 # draft date
updated = 2025-09-28 18:18:18
+++

In many ways, Gleam is what Go wanted to be.

Go provides a way to write safe distributed systems
in a language that's small and easy to learn and use.

> Build simple, secure, scalable systems with Go

Gleam provides a way to write significantly safer
distributed systems in a language
that's smaller and easy to learn and use.

> Gleam is a friendly language for building type-safe
> systems that scale!

Gleam eliminates several extra features present in Go
while enhancing existing features
and adding a few features Go doesn't have,
thus reducing the language along with boilerplate.
Gleam is so small I learnt it by accident
just browsing interesting articles.

In addition to being small and easy to learn,
Gleam's features are designed such that they're
significantly safer than mainstream languages.
A Gleam program can only crash by using
three explicit keywords:
`todo`, `assert` and `panic`.

Gleam systems can easily manage
catastrophic issues like servers shutting down,
including entire data centres,
assuming you have other servers/centres also running.
By running on the BEAM VM with the Erlang OTP library,
Gleam has a very powerful concurrency system
that can easily operate across the globe,
which is how an entire data centre shutting down
can be managed smoothly.

Gleam also provides compile-time type checking
for messages that go across your network,
which keeps your system stable by eliminating
sources of errors in your networking code.
Very few languages, if any, provide such scalability.

Gleam isn't a perfect fit, of course.

It's a functional language with immutable data,
so it doesn't match how most people are taught programming.
However, Gleam is the easiest functional language to get into.
You can learn it in a few hours
and be productive in a few weeks.
For instance, it has only one way to loop,
one way to manage conditionals
and one way to handle errors.

Gleam also doesn't compile to standalone binaries,
so there are limited ways to distribute a Gleam program.
However, it does compile to Javascript,
so you can easily write user-facing applications with it,
while relying on the Erlang VM for backend systems.

Gleam doesn't have the ecosystem that Go has,
which is to be expected of a new language,
but I expect it to catch up soon.
Additionally, compiling to Javascript and Erlang/BEAM
means that there is a vast ecosystem
that can be accessed with little effort.
Gleam's interop is incredibly simple
and allows access to all platform features.

I encourage you to have a look at Gleam.
The syntax is familiar,
there's no surprise runtime errors,
the error messages are incredible
and the feedback is incredibly fast.

[Gleam](https://gleam.run)
