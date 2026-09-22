## Project
This webpage is a typewriter for people with that find it more practical
to use a pointer device than a keyboard due to mobility issues.
Some users may not have fine motor skills. Click zones need to be sized 
accordingly.
It needs to support multiple languages.
Ignore the `backups/` folder.

## Suggest-engine import
`js/language-settings.js` has two `SuggestEngine` import lines — a CDN pin and
a sibling-checkout line for development. Exactly one may be active: commits
and deploys must have the CDN line active.
