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

## Languages

`js/languages.js` is the registry; the settings dropdown is generated from it.
Each language also needs a `languages/<code>/` folder with `keyboards.js`,
`translations.js`, `punctuation.js`, and `<code>.css`. Word lists and context
models come from suggest-engine and need no host assets.

Currently exposed: `en fr es de pt ru ar hi bn zh ja id ko tr fa ur vi it pl
uk nl el he tl sw ha`.

New non-Latin keyboard layouts (`ko`, `el`, `he`, `fa`, `ur`) are best-effort
and marked `TODO: native-speaker review`. `translations.js` files for the newer
languages are empty on purpose: missing keys fall back to the English UI text
until native translations are added.
