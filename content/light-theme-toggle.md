+++
title = "Light theme toggle"
date = 2024-06-24 19:23:04
updated = 2024-06-24 19:23:04
+++

A CSS based light/dark-mode toggle,
with Javascript for fallbacks and additional functionality.

Big thanks to Kevin Powell for the core CSS `:has()` solution.
I simply added some functionality for falling back to Javascript,
and storing and loading your preferences for later.

[Simple light/dark example by Kevin Powell](https://codepen.io/kevinpowell/pen/KKEevOp)

This implementation does four things:

- Adds a selector in HTML,
- applies the theme using pure CSS,
- falls back to applying the theme with Javascript
  if the required CSS feature (`:has()`) isn't supported,
- and saves and loads the theme using Javascript.

## Add the selector

```
<label>Colour Scheme:
  <select name="colour-scheme-picker" id="colour-scheme-picker">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>
```

The selected theme can be one of `system`, `light`, or `dark`.

## Apply the theme in pure CSS

### System

```
@media (prefers-color-scheme: dark) {
  body {
    /* dark theme settings */
  }
}

@media (prefers-color-scheme: light) {
  body {
    /* light theme settings */
  }
}
```

If no specific theme is set,
it will listen to what the browser says.
This default will apply in all cases.

Remember to set default preferences
for when nothing specific is set or shared
by the browser.

### Light and dark

```
body:has(#colour-scheme-picker [value="dark"]:checked) {
  /* dark theme settings */
}

body:has(#colour-scheme-picker [value="light"]:checked) {
  /* light theme settings */
}
```

If the "Dark" or "Light" option is checked,
it applies the respective settings,
and overrides the default browser settings.

## Light and dark Javascript fallback

Check if the `:has()` selector is supported:

```
const supportsSelectorHas = CSS.supports("( selector(:has(h1)) )");
```

Get a reference to the colour scheme picker,
and because we'll be setting a custom property on the body,
get a reference to the body as well:

```
const colourSchemePicker = document.getElementById('colour-scheme-picker');
const body = document.querySelector('body');
```

If `supportsSelectorHas` is false,
we add the `data-colour-scheme` property to the body:

```
colourSchemePicker.addEventListener('change', () => {
  if (colourSchemePicker.value != 'system') {
    /* save preference */
    if (!supportsSelectorHas) {
      body.dataset.colourScheme = colourSchemePicker.value;
    }
  } else {
    /* save preference */
    if (!supportsSelectorHas) {
      delete body.dataset.colourScheme;
    }
  }
});
```

Normally we'd only add the event listener
if the selector isn't supported,
but we'll need to add it anyway to save preferences,
so the check is inside the listener.

Since the 'system' theme is the default,
we remove the custom property for that,
but we add it for the other cases
(either 'light' or 'dark').

{% details(summary="Dataset API and data- attributes") %}
The dataset API sets a `data-` attribute on the element,
and converts `camelCase` to `kebab-case`.
So `body.dataset.colourScheme` converts
`colourScheme` to `colour-scheme`,
then sets a `data-colour-scheme` property on the body.

[Dataset property on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

[Custom data attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
{% end %}

This will need the associated CSS selector
for `data-colour-scheme`,
which you can combine with the previous `:has()` selector:

```
body:has(#colour-scheme-picker [value="dark"]:checked),
body[data-colour-scheme="dark"] { /* ADDING THIS */
  /* dark theme settings */
}

body:has(#colour-scheme-picker [value="light"]:checked),
body[data-colour-scheme="light"] { /* ADDING THIS */
  /* light theme settings */
}
```

## Save and load preferences

To save preferences:

```
colourSchemePicker.addEventListener('change', () => {
  if (colourSchemePicker.value != 'system') {

    /* ADDING THIS */
    localStorage.setItem('colourScheme', colourSchemePicker.value);

    if (!supportsSelectorHas) {
      body.dataset.colourScheme = colourSchemePicker.value;
    }
  } else {

    /* ADDING THIS */
    localStorage.removeItem('colourScheme');

    if (!supportsSelectorHas) {
      delete body.dataset.colourScheme;
    }
  }
});
```

For the system theme we're actually deleting it
because that's the default when nothing is set.

To load the preferences,
we need to check it before the page loads,
and we need to update the selector after the page loads.

Inside your HTML `body` tag,
add a script tag before anything else:

```
<body>
  <script>
    if ( localStorage.getItem('colourScheme') != null ) {
      const docBody = document.querySelector('body');
      docBody.dataset.colourScheme = localStorage.getItem('colourScheme');
    }
  </script>

  <!-- the rest of the body -->
</body>
```

The script has to be inline, and at the beginning of the body,
to load before anything else,
otherwise you'll see a flickering effect,
where the default theme is loaded before it updates
to the saved user selection.

In your main script, where the rest of the logic is,
check if the colour scheme was stored,
and updated the picker to reflect that:

```
const storedColourScheme = localStorage.getItem('colourScheme');

if (storedColourScheme) {
  colourSchemePicker.value = storedColourScheme;
}
```

## Summary

HTML:

```
<body>
  <!-- Load saved colour scheme -->
  <script>
    if ( localStorage.getItem('colourScheme') != null ) {
      const docBody = document.querySelector('body');
      docBody.dataset.colourScheme = localStorage.getItem('colourScheme');
    }
  </script>

  <!-- ... -->

  <!-- Colour scheme picker -->
  <label>Colour Scheme:
    <select name="colour-scheme-picker" id="colour-scheme-picker">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  
  <!-- ... -->

</body>
```

CSS:

```
/* {{{ Default browser preferences */
  @media (prefers-color-scheme: dark) {
    body {
      /* dark theme settings */
    }
  }

  @media (prefers-color-scheme: light) {
    body {
      /* light theme settings */
    }
  }
/* end Default browser preferences }}} */

/* {{{ User preferences */
  /* Selector for pure CSS method */
  body:has(#colour-scheme-picker [value="dark"]:checked),
  /* Selector for Javascript fallback method */
  body[data-colour-scheme="dark"] {
    /* dark theme settings */
  }

  /* Selector for pure CSS method */
  body:has(#colour-scheme-picker [value="light"]:checked),
  /* Selector for Javascript fallback method */
  body[data-colour-scheme="light"] {
    /* light theme settings */
  }
/* end User preferences }}} */
```

Javascript:

```
const supportsSelectorHas = CSS.supports("( selector(:has(h1)) )");
const storedColourScheme = localStorage.getItem('colourScheme');

const colourSchemePicker = document.getElementById('colour-scheme-picker');
const body = document.querySelector('body');

if (storedColourScheme) {
  colourSchemePicker.value = storedColourScheme;
}

colourSchemePicker.addEventListener('change', () => {
  if (colourSchemePicker.value != 'system') {
    /* 'light' or 'dark' theme */
    localStorage.setItem('colourScheme', colourSchemePicker.value);
    if (!supportsSelectorHas) {
      body.dataset.colourScheme = colourSchemePicker.value;
    }
  } else {
    /* 'system' (default) theme */
    localStorage.removeItem('colourScheme');
    if (!supportsSelectorHas) {
      delete body.dataset.colourScheme;
    }
  }
});
```
