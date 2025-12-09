+++
title = "Dates in your SSG"
## remember to change date on publishing
date = 2025-12-05 21:33:57 # draft date
updated = 2025-12-05 21:33:57
+++

'Tis incidental work the SSG should manage.

All SSGs I know of make people do the work for dates,
instead of just focusing on writing. 
They won't even do any checks for them.
I've forgotten to update the date many times,
and I have several commits to fix dates.
I've probably even missed a few.

```
---
title: Dates in your SSG
## DRAFT DATES - remember to change on publishing
date: 2025-12-05 21:33:57
updated: 2025-12-05 21:33:57
---

Getting it to do the all the work itself.
```

SSGs require tracking dates manually
because dates in file metadata can get erased.
This requires the ability to
keep track of them outside filesystem metadata,
and correcting them by hand in case of issues.

I'd like the SSG to get the dates from the computer
and just save the dates to the file whenever it runs.
The file system exposes creation and modification dates,
and once they're added to the file,
the risk of loosing that data is gone.
If the creation date is missing, it'll be added.
If the modification date is newer than the current,
it will be updated in place.
You can also override it in case something goes wrong.

The most interesting feature is
tracking the published date.
My posts are published by pushing it to a Git repo,
so the nicest way is using a pre-push hook.
Whenever I push to `origin/main`,
the hook should run the SSG to check
if I'm publishing any new posts,
and if I am, it should add in a published date,
followed by a quick commit and push.
I'd also use a pre-commit hook to update modification dates
with the commit that changes the file.

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

I feel like SSGs should use hooks more often anyway.
It'd be nice for the SSG to check your work on commit.
You can catch build failures before CI surprises,
and you don't need to manually run the SSG.

Anyway, automatic dates!
I'll probably add in my own hooks for them.
I guess that's why we use plain text and CLI tools.
