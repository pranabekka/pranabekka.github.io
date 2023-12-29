outline:

- **Update Date**
- TODO
- Wrap tables in a .tablewrapper div
- Footnotes near reference

## Update Date

Remember to update the "updated" date in the frontmatter,
when you update a post.

## TODO

- [] replace sass vars with css vars
  makes built css clearer
- [] use black and white from main.sass in happycog.html

## Wrap tables in a .tablewrapper div

```
<div class="tablewrapper">

| table | table |
| ----- | ----- |
| item  | item  |

</div>
```

Remember to add the spacing before and after the table syntax.

This is important to make them overflow properly,
otherwise tables mess up the size of the page and other elements.

**NOTE:** Zola (0.17.2) doesn't actually allow Markdown inside HTML.
(Create and) use a shortcode that takes in Markdown content,
and renders it inside a tablewrapper div.

## Footnotes near reference

Add in the footnotes right after
the paragraph where they're referenced.
