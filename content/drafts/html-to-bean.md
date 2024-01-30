+++
title = "HTML to Bean"
## remember to change date on publishing
date = 2024-01-30 16:42:16 # draft date
updated = 2024-01-30 16:42:16
+++

What an HTML document might look like in Bean,
both with and without the syntax sugar and post-processing.

[Bean markup (missing)](bean)

## Paragraphs

### HTML

```
<p>This is a paragraph.</p>
<p>Another paragraph.</p>
```

### Basic Bean

```
[p]
This is a paragraph.

[p]
Another paragraph.
```

### Bean

```
This is a paragraph.

Another paragraph.
```

## List

### HTML

```
<ul>
  <li>List item</li>
  <li>Another list item</li>
</ul>
```

### Basic Bean

```
[ul]
`List item`[li]
`Another list item`[li]
```

### Bean

```
* List item
* Another list item
```

## Nested list

### HTML

```
<ul>
  <li>List item</li>
  <li>Another list item
    <ul>
      <li>Nested list item</li>
    </ul>
  </li>
  <li>Third item</li>
</ul>
```

### Basic Bean

```
[ul]
`List item`[li]
`Another list item`[li]
  [ul]
  ``
  `Nested list item`[li]
  ``
`Third item`[li]
```

### Bean

```
* List item
* Another list item
** Nested list item
* Third item
```

## Empty document

### HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

### Basic Bean

```
[!DOCTYPE html]

[html lang en]
[head]
``
  [meta charset UTF-8]

  [meta name viewport content "width=device-width, initial-scale=1.0"]

  [title]
  Document
``
[body]
``

``
```

### Bean

```
```

## Basic document

### HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, world</h1>
</body>
</html>
```

### Basic Bean

```
[!DOCTYPE html]

[html lang en]
[head]
``
  [meta charset UTF-8]

  [meta name viewport content "width=device-width, initial-scale=1.0"]

  [title]
  Document
``
[body]
``
  [h1]
  Hello, world
``
```

### Bean

```
### Hello, world
```
