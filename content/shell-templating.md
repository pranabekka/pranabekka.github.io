+++
title = "DIY (Fish) Shell Templating"
date = 2023-05-07 14:07:52
  # change updated when updated
updated = 2023-05-11 13:26:57
+++

If you've seen my note on creating a
[Static Site Build Tool](@/static-site-build-tool.md),
you might've seen the link to [pp](https://adi.onl/pp.html),
and that I lament the syntax and the fact that it uses ash/dash.
Turns out it's quite easy to implement in fish,
along with a syntax I prefer!

It started with me just going about my day,
when I remembered the `eval` command
and I started thinking of the pieces I might need
to create a parser/state machine of sorts in fish.
I tinkered a bit with some of the commands
I was thinking of,
and I managed to get it working quite well!

I haven't made a way of putting in variables
or reading and writing from a file,
and I haven't thought of too many edge cases,
but the basic functionality is there.

If I run `./parser.fish "the date is {{ date -I }}"`
it will give me the output `the date is 2023-05-07`

I've pasted in the whole thing,
as it currently is,
at the end,
if you're curious.

## How it Works

The basic way it works,
is it uses a variable to figure out
if it's reading normal text or command text.
If it's reading normal text,
it simply passes it along to stdout,
and if it's reading command text,
it gathers that into a string,
then runs `eval` on it,
which spits out its output to stdout.

## Future Work

I want to be able to parse files
instead of just strings.
The answer might be somewhere in `string join \n $fileContents`.

When parsing files,
it would be useful to provide variables for substitution.
Perhaps it could be done by specifying environment variables
in the same line as the command.
Something like `VAR=val fish-template str "{{ echo $VAR }}`.
Another way would be a syntax for keys and values.
Perhaps `--variables "key1: val1; key2: val2"`.

A short syntax for variable expansion might also be nice.
Something like `{{ $var }}` or `{$ var $}`

It would be cool to have a way to limit its scope,
depending on where it's being called from.
Include a list to allow certain commands,
as well as one to block some.
If the first the command isn't in the allow list,
or is present in the block list,
then raise an error instead of evaluating it.

In a similar vein, providing additional commands would be great.
A simple way is to create commands in a `bin/` directory
and then run them with `{{ ./bin/my-command }}`,
but a shorter syntax would be quite useful.
Perhaps use the `bin/` directory
with a syntax like `{{ @my-command }}`?
Or simply `{{ my-command }}`,
such that if `my-command` is not installed,
it would look in the bin directory.

It is ideal that the template evaluation
takes place from a specific directory.
Especially if relying on file operations
or something like a `./bin/` directory.
When calling the command on a template file,
ensure the current working directory
is the same as the file's parent directory,
unless specified otherwise.
Changing directories in the script
sounds like a potential footgun,
since it's implicit behaviour that people will not be aware of.
An easy flag, then,
to execute in the context of the template file's folder.
So `--dir < current | file-dir | <path> >`,
where <path> is relative (starting with `./`) or absolute.

It would also be great to have all commands in the file/template
evaluate in the same context.
This way a variable declared at the top
could be used in a command further down.
Currently, it spawns subshells using the `eval` command.
Maybe it could use `source` or a flag in `eval`?
Another approach might be to gather content
as an `echo $content` command
along with the other commands in the given sequence,
then calling all the echo and other commands
using a single `eval` command at the end.
Use `string escape` to prevent unwanted expansions.

## Code

```fish
set parserMode normal
set command ''

echo $argv[1] | while read -n 1 char
  switch "$parserMode $char"

    case 'normal {'
      set parserMode open-brace

    case 'open-brace {'
      set parserMode command-mode
      set command ''

    case 'open-brace *'
      set parserMode normal
      printf '{%s' $char

    case 'command-mode }'
      set parserMode close-brace

    case 'close-brace }'
      set parserMode normal
      # echo \'$command\'
      eval $command

    case 'close-brace *'
      set parserMode command
      set command "$command\}$char"

    case 'command-mode '
      # newline creates '' when read
      set command "$command ; "

    case 'command-mode #'
      set parserMode comment

    case 'comment '
      # newline creates '' when read
      set parserMode command-mode
      set command "$command ; "

    case 'command-mode *'
      set command "$command$char"

    case 'normal '
      # newline creates '' when read
      printf \n

    case 'normal *'
      printf %s $char
  end
end
```
