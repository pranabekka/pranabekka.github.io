+++
title = "PubNotes"
date = 2023-06-25 15:50:07
updated = 2023-06-25 15:50:07
[extra]
thumb = "pubnotes-anonymous.png"
+++

PubNotes is (an idea for) a system for collaboration using "notes",
which are documents containing arbitrary data,
such as text, images, video, links, and more.

It can be used to share arbitrary thoughts or experiences,
or it can be used to act like a forum.
It can be supplemented with likes and shares
to implement a social media.
It can be used to author and share stories.

Here's how it works:
at a very basic level, notes have some text
and a unique ID/URL.
You might even remove the URL and IDs
in order to make notes harder to target.
The example below includes
a simple title, tagline and call to action
for a made-up site.

> It's sort of like a paper note or letter:
> in its simplest form
> you just write "Left food in microwave" on a sticky note
> and put it on the fridge,
> or you could take it a bit further
> by writing your name at the end,
> or even other details like a deadline.

![image of anonymous notes](/pubnotes-anonymous.png)

After that you start adding some more enhanced content,
like the time at which the note was published,
or the name/ID of the person who created it.

It's sort of like a paper note or letter:
in its simplest form
you just write "Left food in microwave" on a sticky note
and put it on the fridge,
or you could take it a bit further
by writing your name at the end,
or even other details like a deadline.

<!-- ![image of sticky note with various degrees of content]() -->

PubNotes simply takes that loose structure
and lets you apply a certain structure
and set of rules to it.

Here's a more enhanced version of a note
with timestamps, comments, user mentions, and tags.
Notice, also, how the content isn't really tied to
how it is presented.

![example with comments, mentions, tags](/pubnotes-microblogging.png)

In the next example, I've even added UserIDs
and actions like bookmark, expand, and reply.

![example with userid, bookmark, expand, reply](/pubnotes-microblogging-actions.png)

Now, the notes can be structured in various ways,
using the links that they describe to other notes.
For example, tags are a special type of link
that actually refer to another *note*
that describes that tag.
When you open the note describing that tag,
the UI will also show you notes that use that tag,
in addition to the description.

We can even implement a video sharing platform
on top of PubNotes.
We simply require original notes to have one video,
while replies can have plain text.
Here's how it might look like:

![pubnotes video sharing](/pubnotes-video-sharing.png)

We even [removed the likes](https://blog.youtube/news-and-events/update-to-youtube/)
for an enhanced user experience!

The next one is an example of a different theme:

![PubNotes theme example](/pubnotes-theme-example.png)
