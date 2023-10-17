outline:

- *Update Date*
- Wrap tables in a .tablewrapper div
- Footnotes heading

## Update Date

Remember to update the "updated" date in the frontmatter,
when you update a post.

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

## Footnotes heading

Add `## Footnotes` above footnote references,
at the end of the page.

Another option is to detect in template,
but I've been avoiding them,
so it's wasted effort.
Reason: asides should be closer to the marker.
In the paper age, it meant on the same page.
