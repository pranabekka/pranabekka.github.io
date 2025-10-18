+++
title = "Connect 4 Gleam"
date = 2025-10-18 01:05:15
updated = 2025-10-18 01:05:15
+++

Making a little Connect 4 TUI in Gleam.

I like looking for little projects to work on,
though sometimes I guess the scope incorrectly.
Also, I'm prone to overthinking things
and trying to get it perfect,
which means tweaking things and going back and forth
on the smallest details.
For example, how should I model a grid cell?
Is it one of empty, red and yellow,
or is it empty and full, with full containing a piece?
I'm usually inclined towards piece being separate,
but I can't articulate why,
which makes me a bit uncomfortable.

Anyway, I was thinking of Ludo a while back,
and I realised setting up the board
would be a lot of work,
so I wondered how I might render it in the terminal.
I never really got around to it,
but one day I remembered Connect 4,
and I realised that's perfect for a CLI!

```
1 2 3 4 5 6 7
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ O _ _
_ _ _ _ X O _
_ _ _ O X X _
```

Connect 4 usually has 7 columns and 6 rows,
and I can use simple letters for the pieces.
I picked X and O from knots and crosses,
though I've seen people use emojis,
which is also a fine idea.

I managed to theorise about the perfect
board representation as well, by the way.
I started off with two wide columns,
Rd and Bk for Red and Black pieces,
dashes for empty cells,
and zero padded numbers for the columns.

Yikes.

Oh, the reason I picked Gleam
was because the language is so interesting,
so even though I don't see any particular use for it,
I felt like implementing a small project in it,
which made Connect 4 seem like a decent idea.

I've been hitting roadblocks with
functional programming since then,
partly because I'm trying to get it right.
I probably should have ended it there
and come back later to improve the code,
but here we are, over a month later,
and I still haven't finished it,
because I think lots and do little.

Oh, well.

What I like about type systems like Gleam
is how easy it is to model things.
I have pieces which can be X or O,
cells which can be empty or filled with a piece,
rows which are a list of cells,
and a grid which is a list of rows.

```
type Grid = List(Row)

type Row = List(Cell)

type Cell = Option(Piece)

type Piece {
	X
	O
}
```

Ahhh, and pipes are so nice.
I was already critical of objects,
but even procedural languages
can't do pipes like this.

```
const height = 6
const width = 7

fn grid_new() -> Grid {
	list.repeat(Empty, width)
	|> list.repeat(height)
}
```

I even wrote a test for this,
though I did that... let me look it up
--- just 7 days ago.
Huh, it feels like it's been longer.

Ah, and I used `Option(Piece)` for the cell.
I'm thinking that's an odd choice right now.
It really doesn't matter that much,
but, as I've already established,
this is my specialty.
Let me have it.

This feels like a case of primitive obsession.
It's better to have custom types where possible.
Not using a list for the row and grid
has terrible ergonomics,
but options use the built-in types feature,
so the only difference is importing a general type.
Dang, I must fix it to use a custom type.

```
type Cell {
	Empty
	Full(Piece)
}
```

Well.

I'm sorry! But I simply must overthink this.
I cannot help myself.

I don't see what benefits the custom type gives.
A cell will always be either empty or full.
It can never be partially full.
The custom type does give a better name though.
Let's stick with it.

Sorry.

Anyway, after making a grid,
we must print the thing.
Initially I put it all into a single function
with lots of case statements,
but as I was implementing it in Rust (what can I say),
I was encouraged to have a string function for each type.
The Rust display trait is weirdly complicated, by the way.
Anyway, I made a string function for each type,
delegating down the chain for each new one.

```
pub fn grid_string(grid: Grid) -> String {
	list.map(grid, row_string)
	|> string.join("\n")
}

pub fn row_string(row: Row) -> String {
	list.map(row, cell_string)
	|> string.join(" ")
}

pub fn cell_string(cell: Cell) -> String {
	case cell {
		Full(piece) -> piece_string(piece)
		Empty -> "_"
	}
}

pub fn piece_string(piece: Piece) -> String {
	case piece {
		X -> "X"
		O -> "O"
	}
}
```

Such nice and pretty little functions.
Did you notice how readable it is
with the pipes and implicit returns?
Mmmm, delicious. Chef's kiss.

My first stumbling block was here.
I needed to put a piece in the board,
and it must drop all the way down
to the last empty cell in the column.

I was thinking in the imperative style
and spent several hours
browsing the standard library and experimenting
to write the perfect function
to get the correct cell to put the piece.

But Gleam deals with values, not references.
I can't do `a.b.c = X`.

I came back a few days later, I think,
after I saw the `dict.insert` function,
which will replace a value if the key exists.
I got it to work and began to write about it,
but turning a few days into a few words
helped me realise that it was a roundabout way
to do something like `a.b.c = X`.
It felt like the wrong way to do it.

I've put the code using dictionaries below.
While it might look a bit complicated,
it's actually much easier than figuring out lists.

Maybe I should've gone with the dictionary
instead of making my life hard.

Oh, well.

I'll get into handling lists in another post.

```
type Grid = Dict(Int, Row)

type Row = Dict(Int, Cell)

fn grid_new() -> Grid {
	let number_update = fn(entry: #(_, _), idx) {
		#(entry.0 + idx, entry.1)
	}

	let row = list.repeat(#(1, Empty), width)
	|> list.index_map(number_update)
	|> dict.from_list
	
	list.repeat(#(1, row), width)
	|> list.index_map(number_update)
	|> dict.from_list
}

fn grid_update(grid: Grid, piece: Piece, column_number: Int) {
	let column = dict.fold(grid, [], fn(column, row_number, row) {
		// SAFE: We make sure the user inputs a valid column number.
		let assert Ok(cell) = dict.get(row, column_number)
		[#(row_number, cell), ..column]
	}

	let empty_row_result =
		column
		// Column got reversed, so this starts from bottom.
		|> list.find(fn(row) { row.1 == Empty })
	
	case empty_row_result {
		Ok(#(row_number, _)) -> {
			// SAFE: The row_number was generated from the grid.
			let assert Ok(old_row) = dict.get(grid, row_number)
			let new_row = dict.insert(old_row, column_number, Full(piece))
			dict.insert(grid, row_number, new_row)
		}
	}
}
```
