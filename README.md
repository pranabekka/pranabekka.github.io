outline:

- **Update Date**
- Wrap tables in a table() shortcode
- Footnotes near reference
- TODO

## Update Date

Remember to update the "updated" date in the frontmatter,
when you update a post.

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

## TODO

### site changes

- [ ] image compression.
  site currently serves pretty large images.
  pair with multiple alternative sources in html.
  zola has support for this ---
  just need to hook it up
- [ ] replace sass vars with css vars.
  makes built css clearer
- [ ] link checker
- [ ] grammar checker.
  i tend to miss things as i edit a post.
  lots of cli tools for languagetool, even offline.
  other option is just a careful read-through.
- [ ] html lint.
  prolly don't need it at this scale.
  most of the html is auto-generated.
- [ ] feed validation

### others

- [ ] use black and white from main.sass in happycog.html
