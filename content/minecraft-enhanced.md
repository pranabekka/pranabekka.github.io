+++
title = "Do More in Your Minecraft Worlds"
date = 2023-05-06 01:38:56
  # change updated when updated
updated = 2023-05-06 01:38:56
+++

<!--
TODO: link to /fill and /clone command use
-->

It's hard to get things done in a Minecraft world,
because you often don't have time,
and you can't achieve the things that you dream of,
especially the cool things you see from other people,
and maybe prototype in your creative worlds.
This is a set of rules to help you do cool things
in your Minecraft worlds,
including singleplayer,
as well as small multiplayer worlds with friends.

There's also a bonus solution at the end
to make the game more accessible
(in a looser sense of the word),
similar to the accessibility options of games like
[Celeste (Celeste Wiki)][access-celeste] and
[Rusted Moss (Article on Flying)][access-rusted-moss][^1].

NOTE: A lot of this is trust based,
and might not scale so well.
It works best with friends and acquaintances.

## The Problem

You can't build large things:

- Not enough time
- Not enough materials

You can't accumulate enough materials from your farms:

- Not enough time
- Can't AFK because you can't run Minecraft
  while doing other work.
  It slows your computer.
- Can't AFK because you can't keep your computer on.
  Possible reasons: high energy bills,
  having to carry your laptop around,
  unable to monitor computer,
  power cutoffs.
- Can't AFK because of poor networks.
- Can't AFK because you host a server from a personal computer,
  in which case the previous considerations apply.

## The Solution

- Offline Hours:
  When you're not playing on the server
  you build up a sort of currency called "Offline Hours".
  While the name says hours,
  you can time it down to minutes, half hours, or quarters.
  This currency can be spent on certain actions
  which have varying costs.
- AFK Simulation Rule:
  If you have an automatic farm of some kind,
  measure its output for 5--10 minutes and record it.
  You can now spend your "Offline Hours"
  and get the materials you would get for that amount of time
  by multiplying it with your measurements.
- Build Grind Rule:
  You can also establish an average baseline for
  how many blocks can be placed per minute,
  and spend your "Offline Hours"
  to fill/copy large amounts of blocks
  based on that amount.
  This can be used to copy repeated elements of a build,
  such as a large patterned wall,
  or to clear out a large area,
  for example.

## Bonus Rule: Additional Accessibility

NOTE: I'm using "accessibility" in a looser sense of the word,
not in the sense of a11y [^2].

This rule derives from my own frustrations with lag,
but they apply to any player
who might be disadvantaged in any way.
For example, they might not be hardcore gamers,
or they play with special hardware.
Other disadvantages include lag and rubberbanding.

- Accessibility Rule:
  Players with disadvantages have reduced penalties,
  or buffs to deal with their disadvantages.
  For example, they might keep their inventory whenever they die,
  or they could have extra health,
  or they could have permanent regeneration/resistance,
  or they could have other special items and/or abilities,
  such as flying
  or fire spells that damage hostiles in a given radius.
  See what the frustrations and needs of your players are.
  The rule need not apply at all times.
  For example, network effects can be temporary.

NOTE: The other rules are also about accessibility ---
they're about making certain parts of the game
more accessible to everyday players
who might not have enough time
to achieve the big builds they dream of.

## Implementation and Caveats

This is a largely trust based system.

The easiest way to run it,
is to calculate your Offline Hours, etc.,
and then use commands according to the rules.
The AFK rule can be achieved by using `/give`
after calculating how many items you should get.
The build rule can be achieved by using
the `/fill` or `/clone` commands.
Make sure to use the destroy option,
so that you get any blocks that are replaced (or "broken").
This is also the most flexible and powerful system.

Make sure to take regular backups
if you're relying on players to use the commands.
Maybe before each command,
or before you start up the server
(this is the same as backing up after closing the server).

People who are unfamiliar with the commands
can either learn to use them with some tutorials,
or they can rely on other people to run it for them.
If you're applying this to a server,
it would be ideal for the server admin to know them,
since they should be available when the server is up.

To make it easier for people who don't know commands,
you could set up trigger commands for them.
Trigger commands won't be able to do everything,
but they should let players do some things on their own.

If you have Minecraft modding experience,
that would be really cool ---
you could implement it
and share it with people who are
uncomfortable with commands.
Some additional accesibility features
are best achieved through mods, in fact.
However, try to not make them too invasive.

If people build up "too many" Offline Hours,
you can put a limit on how many they can make.
Make the decision based on the situation.

If you find yourself abusing commands in other ways,
you could create a process
which makes you take it more seriously.

For example, in a singleplayer world,
you can simply create a note,
and every time you use a command,
you put it into that note
with the time, the command,
and why you're allowed to use it
(number of Offline Hours, any other reasoning).
That note could also include how many Offline Hours you have.

If you're in a multiplayer world,
you can create a way to submit requests
and get them approved by at least on or two other members.
The admin or other operators could then fulfil these requests,
or you could trust players to responsibly fulfil them
once their request has been approved.
You can make it more or less strict as required.

## Conclusion

Make a simple set of rules for achieving things
without requiring prohibitive amounts of work.
The rules should reflect the costs and rewards
that you (and/or your players) find
reasonable and enjoyable.

Remember to fine tune the rules and rewards
according to your (or others') needs.
You don't want to make the game too easy,
or it won't be as rewarding,
nor do you want to make it too strict.
You must also communicate this to your players
and discuss matters with them
to create a fun environment for everyone.

[access-celeste]: https://celeste.ink/wiki/Assist_Mode

[access-rusted-moss]: https://araisegamer.com/rusted-moss-how-to-fly/

## Footnotes

[^1]: You can see the other options in the screenshots.
The basic instructions apply to those as well.

[^2]: https://en.wikipedia.org/wiki/Computer_accessibility
