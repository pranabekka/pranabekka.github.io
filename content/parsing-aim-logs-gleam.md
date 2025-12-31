+++
title = "parsing aim logs in gleam"
date = 2026-01-01 03:10:41
updated = 2026-01-01 03:10:41
+++

just some quick fun with the plain text logs.

based on michael lynch's post on trying gleam,
where he wants to take old chat logs in various formats
and put them all in the same file format.
he starts with the plain-text logs,
and i thought i'd have a go :)

[michael lynch's post](https://mtlynch.io/notes/gleam-first-impressions/)

## starting simple

plain-text log sample:

```
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

first, we `gleam new`.

```
gleam new aim_log_parser
```

because i'm just having fun,
i'll paste the test input into the main file.
plus it makes it easy to follow along
even in the online playground

```
const test_input =
	"Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005"
	<> "[18:44] Jane: hi"
	<> "[18:55] Me: hey whats up"
	<> "Session Close (Jane): Mon Sep 12 18:56:02 2005"
```

`gleam run` for fun, and gleam tells me
i can remove `test_input` because it's never used.
well, let's do something about that.

```
pub fn main() -> Nil {
	string.split(test_input, "\n")
	|> echo as "log lines"
	Nil
}
```

let's `gleam run` that

```
src/parse_aim_log.gleam:12 log lines
["Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005[18:44] Jane: hi[18:55] Me: hey whats upSession Close (Jane): Mon Sep 12 18:56:02 2005"]
```

ah, there's just one list item there.
i changed the input because it looked ugly,
but i forgot to add the line breaks.
i could use `\n`, but that doesn't feel much better.
let's just stick to copy-pasting the input.

```
const test_input =
"Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005"
```

and `gleam run` that

```
src/parse_aim_log.gleam:12 log lines
["Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005",
"[18:44] Jane: hi",
"[18:55] Me: hey whats up",
"Session Close (Jane): Mon Sep 12 18:56:02 2005"]
```

alright, we have 4 lines in the list.
processing a list usually means `list.map`,
since we want to go over each item.

feels like a sad chat, by the way

a message line starts with "[",
while the other two have
"Session Start" and "Session Close".

```
pub fn main() -> Nil {
	string.split(test_input, "\n")
	|> list.map(fn(line) {
		case line {
			"[" <> _ -> "Message"
			"Session Start" <> _ -> "Start"
			"Session Close" <> _ -> "Close"
			_ -> panic as "Unkown log entry"
		}
	})
	|> echo as "log lines"
	Nil
}
```

`gleam run`:

```
src/parse_aim_log.gleam:21 log lines
["Start", "Message", "Message", "Close"]
```

so we start message, exchange two messages, then close.
looks good.
let's pull out that function from `list.map`.
call it `parse_line`.
we'll add types soon.

```
pub fn main() -> Nil {
	string.split(test_input, "\n")
	|> list.map(parse_line)
	|> echo as "log lines"
	Nil
}

fn parse_line(line) {
	case line {
		"[" <> _ -> "Message"
		"Session Start" <> _ -> "Start"
		"Session Close" <> _ -> "Close"
		_ -> panic as "Unkown log entry"
	}
}
```

runs the same. always good to confirm.
could've forgotten the line breaks.

i'd normally start with types,
but we didn't really need them then.
now we want to store information.
let's turn the strings into types.

```
type LogEntry {
	Message
	SessionStart
	SessionClose
}

fn parse_line(line) {
	case line {
		"[" <> _ -> Message
		"Session Start" <> _ -> SessionStart
		"Session Close" <> _ -> SessionClose
		_ -> panic as "Unkown log entry"
	}
}
```

running it looks good.
we still have start, two messages and close,
but they're not strings anymore.

```
src/parse_aim_log.gleam:14 log lines
[SessionStart, Message, Message, SessionClose]
```

we can start saving information about the entries,
like the username and date or time.

i'll start with the messages.
they've got a time, an author,
and a body with the actual message contents.

```
[18:44] Jane: hi
            ^^ separates metadata and body
       ^ separates time and author
^-----^ wraps time
```

```
type LogEntry {
	Message(time: String, author: String, body: String)
	SessionStart
	SessionClose
}
```

first, we split the metadata and body on `: `.
gleam doesn't know, but we assure it
that splitting will always work.

```
let assert Ok(#(metadata, body)) = string.split_once(line, ": ")
```

then we split the metadata into time and author on ` `,
again assuring gleam that the split will succeed.

```
let assert Ok(#(time, author)) = string.split_once(metadata, " ")
```

then we construct a `Message` from that

```
fn parse_line(line) {
	case line {
		"[" <> _ -> {
			let assert Ok(#(metadata, body)) = string.split_once(line, ": ")
			let assert Ok(#(time, name)) = string.split_once(metadata, " ")
			Message(time, name, body)
		}
		"Session Start" <> _ -> SessionStart
		"Session Close" <> _ -> SessionClose
		_ -> panic as "Unkown log entry"
	}
}
```

a quick `gleam run`:

```
src/parse_aim_log.gleam:14 log lines
[SessionStart,
Message("[18:44]", "Jane", "hi"),
Message("[18:55]", "Me", "hey whats up"),
SessionClose]
```

looks good, just need to strip out the brackets.
we'll drop a character at the start and end for that

```
let time = time
	|> string.drop_start(1)
	|> string.drop_end(1)
```

`gleam run` that, and it looks good

```
src/parse_aim_log.gleam:14 log lines
[SessionStart,
Message("18:44", "Jane", "hi"),
Message("18:55", "Me", "hey whats up"),
SessionClose]
```

let's do the same for the session start and close.

```
type LogEntry {
	Message(time: String, author: String, body: String)
	SessionStart(name: String, datetime: String)
	SessionClose(name: String, datetime: String)
}

fn parse_line(line) {
	case line {
		"[" <> _ -> todo as "cut out for brevity"
		"Session Start" <> _ -> {
			let assert Ok(#(other_data, datetime)) = string.split_once(line, ": ")
			let assert Ok(#(_, name)) = other_data
				|> string.drop_end(1)
				|> string.split_once("(")
			SessionStart(name, datetime)
		}
		"Session Close" <> _ -> {
			let assert Ok(#(other_data, datetime)) = string.split_once(line, ": ")
			let assert Ok(#(_, name)) = other_data
				|> string.drop_end(1)
				|> string.split_once("(")
			SessionClose(name, datetime)
		}
		_ -> panic as "Unkown log entry"
	}
}
```

start and close are exactly the same
apart from the constructor's name,
so let's split that out to a function.
i even created a separate session info type
so that the new function can construct it directly
and then it can be put directly into the session entries,
instead of putting it together manually from tuples

```
type LogEntry {
	Message(time: String, author: String, body: String)
	SessionStart(SessionInfo)
	SessionClose(SessionInfo)
}

type SessionInfo {
	SessionInfo(name: String, datetime: String)
}

fn parse_line(line) {
	case line {
		"[" <> _ -> todo as "cut out for brevity"
		"Session Start" <> _ -> {
			parse_session_info(line) |> SessionStart
		}
		"Session Close" <> _ -> {
			parse_session_info(line) |> SessionClose
		}
		_ -> panic as "Unkown log entry"
	}
}

fn parse_session_info(line) -> SessionInfo {
	let assert Ok(#(other_data, datetime)) = string.split_once(line, ": ")
	let assert Ok(#(_, name)) = other_data
		|> string.drop_end(1)
		|> string.split_once("(")
	SessionInfo(name:, datetime:)
}
```

## starting with types

i think it's generally a good idea to think of types,
and then write them out and go from there.

while slinging strings gets some immediate output,
types help solidify our understanding of the problem
and discourage over-using strings and other built-ins,
because then the type system can't help you as much.
we'll also have to do less refactoring,
and the gleam lsp will help us a lot

so, we have a look at the sample log

```
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

and we see three types of log entries

```
type LogEntry {
	Message(time: String, author: String, body: String)
	SessionStart(name, datetime)
	SessionClose(name, datetime)
}
```

we know that having a SessionInfo type is useful,
and we can see that it's being repeat here,
but it also feels like extra typing at this point,
so i personally wouldn't have done it,
but i think the lesson is that you should probably
split out repeat info into it's own type,
because they'll be handled the same.

```
type LogEntry {
	Message(time: String, author: String, body: String)
	SessionStart(info: SessionInfo)
	SessionClose(info: SessionInfo)
}

type SessionInfo {
	SessionInfo(name: String, datetime: String)
}
```

from here, it's best to write a parser for each,
which i prefer over one big function
like we did before with `parse_entry`.
we can have it delegate to the individual ones

first, i'll change `main` a bit
because i like seeing something

```
const test_input =
"Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005"

pub fn main() -> Nil {
	let lines = string.split(test_input, "\n")
	echo lines
	Nil
}
```

`gleam run` that, and we see a list of lines.
cool, let's start parsing

```
pub fn main() -> Nil {
	string.split(test_input, "\n")
	|> list.map(parse_entry)
	|> echo as "entries"

	Nil
}

fn parse_entry(text: String) -> LogEntry {
	case text {
		"Session Start" <> _ -> parse_session_start(text)
		"[" <> _ -> parse_message(text)
		"Session Close" <> _ -> parse_session_start(text)
		_ -> {
			echo text as "unkown entry"
			panic
		}
	}
}
```

`gleam run` won't work right now.
it'll give errors because the functions don't exist.
we can use the lsp to generate the functions for us,
which is kinda nice

```
fn parse_session_start(text: String) -> LogEntry {
	todo
}

fn parse_message(text: String) -> LogEntry {
	todo
}
```

oop, we there's only two functions,
we copied `parse_session_start`
and forgot to change it to `close`.

alright, we'll parse session start.

```
// Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
// -------------- junk
// session info  --------------------------------------------------
fn parse_session_start(text: String) -> LogEntry {
	let assert "Session Start " <> data = text
	parse_session_info(data) |> SessionStart |> echo
}

// (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
//                           ------------------------ datetime
//                         -- separator
// ------------------------ name_parens
//  ---------------------- name
fn parse_session_info(text: String) -> SessionInfo {
	let assert Ok(#(name_parens, datetime)) =
		string.split_once(text, ": ")
	let name = name_parens
		|> string.drop_start(1)
		|> string.drop_end(1)
	SessionInfo(name:, datetime:)
}
```

i'm echoing the data in `parse_session_start`
because the `todo`s make it crash
before `main` shows anything.
the extra `echo` shows us some info
before the crash

```
src/parse_aim_log.gleam:45
SessionStart(SessionInfo("DumbAIMScreenName:Jane", "Mon Sep 12 18:44:17 2005"))
```

looks nice. we can parse the message

```
// [18:44] Jane: hi
//               -- body
//             -- separator
// ------------ metadata
//         ---- name
//        - separator
// ------- time_brackets
//  ----- time
fn parse_message(text: String) -> LogEntry {
	let assert Ok(#(metadata, body)) =
		string.split_once(text, ": ")
	let assert Ok(#(time_brackets, name)) =
		string.split_once(metadata, " ")
	let time = time_brackets
		|> string.drop_start(1)
		|> string.drop_end(1)
	Message(time:, author:, body:) |> echo
}
```

`gleam run` output looks nice
(before the crash; `parse_session_close` is still `todo`)

```
src/parse_aim_log.gleam:45
SessionStart(SessionInfo("DumbAIMScreenName:Jane", "Mon Sep 12 18:44:17 2005"))
src/parse_aim_log.gleam:78
Message("18:44", "Jane", "hi")
src/parse_aim_log.gleam:78
Message("18:55", "Me", "hey whats up")
```

finally, we parse `SessionClose`,
copying freely from `parse_session_start`,
while remembering to change "start" to "close"

```
// Session Close (Jane): Mon Sep 12 18:56:02 2005
// -------------- junk
// session info  --------------------------------------------------
fn parse_session_close(text: String) -> LogEntry {
	let assert "Session Close " <> data = text
	parse_session_info(data) |> SessionClose |> echo
}
```

`gleam run` now completes without a crash,
but with all entries shown again at the end

```
src/parse_aim_log.gleam:45
SessionStart(SessionInfo("DumbAIMScreenName:Jane", "Mon Sep 12 18:44:17 2005"))
src/parse_aim_log.gleam:78
Message("18:44", "Jane", "hi")
src/parse_aim_log.gleam:78
Message("18:55", "Me", "hey whats up")
src/parse_aim_log.gleam:86
SessionClose(SessionInfo("Jane", "Mon Sep 12 18:56:02 2005"))
src/parse_aim_log.gleam:13 entries
[SessionStart(SessionInfo("DumbAIMScreenName:Jane", "Mon Sep 12 18:44:17 2005")), Message("18:44", "Jane", "hi"), Message("18:55", "Me", "hey whats up"), SessionClose(SessionInfo("Jane", "Mon Sep 12 18:56:02 2005"))]
```

incidentally, i noticed one pattern repeated twice,
for stripping the square and round brackets,
which i could pull out into a separate function

```
fn drop_brackets(text: String) -> String {
	text
	|> string.drop_start(1)
	|> string.drop_end(1)
}
```

we're relying on the name for this to be used correctly,
and we're experienced devs so we won't abuse it
even in a small project like this.
if this ever became bigger
maybe we could check for brackets
and have an error otherwise?
or just not drop anything?
yeah, probably just don't touch the string
if there's no brackets

also, we could save the separators in variables,
and it might have the variable names as documentation
in a way?

also-also, gleam doc comments use three slashes,
after which it's parsed as markdown or djot,
both of which use the same code block syntax,
so we could generate pretty docs with `gleam docs`.
we also need to make the function `pub`
to have it show up in the docs

```
/// ```
/// Session Close (Jane): Mon Sep 12 18:56:02 2005
/// -------------- junk
/// session info  --------------------------------
/// ```
pub fn parse_session_close(text: String) -> LogEntry {
	let assert "Session Close " <> data = text
	parse_session_info(data) |> SessionClose |> echo
}
```

you'll need to `gleam docs build` that,
open the link in your browser,
then open the module name,
because it opens the readme by default

welp, that's about it

kinda fun.
i really do enjoy using gleam

could be fun to add `to_string`
to reconstruct the plain-text logs
from the parsed `LogEntry` types.
we'd need it to normalise all the logs anyway
