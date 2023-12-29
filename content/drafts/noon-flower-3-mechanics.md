+++
title = "Noon-Flower Mechanics"
date = 2023-12-29 10:35:08
updated = 2023-12-29 10:35:08
+++

When you first have an idea
(such as ["What if Minecraft and CrossCode had a baby"](@/noon-flower.md))
it seems quite simple,
but as you get into it you realise
there are a lot of challenges to solve
in order to make it a reality.

(Noon-Flower was previously called Wijo)

For example, here's some of the stuff
I'm trying to work through for Noon-Flower:

- How do you show players and other creatures behind a wall?
- How do you show players and other creatures under a floor?
- How do you show changes in elevation?
- How do you show multiple changes in elevation?

  For example, if the tile you're looking at is actually two levels down,
  how do you know that it's two and not one?

**NOTE**: When I describe Noon-Flower, I'm describing the idea of a game.

## Multi-Level

Noon-Flower has multiple elevations.
I've gone back and forth on it a little bit,
but it simply adds so much value and depth to the game.
By multiple elevations,
I mean that you can go up and down as well,
like a 3D game.

The art style will be a mixed top/front view for the blocks,
and a front view for characters and other sprites.
In this manner it's like CrossCode, as is the multiple elevations.
I think this art style is essential for depicting multiple elevations.

**[[[ IMAGE ]]]**

I'm considering using light and dark overlays
to depict higher and lower elevations,
along with a player controlled "wave"
that goes out from their position and shows the elevation,
like the scanners in Sci-Fi movies and games.
It'll be a block overlay of sorts;
probably go out for a limited range
and then go down (for a limited range),
indicating when it collides with a block.
The player will be able to trigger it whenever they want,
to ensure that the block across the gap is not higher,
otherwise they would just jump into it and fall down.

## Hiding Behind Blocks

There is one challenge with having front view blocks:
sprites can be hidden behind them.
While it's nice to have hiding mechanics,
players will have no clue that there's something behind the block,
which is quite unfair.

Otherwise, we could lean into it
and bake that ignorance into the AI as well,
such that they don't see sprites and blocks
hidden behind a wall.
I think that will raise implementation complexity.

Instead, within a certain range of the player,
make those blocks a little transparent.
So there's still a way to hide,
but if the player comes close enough,
they can see behind those blocks.

I think I'd have to mockup a hide and seek level
to ensure that hiding is doable and interesting.

## Fog of War

I believe this is a term used in some top-down strategy games,
where you don't see the enemy
until they're directly within your vision.

While we could probably get away with
showing any and all sprites on screen,
I think this is more mechanically interesting,
and enables a simple map view,
where you know what the layout of the land is,
(or was, at the time you saw it)
but not where the characters and creatures are.
So, if you're not nearby, looking at that area
of the map just shows you the land,
but not the creatures.

## Mapping

While I like the idea of creating and reading maps,
I also like being able to pan around the map freely.
It enables certain kinds of gameplay
and high fidelity maps.
Although, maybe I should prioritise a certain kind of gameplay,
even if I envision all the different kinds of games
that could be created with it
(see my [introduction](@/noon-flower.md)
comparing Minecraft to a game engine).
