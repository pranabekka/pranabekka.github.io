+++
title = "How to score bowling"
## remember to change date on publishing
date = 2024-11-23 22:39:56 # draft date
updated = 2024-11-23 22:39:56
+++

Each player gets 10 rounds, with 2 throws each round,
and bonus throws on the 10th.

The 10th round has bonus throws
if you knock down all the pins.

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 10,n --><div data-element="frame-container"><div data-element="frame-label">Round 1</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">10</div><div data-element="throw"></div></div><div data-element="score"><aside>0+10=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 2</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 3</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 4</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 5</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 6</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 7</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 8</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 0,0 --><div data-element="frame-container"><div data-element="frame-label">Round 9</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">0</div></div><div data-element="score"><aside>10+0=</aside>10</div></div></div>
		<!-- frame: 2,8,3 --><div data-element="frame-container" data-final-frame><div data-element="frame-label">Round 10</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">2</div><div data-element="throw">8</div><div data-element="throw">3</div></div><div data-element="score"><aside>10+13=</aside>23</div></div></div>
	</div>
	<style>
		[data-element="bowling-score-card"] {
			display: flex;
			flex-wrap: wrap;
			gap: .5rem;
		}
		[data-element="frame-box"] {
			border: 1px solid var(--fg);
			min-width: 4.5rem;
			height: 3.5rem;
		}
		[data-element="throws"] {
			display: flex;
			justify-content: end;
		}
		[data-element="throw"] {
			border-left: 1px solid var(--fg);
			border-bottom: 1px solid var(--fg);
			width: 1.5rem;
			aspect-ratio: 1;
			padding: 0 .2rem;
			text-align: center;
		}
		[data-element="score"] {
			text-align: center;
			margin: .25rem .5rem;
		}
		[data-element="bowling-score-card"] aside {
			display: inline;
			color: var(--fg-dim)
		}
	</style>
	<figcaption>
		Annotated bowling score card.
	</figcaption>
</figure>

For each round, the pins knocked down in each throw
are marked at the top of the box for that round.
In the bottom half, the score for that round
is added to the score for the previous rounds.

If you're curious about the jargon,
each round is called a "frame",
and each throw is called a "roll".
I won't use these terms,
because they don't add much to the explanation,
and they're trivial to remember over time.

Let's get to it.

Each round is worth the number of pins knocked down,
plus any bonus points for knocking down all the pins.

If you knock down all the pins
in the *first* throw of a round,
then add up the next two throws
as bonus points for the current round.
This is called a strike.

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 10,n --><div data-element="frame-container"><div data-element="frame-box"><div data-element="throws"><div data-element="throw">10</div><div data-element="throw"></div></div><div data-element="score">+10+2+3</div></div></div>
		<!-- frame: 2,3 --><div data-element="frame-container" data-reference><div data-element="frame-box"><div data-element="throws"><div data-element="throw">2</div><div data-element="throw">3</div></div><div data-element="score">+2+3</div></div></div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example 1 for knocking down all pins in one throw.
		Look at how the 2 and 3 from the next two throws in the next round
		is added to the current round as a bonus.
	</figcaption>
</figure>

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 10,n --><div data-element="frame-container"><div data-element="frame-box"><div data-element="throws"><div data-element="throw">10</div><div data-element="throw"></div></div><div data-element="score">+10+10+4</div></div></div>
		<!-- frame: 10,n --><div data-element="frame-container" data-reference><div data-element="frame-box"><div data-element="throws"><div data-element="throw">10</div><div data-element="throw"></div></div><div data-element="score">+10+4+1</div></div></div>
		<!-- frame: 2,3 --><div data-element="frame-container" data-reference><div data-element="frame-box"><div data-element="throws"><div data-element="throw">2</div><div data-element="throw">3</div></div><div data-element="score">+4+1</div></div></div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example 2 for knocking down all pins in one throw.
		Notice how the next two throws after it
		are in two different rounds.
	</figcaption>
</figure>

If you knock down all the remaining pins
in the *second* throw of a round,
then add the first throw from the next round
as bonus points for the current round.
This is called a spare.

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 3,7 --><div data-element="frame-container"><div data-element="frame-box"><div data-element="throws"><div data-element="throw">3</div><div data-element="throw">7</div></div><div data-element="score">+3+7+1</div></div></div>
		<!-- frame: 1,5 --><div data-element="frame-container" data-reference><div data-element="frame-box"><div data-element="throws"><div data-element="throw">1</div><div data-element="throw">5</div></div><div data-element="score">+1+5</div></div></div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example 1 for knocking down remaining pins on second throw.
		Notice how the 1 from the next round's first throw is added to the first round's score.
	</figcaption>
</figure>

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 0,10 --><div data-element="frame-container"><div data-element="frame-box"><div data-element="throws"><div data-element="throw">0</div><div data-element="throw">10</div></div><div data-element="score">+0+10+3</div></div></div>
		<!-- frame: 1,5 --><div data-element="frame-container" data-reference><div data-element="frame-box"><div data-element="throws"><div data-element="throw">3</div><div data-element="throw">2</div></div><div data-element="score">+3+2</div></div></div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example 2 for knocking down remaining pins on second throw.
		Notice how even though they got all 10 pins in one throw,
		they didn't get it on the first throw,
		so it only adds 1 bonus throw.
	</figcaption>
</figure>

On the 10th round,
if you knock down all the pins,
you get bonus throws to calculate bonus points.
The pins knocked down in bonus throws
are only for calculating the bonus points.
So if you knock down all the pins in the first throw,
you get two bonus throws,
but if you knock down all the pins on the second throw,
then you only get one bonus throw.
Otherwise, you get no bonus throws.

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 10,8,3 --><div data-element="frame-container" data-final-frame><div data-element="frame-label">Round 10</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">10</div><div data-element="throw">8</div><div data-element="throw">3</div></div><div data-element="score">+10+8+3</div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example for knocking down all pins on the first throw of the 10th round.
		Here, the second and third throw are bonus throws to calculate the bonus points.
	</figcaption>
</figure>

<figure>
	<div data-element="bowling-score-card">
		<!-- frame: 5,5,3 --><div data-element="frame-container" data-final-frame><div data-element="frame-label">Round 10</div><div data-element="frame-box"><div data-element="throws"><div data-element="throw">5</div><div data-element="throw">5</div><div data-element="throw">3</div></div><div data-element="score">+5+5+3</div></div>
	</div>
	<style>
		[data-reference] [data-element="frame-box"] {
			border: 1px dashed var(--fg);
		}
		[data-reference] [data-element="throw"] {
			border-left: 1px dashed var(--fg);
			border-bottom: 1px dashed var(--fg);
		}
	</style>
	<figcaption>
		Scoring example for knocking down all pins on the second throw of the 10th round.
		Here, only the last throw is a bonus throw to calculate the bonus points.
	</figcaption>
</figure>
