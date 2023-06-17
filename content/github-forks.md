+++
title = "Github Forks"
date = 2023-05-13 21:10:13
updated = 2023-05-13 21:10:13
+++

"Forks" in Github should probably be called "clones".
That's basically what they are.
Other related terms are "remotes" and "mirrors".

## What "Forks" Stand For

Outside of Github, a "fork" is a project
that takes the code of one project
and seeks to establish itself as its own project,
with a different name and branding,
as well as different features and code fixes.

In Github parlance, a "fork" is used to mean
a clone of a repository to which you've made some changes,
before you can send those changes forward via pull requests.
It's not meant to be an independent project,
simply a mirror of your personal copy of the project.

## Reasoning and Conclusion

I guess Github was worried about the difference between
cloning it onto your machine versus your Github space.
In that case, call it a "Github Clone" or "Remote Clone"?
"Clones" is the more accurate term
because you're `git clone`-ing a repo to create a personal copy to mess with.

The git term "remote" is meant for other locations of a repository.
Technically, it's not a remote ---
your copy is not (automatically) a remote to the original copy,
although the original project should be a remote of your copy.
But it is a clone on a (Github) remote.

So 'Remote Clone'.

I wonder what the process is for (remote) git interfaces like
Sourcehut, Gogs (and descendants like Gitea and Forgejo),
and any other interactive ones.
