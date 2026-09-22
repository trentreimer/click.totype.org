# click.totype.org

Online rich text editor for anyone who finds it simpler to operate a pointer device than a keyboard

https://click.totype.org

## Development

Serve the `totype.org` parent folder (so the sibling `suggest-engine/` checkout resolves), then open `/click.totype.org/`:

```sh
python3 -m http.server 8000          # from the totype.org parent folder
# → http://localhost:8000/click.totype.org/
```

To work against the sibling suggest-engine while it is under development, flip
the import lines in `js/language-settings.js`: comment out the CDN import and
uncomment the sibling one. Both point at the same API — the sibling line
imports `suggest-engine/src/index.js` directly, so engine edits need no build
step, just a page refresh.

**Before deploying**, flip the imports back so the CDN line is the active one
(see AGENTS.md).
