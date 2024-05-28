+++
title = "My biggest program!"
## remember to change date on publishing
date = 2024-05-28 20:59:53 # draft date
updated = 2024-05-28 20:59:53
+++

I decided to implement UNO to have a small project
instead of simple exercises on language topics,
and I've finally finished it!

!!! SCREENSHOT (in-game) !!!

You can download it below if you want to try it out.
I've included basic instructions,
but feel free to reach out.

## Concept

The basic idea was to have something I could play ---
I like doing things with people,
and games are some of the most fun.

UNO sounded like a simple first project,
though it's actually quite difficult to handle verification.
After being stalled on that for several weeks,
I finally settled on no validation and an undo system,
which actually works quite well for my purposes.

A LAN game was inevitable,
since I wasn't going to buy a server.
However, the peer-js library provides a free server
that I could use.

I wanted to implement it in plain Javascript,
since I was aiming to learn the language.
I did break the rule for a websocket library,
because Node doesn't have a good websockets interface.

I made it peer-to-peer because
it was easier for me to work with
a single type of entity.
I couldn't quite understand where to make the divide
between a server and a client.

So bring that all together,
and you have a simple peer-to-peer, LAN UNO clone,
with an undo system in place of validation.

## No validation

No validation actually makes life quite a bit easier,
and even provides some benefits.

Since people rarely put the wrong card down,
validation is rarely required.

Since it's played with friends and family,
you can trust them to play fair,
and undo any mistakes or
(hopefully) half-hearted attempts at cheating.

You can also play by your own home rules,
or switch up the rules for a game or more,
though there is some benefit to canonical rules
if you're playing with new people.

## How to play

You'll need a little bit of familiarity with NodeJS
and some web technologies,
but if you're struggling with understanding any step,
please reach out!

[NodeJS](https://nodejs.org)

[Contact](@/about.md#contact)

### Installation and hosting

You actually don't need to install any dependencies,
because I just included everything in the zip file.

Once you've downloaded the file,
you only need to unzip it and run `node server.js`.

!!! DOWNLOAD (zip file) !!!
[UNO clone download](/ting.zip)

When you run the server,
it will print out the address to connect to.
Make sure everyone is on the same network
when you get them to connect.

If connecting to the address gives you something else,
you can change the port to something else.

If you just want to test it out on a single machine,
you can connect on `localhost:8000`.

If you're hosting it on Termux,
keep it in the foreground,
otherwise the game becomes unplayable.

### Joining and playing

Have everyone connect to the address printed out by the server.

They'll see a 'login' screen where they can
enter a username and join the game.

**IMPORTANT:**
Make sure nobody uses the same username,
because I have no validation for that.
Both players will see and use the same cards,
unless one disconnects and joins with a different username.

Make sure nobody presses start until everyone has joined.
Also, once someone has joined, they can't exactly leave
unless everybody goes back to the login screen and starts again.
The same is true for starting a new game ---
have everyone press back and 'login' again.

!!! SCREENSHOT !!!

The card on the top left is the discard pile.
Under that is the history,
which you should use to confirm the state of the game.
The player list highlights your name,
and can be used to know who should be playing next.

If there are any incorrect moves,
you can simply press 'Undo'.
