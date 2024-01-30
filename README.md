outline:

- **Update Date**
- TODO
- Wrap tables in a table() shortcode
- Footnotes near reference

## Update Date

Remember to update the "updated" date in the frontmatter,
when you update a post.

## TODO

- [ ] replace sass vars with css vars
  makes built css clearer
- [ ] use black and white from main.sass in happycog.html

## Wrap tables in a table() shortcode

```
{% table() %}
| header | header |
| ------ | ------ |
| item   | item   |
{% end %}
```

This is required to make them overflow properly,
otherwise tables mess up the size of the page and other elements
when they are wider than the viewport.

The shortcode wraps the table inside a tablewrapper div.

## Footnotes near reference

Add in the footnotes right after
the paragraph where they're referenced.
