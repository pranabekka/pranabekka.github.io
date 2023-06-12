- Wrap tables in a .tablewrapper div
- Update Date
- `## Footnotes` heading
- NO `sn()` macro for internal links
- add in `extra.toc = true` for long posts

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


## Update Date

Remember to update the "updated" date in the frontmatter,
when you update a post.


## `## Footnotes` heading

before putting in the footnotes


## NO `sn()` macro for internal links

because the internally linked page is unable to
detect that it has been linked to
thus not showing it in backlinks.


## add in `extra.toc = true` for long posts

currently managed automatically
