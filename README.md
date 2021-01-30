# pranabekka.github.io

Code for muh website-- www.pranabekka.com

## Issues

### Responsiveness

- Margins don't resize properly for webkit mobile
    - Text squeezed into narrow column
- Secondary buttons become very small in webkit
- Everything scales down very small in Firefox mobile
    - Works fine in landscape mode
- Logo stretches out in webkit mobile landscape mode
- Button width/padding too small/big in Qutebrowser
- Top margin/padding not working in Qutebrowser
    - Project title hidden under top bar

### Speed

- No image optimisation

## Possible Solutions

### Responsiveness

- Nuke and pave!
    - Learn a bit more about making responsive sites
    - Rewrite html and css from scratch
    - Keep touch simulation enabled while testing
- Debug (yuck)
    - Remove/resize margins with media query
    - Reduce min value for font-size (to 10pt?)
    - Adjust min size for buttons
    - Test CSS on Ff responsive mode, with touch simulation enabled
    - Export logo as svg, or use html+fonts to recreate logo
    - Create Qutebrowser branch and test issues

### Speed

- Multiple image resolutions, paired with srcset
