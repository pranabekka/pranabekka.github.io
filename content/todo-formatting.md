+++
title = "Todo Formatting"
date = 2023-05-21 00:03:47
updated = 2023-05-21 00:03:47
+++

A way of visually organising your tasks 
to suggest which one is currently actionable,
which one can be acted upon next,
and which tasks depend upon which.
This can be used to create UIs,
organise tasks in a todo app,
or to organise tasks in a simple text file.

- First, write titles for projects.

  Projects can be of any size.
  Clearing out your desk could be a project.

  All tasks go under a project.
  One off tasks can go under a "more" title.

- Two, write the very next action you can perform on a project.

  Think of an action and write it down,
  then think of what you need to get that done
  and write that down.
  Repeat that until you can't reasonably break it down further.

- Put the next actionable step at the top of the project list.

- Indent dependent tasks below their blocker tasks.
  
  If action B requires action A to be complete
  before you can do action B,
  then put action B below action A and indent it.

  Tasks that depend on the same parent task,
  but not on each other,
  will go below that parent task and will have
  the same amount of indentation as each other.

Here's an example,
where i have to clean up my desktop folder:

```
desktop clean-up
  - copy list of files to notes
    - list possible actions under each item for
      where to put it or what to do with it
      - choose best action for each file
        - perform best action for each file
```

I don't yet know how to model tasks that depend on
two or more tasks ---
a possible method could be to put one parent task below the other,
even though it might not depend on the other parent task,
and then put the dependent task under both of them.

In my todo file, I replace the hyphen (`-`) with a simple `@` sign
to indicate tasks that are urgent or important to me.
Try to limit them to 5 or less.
I aim to make it more GTD compatible as it grows,
adding in project tags and actions lists,
or maybe I try writing a tool to extract tasks instead,
since moving items around will either create duplication
or mess up the dependency order.
