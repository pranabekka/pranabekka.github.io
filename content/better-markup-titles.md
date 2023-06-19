+++
title = "Better Markup Headings"
date = 2023-06-19 09:50:55
updated = 2023-06-19 09:50:55
+++

Lightweight markup languages are designed in such a way
that the markup _looks_ like what is intended.
Bulleted lists use asterisks or hyphens
and emphasised text has asterisks or underscores around it.

The headings, however, have a structure
that highlights lower level headings
over higher level headings.
Instead, in a markdown file,
the highest level heading should have the most hashes ('#'),
while the lowest level heading should have the least.
Other lightweight markup languages should do the same
with whatever character they use for headings.

```
###### Heading Level 1 (Document Title)

This is the introductory paragraph of your document.

##### Heading Level 2 (Section Heading)

This is the content of the first section.

#### Heading Level 3 (Sub-Section Heading)

This is the content of Section 1.1.
```
