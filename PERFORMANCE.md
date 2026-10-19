# Performance checklist

Use the production bundle when checking loading speed:

```bash
npm run preview:production
```

Then open the preview URL and inspect the Network and Performance panels.

## What should happen

- Hero loads from the local WebP asset and uses the mobile source below 720px.
- Story and destination images use responsive WebP sources instead of the original multi-megabyte files.
- Story images are mounted only as they approach the viewport.
- Display typography is served locally with `font-display: swap`; there should be no Google Fonts request.
- Google Maps stays unloaded until `Load interactive map` is selected.
- YouTube embeds are still opened only from the video modal after a user action.

## Quick checks

1. Disable cache and reload once to inspect the first-load request list.
2. Confirm the largest initial image is the hero, not a below-the-fold story image.
3. Test at a narrow viewport and verify `*-mobile.webp` is selected.
4. Run a Lighthouse mobile audit against the production preview.
5. Re-run `npm run build` after changing image paths or layout code.
