+++
title = "Simple UNO clone"
## remember to change date on publishing
date = 2024-05-26 04:53:55 # draft date
updated = 2024-05-26 04:53:55
## thumbnail?
+++

A simple peer-to-peer UNO clone,
which can be surprisingly difficult.

!!! SCREENSHOT !!!

## Constraints and requirements

I created this clone as a simple project
to take a break from the tutorial/guide I was following.
I had a few requirements/constraints:

- Web technology: Easy to access on any device.
- LAN: I'm not going to buy a server and host something.
  Plus, it's always fun to test out in the same room.
- Plain Javascript: I'm trying to learn Javascript.
  I broke this rule for a node websocket library,
  because it doesn't seem to have a good way to handle websockets.
- Peer-to-peer: I can't hold a server and a client in my head.
  It's easier for me to program just a single type of entity.
- No validation: Use a simple undo system for mistakes,
  or any attempts at cheating.
  Full validation for UNO is actually surprisingly difficult,
  plus I intend to play this with friends and family in the same room.
  Another benefit is that you can easily play with your own rules.
- User friendly: I'm creating this for non-programmers.

A note on the quality of the implementation:
I'm just learning to actually program,
and my biggest program before this
didn't even reach a 100 lines.

## Validation, or its lack thereof

The project actually stalled for several weeks
as I tried to figure out how to perform validation,
before I arrived at having no validation,
and including a simple undo system instead.

Most players don't even think of putting the wrong card,
especially when it comes to a computer game,
and you can just undo any mistakes or attempts at cheating.

## Project architecture

The server I have is super simple.
It listens on HTTP to serve the required files,
and it passes on websocket messages to all clients.
It also lists the local IP to connect to.

The root provides the login page.

The client is made out of several files.
There is a simple login page that redirects
you to an approriate URL

## TODO

- Highlight previous or current player,
  because it can be hard to track/parse
  using the current interface.
- Use peer-js. They provide a free server,
  so I can play online with people.
- Make an app: if I attempt to host the server on termux
  and also play the game, it will be sent to the background,
  which makes the game unplayable.
  An app can have the server and client in the same process,
  and it can also scan for games on the network.
- Validation? That's for after some time, if ever.
  Like I've mentioned, it's actually not required
  most of the time, and can even interfere
  if your rules are different from what's encoded.
