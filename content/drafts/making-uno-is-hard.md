+++
title = "Making UNO is hard"
## remember to change date on publishing
date = 2024-05-30 19:16:38 # draft date
updated = 2024-05-30 19:16:38
+++

I tried making UNO as a "simple" project
to have something other than endless tutorials,
but it turned out to be much harder
than I anticipated.

You should try to make one of your own
if you haven't tried.
The first step will be formalising your home rules,
then figuring out all the edge cases
and maybe discussing them with people.
Then you start dealing with hand size,
player count (reverse with two players),
draw sum (stacking multiple draw cards),
whether card is active or not, etc.

On top of that, I had to figure out project architecture.
This is my biggest project by a significant margin.

So I actually gave up on validation completely,
after considering various strategies for weeks.
I think, if I were to do it again,
I'd store all the state in variables,
and store the cards only as visuals.
Maybe I'd also go for a server-client structure.

{% borderImages() %}
![juan-cards started game](/juan-cards-2.png)

![juan-cards lobby](/juan-cards-0.png)

![juan-cards unstarted game](/juan-cards-1.png)
{% end %}

Instead, I settled on a peer-to-peer architecture,
with absolutely no validation,
and an undo system instead.

The undo system actually works quite well,
because people don't actually think of cheating,
and I'm playing with people who I've played
with in-person, using physical cards,
which has basically the same mechanics.

As for the peer-to-peer architecture,
I chose it because I found it easier to conceptualise
a single type of entity talking to more of its type,
instead of trying to figure out the server/client divide.

***

By the way,
you should install UNO 2 GO on your respective
(mobile) app store.
