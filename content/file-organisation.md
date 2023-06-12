+++
title = "Organising Your Files"
date = 2023-04-24 12:55:31
updated = 2023-04-24 12:55:31
+++

This is a pretty simple file storage method,
revolving around two folders and links.

The two folders here are your ‘Archive’ and ‘Inbox’.
The ‘Archive’ folder is where your organised files stay,
and the ‘Inbox’ folder is where new files come in.
The ‘Inbox’ folder is also where you place
files and folders that you are currently working on
— using links, not copying.

Links are special files that point to another
file or folder on your computer.
If you link to a file instead of copying it,
whenever you edit a file
it will actually edit the original file,
and the links will continue to point to the same file
along with the edits you made.
I believe links are known as ‘shortcuts’ in Windows
and ‘aliases’ in MacOS.
There are a few more things to know about links,
which I’ve mentioned further below.

## The Archive and Project Folders

The ‘Archive’ folder is where your files will always end up,
in a clean and organised format.

The basic way to organise your files is to
keep them in project folders.
That is, files that are part of the same effort
are put into the same folder.
And if you have files that are used in multiple projects,
then you put them in a separate folder and use links.

You only need a project folder if that project has multiple files.
However, if there will soon be multiple files for that project,
or if you will be sharing that project (see ‘Public’ folders),
then you should just create a folder for it.

Here are a few examples:

- Files that are about filing taxes go into the ‘tax-filing’ folder.
- A report goes into a folder with the name of that report.
  If you do multiple reports,
  then you could either create a ‘reports’ folder,
  or you could add ‘report’ to the beginning of the file name.

### Sub-Projects

Within a project, there are often subprojects,
or sub-tasks.
Usually, you have a single file for each section,
but if it grows enough,
simply create a sub-project folder within the project folder,
and put those additional files in there.

### Public

When you have projects that require you to edit files
before you share them with other people
(such as generating a PDF from your Word file)
you create a ‘Public’ folder within the project folder
and store the exported files in here.

You can even change the end of the file name
to reflect who or what it’s for.
The most frequent use case is when
you remove personal or company information from these files
before you share them with other people.

One example is when you share something for internal review,
and then share another copy to send outside for printing.
In this instance, some printers will want the images
and fonts to be given along with the file,
or they may want it in a different format,
so you’ll have ‘project.png’ file for internal review,
and a ‘project-print/’ folder for the printer.

Another example is presentation slides
that are presented to multiple people,
or at different conferences —
you wouldn’t want your slides to say
‘Welcome Mumbai’ for a talk that you’re
presenting at New Delhi.

### New-new-report-final.pdf

A simple way to mitigate this is to add ‘v1’
at the end of the file name,
and change the number every time
you create a new version.

Another way is to add the date at the end,
and if you have more than one version on the same date,
then you add a 1, 2, etc on the end.

If there are a lot of versions,
and you’re struggling to keep track of them,
you can create a changelog.md file,
and write down the important versions,
and the differences between them.

If the project is currently active,
then you will place these new versions inside
the same folder,
but if you’re continuing the project after a long time
or redoing the project completely,
then you create a new project folder
using the version or date scheme.
That is, ‘project-v2/’ for your new version.

## The Inbox and Active Files/Folders

The ‘Inbox’ is where unorganised and currently used files sit.
Currently used files are files/folders that are organised,
but which you’re currently using.
Instead of moving them or keeping them in the ‘Inbox’ folder,
you link to the actual files in the ‘Archive’ folder:

First, go to the ‘Archive’ folder,
and right click on the file/folder you’re working with.
Then, if you’re on Windows, select ‘Create Shortcut’,
or if you’re on MacOS, select ‘Create Alias’,
and select the ‘Inbox’ folder or
move the newly created link to the ‘Inbox’ folder yourself.

When you're done with a link,
you simply delete the link,
and your actual files will remain in the ‘Archive’ folder.

One example for active files is your taxes folder:
it will remain in the ‘Archive’ folder for most of the year,
except when you start doing your taxes.
When that time comes around,
you link to it in the ‘Inbox’ a few days or weeks in advance,
and start working on your taxes for the year.

## Inbox to Archive

You have to take care to periodically
go through your inbox and organise your files.

If the file/folder doesn’t have any more use,
then simply put it in the trash bin.

If it’s a link to a folder in the archive
and you’re no longer using it,
then delete the link.
Your actual files will still be there in the ‘Archive’ folder.

If the file/folder belongs to an existing project,
put it into that project folder.
Don’t just dump it in, but name it properly,
and put it into a sub-folder if required.

If the file/folder doesn’t belong to any project
that you can think of,
then create a new folder for it,
or simply rename it according to that project.

Ideally, you should do this every day
and set a reminder for a specific time.
If you did very little file juggling work today,
then that’s great — it will only take you 5 minutes.
If you have a lot of files to organise,
then you should do it today,
before the pile gets larger.
If you’re especially tired today,
then you can postpone your reminder to the next day,
or for a different time.

## Integration with System/File Manager

I recommend deleting your ‘Downloads’, ‘Videos’,
‘Pictures’ and ‘Desktop’ folders,
and creating them anew as links to the ‘Inbox’ folder.
There are two main reasons for this:

- First, the ‘Downloads’, ‘Pictures’ and ‘Videos’ folder
frequently get new and unorganised files dumped into them
from various apps such as the browser and screenshot tool.

- Second, it’s easier to access active files/folders
from the desktop or any of the other folders,
because lots of file picker dialogues will default to these.

- Also, if you use desktop icons
you’ll have them easily accessible,
or you could skip that if you don’t like them.

Similarly, I recommend deleting the ‘Documents’ folder
and creating a new link pointing to the ‘Archive’ folder.
You’ll be able to quickly select it in any file choosers,
and it will appear at the top of your main folders list
in the file manager.

## Easy Backup and Transfer

One easy benefit of this system is that you know,
in a general sense, where all your files are,
and you only need to backup/copy these two folders
to get all your files wherever you want.

## Links for Various Platforms

- [Windows (11)](https://www.digitalcitizen.life/how-create-shortcuts/#ftoc-heading-7)

  If you use 'Send to Desktop (create shortcut)',
  remember to link the 'Desktop' to your 'Inbox' folder.

- [macOS](https://support.apple.com/en-in/guide/mac-help/mchlp1046/mac)

  Try the Option-Command with drag method.

- [Linux - GNOME Files (Nautilus)](https://askubuntu.com/a/941711)

  I've confirmed that the alt+release method works in version 42.2.

- Linux - KDE Dolphin

  It appears you can simply right click on empty space,
  and select 'Create New' then 'Link'.

  Source: [r/kde](https://www.reddit.com/r/kde/comments/mpz1rc/dolphin_convenient_way_to_create_a_symlink/)
  (See the comment by throwaway6560192, and the reply by Trollw00t)

  Let me know if you find or know any other ways.
  Dolphin might also have a drag+alt option
  to automatically create links.

- [Linux - Terminal](https://www.geeksforgeeks.org/ln-command-in-linux-with-examples/)

  Alternatively, you can have a look at `man ln`.
  The basic form is `ln -s <file/folder> <new link>`.
  Remember to use single quotes around the file/folder and new link names.
