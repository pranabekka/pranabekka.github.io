+++
title = "NAY Ain't YAML (2)"
## remember to change date on publishing
date = 2025-10-06 23:27:43 # draft date
updated = 2025-10-06 23:27:43
+++

YAML just ain't it.

They managed syntax rules more complex than Markdown.

1. Indentation uses however many spaces you like.
   Then more indentation depends on that?
   
   ```
   pretty:
    sure:
      this:
       is:
           valid
       maybe not:
        no clue
   ```

2. Nesting can go kinda wild,
   and the multi-line "flow" syntax
   uses funky spacing rules:
   
   ```
   i: {
     think: this,
     is: what,
     it's: like?,
    }
   ```
   
   The `}` needs to be at least a space past
   the line for the `{`.

3. Directives kinda weird.

4. Tags _really_ weird.

5. Only reference on the site is a spec.
   Ain't easy to read.

6. 63 ways to write strings, apparently.

7. There's several special symbols for values,
   and they'll do all kinds of odd things
   or fall back to strings if they fail.
   
   Take the Norway problem, for example.

Lot of advanced features better as extension,
like tags, directives, aliases, references,... objects?
Borrow extension design from config and policy langs
like CUE, KCL, Dhall n Nickel.

## Fix whitespace

Use tabs.
One per nesting level.

```
NAY:
	Ain't:
		YAML
```

Recommended tab width 3.
Two too little.
Four too much.
Can adjust to preference tho.

## List

```
*	NAY
	*	Ain't
		*	YAML
```

Tab after marker to align right.
Don't mix spaces.

Mixing spaces:

```
* NAY: Ain't YAML
  NAY:
	Ain't:
		YAML
```

Only tabs:

```
*	NAY: Ain't YAML
	NAY:
		Ain't:
			YAML
```

## Fix indentation hell

`}` closing uses same indentation
as line for `{` opening:

```
thout: {
any:
indentation;
at: all
}
```

End pairs with `;`.
`,` used way more often in values.
Use quotes for special chars in inline string.

```
{
NAY:
"Ain't: YAML";
}
```

Can also do strings:

```
NAY:
	Ain't: """
	YAML
	"""
```

And lists, as a matter of course:

```
NAY: [
Ain't;
YAML
]
```

## No type coercion

### Numbers

Starting with a number means
whole thing gotta be a number.

Any of these followed by a number
must also be valid numbers:
`.`, `-`, `-.`, `+`, `+.`.

Use quotes to use these for string.
Inline quotes will be part of string.

`#inf`, `#-inf` and `#nan` are also numbers.

```
errors:
	*	-12l8
	*	-1 is not fine
	*	#nan is not a number
not errors:
	*	-1
	*	- this is fine
	*	\#nan is not a number
```

Rules adapted from KDL.

### Booleans

`#false` and `#true`.

Copied from KDL.

### Special types

`#` for special types
like `#inf` and `#true`.
Can't use for strings; use backslash escape or quotes.

```
string: \#inf is for infinity
string: "#inf is for infinity"
```

Adapted from KDL.

## Type annotations

NAY don't care bout annotations.
Just gotta be in the right place.
Apps handle types.

Put type in `()` before `:`, like this:

```
accent (colour): "#f4de90"
background (colour): "#000000"
foreground (colour): "#b8b8b8"
```

Annotation must have space before `(`
and none between `)` and `:`.

Put list item type above item:

```
(this)
*	NAY
(relation)
*	Ain't
(that)
*	YAML
```

## Strings

Strings are wrapped by default.
Line breaks are converted to whitespace.

```
*	These strings are the same
*	These strings
	are the same
```

Initial indentation is ignored.
Further whitespace is preserved.

```
*	This one
		will have a tab
```

Escapes don't work.

```
*	This has \n as literal characters, no newline
```

Use `#"` to use escapes and preserve line breaks.

```
*	#"These strings\nare the same
*	#"These strings
	are the same
```

Use `#"""` and `"""#` to use escapes
and preserve line breaks
in delimited strings.

```
*	#"""
These strings
are the same
"""#
*	#"""
These strings\nare the same
"""#
*	"""
This one
isn't the same
"""
```

Double quotes are like any other character in the string,
unless there's three at the beginning like `key: """`.
Triple quotes aren't part of the string.

## Commenting

`# ` for comment.
At least one space after `#`.

```
# NAY: what?
NAY: Ain't YAML
```

Lines indented further than comment
also part of comment.

```
# No data here. Just two comments.
# NAY:
	Ain't:
		YAML
```

## ////

```
NAY:
	*	NAY
	*	Ain't
	*	YAML
Ain't:
	Ain't
YAML:
	*	YAML
	*	Ain't
	*	Markup
	*	Language
# but:
	i'd prolly use nestedtext
	wi' tabs n types
```
