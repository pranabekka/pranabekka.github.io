+++
title = "static-site-generator.lock"
## remember to change date on publishing
date = 2025-12-05 21:33:57 # draft date
updated = 2025-12-05 21:33:57
+++

A lock-file to automatically manage dates in SSGs.

```
ssg-lock.md
	created 2025-12-05 21:33:57
	modified 2025-12-05 23:57:22
	published 2025-12-06 10:13:27
```

SSGs require tracking dates manually
because dates in file metadata can get erased.
This requires the ability to
keep track of them outside filesystem metadata,
and correcting them in case of issues.
All the SSGs I know of require adding it to the file,
maybe with a sub-command to add the date on creation.
The better solution is a lock-file,
which will be updated automatically.

The lock-file would not be a hidden file like a cache.
Users will be expected to copy it
or track it in their version control system.

When you run the SSG,
it gets the date for unknown files from the filesystem
and adds them to the lock-file.
It can also track modification times in the lock-file
and update them for existing and new files.
Integration with external tooling, such as a VCS,
can ensure the lock-file is completely up to date.
Integration with the site publishing system,
such as build and deploy services,
can also track publishing dates in the lock-file.
Manual edits can be preserved using an "override" key.
This information might be managed
directly in the markup file,
especially for existing SSGs.

This reduces the chance for errors
and makes sites easier to manage.

You can even write actual markdown for your content.

```
# static-site-generator.lock

A lock-file to store dates in SSGs.

````
ssg-lock.md
	override
		created 2026-12-05 21:33:57
````
```
