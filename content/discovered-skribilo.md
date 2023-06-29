+++
title = "I Discovered Skribilo!"
date = 2023-06-29 10:19:10
updated = 2023-06-29 10:19:10
+++

[Skribilo][skribilo] is a way to interleave markup and scheme code,
with very similar semantics to what I was envisioning
in [Lispy Templates](@/lispy-templates.md):

1. It uses `,(` to evaluate code inside a markup block.
2. It uses square brackets ('[...]')for content blocks instead of quotes.

Skribilo actually supports multiple types of syntax,
and it's actually a framework for defining your own.
The syntax it uses is the Skribe syntax,
which has its origins in LAML roughly as far back as 1999,
as per [this paper][paper] by Kurt Nørmark.

The Skribilo page also mentions a lot of prior art
and similar projects at the bottom,
which might be interesting to look at.

Here's an example of a Skribe document:

```scheme
(define (skribilo . body)
  (ref :url "https://www.nongnu.org/skribilo/" :text body))

(document :title [I Discovered Skribilo!]
          :draft #t
          :date (make-date 0 0 28 10 29 06 2023 0) ;(nanosecond second minute hour day month year timezone-offset)

  (p [,(skribilo [Skribilo]) is a way to interleave markup and scheme code,
with very similar semantics to what I was envisioning in
,(ref "@/lispy-templates.skribe" "Lispy Templates").]))
```

At this stage, I think all it needs
is a way to define syntax sugar (like `# title` or `- list item`),
and it would be on roughly on par with typst.

[skribilo]: https://www.nongnu.org/skribilo/
[paper]: https://people.cs.aau.dk/~normark/laml/papers/laml-retrospective-paper.pdf
