+++
title = "Making UNO is hard"
## remember to change date on publishing
date = 2024-05-30 19:16:38 # draft date
updated = 2024-05-30 19:16:38
+++

You should try making it yourself.
I chose it as a "simple" project
to have something other than endless tutorials,
but it actually took me several months
(probably because I'm a total beginner).

## The journey

I started out with generating the deck,
then dealing cards to a player,
making styles for layouts and cards,
and finally coming around to modeling the game proper.

At this stage I started out trying to hook it up
with my deck generation and dealing logic,
before I had to stop and starting taking notes.

### The tough bit

I needed to know what information
the game would need for validation,
the exact rules we play by,
and solutions to all the edge cases that might occur,
for which I even asked some family members.

For example, think of a turn where
you challenge the previous player, who played a draw 4,
and you succeed, then you pick a card
(to match the colour they chose?),
and then you play the card you picked,
because it's a valid card to play.

Or consider how you'll allow anyone to catch
the last player to finish their turn
if they forgot to say UNO
(assuming you play by those rules).

### Giving up

I made several small prototypes,
with variables like drawSum, isActive,
direction, currentPlayer, currentPlayerIdx,
discardPile, initialPlayers, prevCard, and more.

On top of that, I had to figure out project architecture,
because this is my biggest project by a significant margin,
so I gave up at that point, focussing on other things
and trying to process it in the back of my mind.

### An undo system

I finally started again after two or three months,
when I figured that I could remove all validation.
Even after the idea entered my occassional pondering,
it took me some time before I could accept it.

I think, if I were to do it again,
I'd store all the validation state in variables,
and the cards would be a separate system
that interact with validation state
at one or two places like placement and starting turn.
Maybe I'd also go for a server-client structure.

## The game

I eventually landed on a peer-to-peer system,
with a server hosting the pages and passing messages:

{% borderImages() %}

![juan-cards started game](/juan-cards-2.png)

Players need to see what's on the discard pile,
a general sequence of players [^1],
along with the number of cards in their hand,
a history to track what cards were played,
and their hand, of course.
Because there's no validation,
there's also an 'Undo' button.

[^1]: though the screenshot only shows 1 :p

![juan-cards lobby](/juan-cards-0.png)

The login page is actually stupidly simple ---
it redirects you to `/u/{user-name}`,
and the game logic reads the user-name from the URL.
They basically have no relation to each other.
You could skip past the login page to join.

![juan-cards unstarted game](/juan-cards-1.png)

Until the game is started, there's a 'Start' button,
which disappears when you press it.

<!-- TODO: add draw dialog -->

{% end %}

## Conclusion

Overall, I'm quite happy that I finished this project,
even if I don't have any validation.

The undo system actually works quite well,
because people don't actually think of cheating,
and I'm playing with people who I've played
with in-person, using physical cards,
which has basically the same mechanics.

As for the peer-to-peer architecture,
I chose it because I found it easier to conceptualise
a single type of entity talking to more of its type,
instead of trying to figure out the server/client divide.

## Try the official UNO 2 GO by Mattel

By the way,
you should install UNO 2 GO on your respective
(mobile) app store.

When you first start the game,
make sure to keep sounds on and don't skip anything.

## Additional implementation notes

- 4 types of messages:
  - join: -
  - playerList: -
  - start: -
  - draw: -
  - play: -
  - undo: -

- I simply redraw whole 'components'
  if their data model changes.
  It's basically instant,
  and anything more complex would take more time.

  'Components' include the hand, player list, and history.

- Cards have an ID, because I wanted to track
  which card should be moved ---
  if somebody has two green 2s,
  the one they press should be the one that moves.

- aspect-ratio: quite useful,
  except on a particularly old phone
  which we had to resurect to fill in for another
  that met its untimely demise.
  Even then it worked well enough.

- So many divs, just to make styling easier.
  I didn't want to deal with browser specific button styles.

- The history scrolls automatically.
  Maybe I should include a video.

- Highlight self in player list.

## TODO

There's a few things that could be used
to improve the game right now,
and a few ideas I'm considering for after
I've progressed further in the tutorial [^1].

[^1]: [javascript.info](https://javascript.info), btw.
It's free, concise, comprehensive, and includes good exercises.

- Highlight the last player to play or draw a card.
  This should make it easier to track the game,
  because it can be hard to parse the text.

- Draw arrows in player list,
  and change direction if play card value is reverse.
  Will need to account for it in undo as well.

- Highlight if new card on discard pile doesn't match old.
  Only if it's particularly hard to track,
  but I find the idea of (lighthearted) cheating fun ---
  we usually don't take UNO too seriously.

- Use a host/join architecture,
  which can be used in peer-to-peer games as well.

- Try peer-js. They have a free server for passing messages,
  so I could play online with people.

- Handle disconnects.
  This would probably require a server-client implementation.
