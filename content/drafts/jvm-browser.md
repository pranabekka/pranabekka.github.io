+++
title = "JVM meets browsers"
## remember to change date on publishing
date = 2024-12-30 19:53:25 # draft date
updated = 2024-12-30 19:53:25
+++

JVM was the previous universal app platform.

When it comes to Android, it's still pretty popular,
but browser technology is now the way to go.

If you think about it,
"web technology" is used everywhere,
and it always was.

Apps have always been distributed through the web.
You find out about them from the web.
You find download links and use them from the web.
You get updates and plugins from the web.

Browsers are actually virtual machines
that automatically _manage your downloads_.
Progressive web apps are just a way to tell the browser
that you don't want it to delete your app after download,
and you'd like a convenient icon on your device.

At the same time, browsers have a lot of issues.
Users are exposed to all sorts of security issues,
performance issues, and accessibility issues,
and developers are exposed to all sorts of
badly-defined behaviour.

A second VM would benefit from all the lessons learnt.

Amongst other things, we'd have:

- permissions like Android and iOS (capability security),
- a better programming language,
- well defined data tags with stricter requirements,
- a well defined extension api for documents,
- fully semantic tags,
- and cleaner, simpler, and varied implementations.

Maybe WASM could be a good launch pad for this,
and people could use their favourite languages.

While having capability secure languages is nice,
the end user doesn't benefit from it as much,
because the distributed applications
are still controlled by the programmers and distributors.

Having a secure VM puts more power in the hands of the user,
while also enabling developers to make faster and safer apps,
and also enabling users to develop and share their own apps.
