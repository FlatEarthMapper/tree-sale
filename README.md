# 2027 Tree Sale Voting Page

A card-style voting page with a live leaderboard. Static HTML front end +
Cloudflare Pages Functions + Workers KV for shared vote storage. Free tier.

## Structure
- `index.html` — the page (edit the `TREES` list near the bottom to set your trees)
- `functions/api/votes.js` — GET: returns current vote counts
- `functions/api/vote.js` — POST: adds one vote

## Cloudflare setup (one time)
1. Create a KV namespace named **tree_votes** (Storage & Databases → KV).
2. In your Pages project → Settings → Functions → **KV namespace bindings**,
   add a binding with **Variable name: `VOTES`** pointing to the `tree_votes` namespace.
   (The code refers to the store as `env.VOTES`, so the variable name must be exactly `VOTES`.)
3. Redeploy (any push to the repo triggers it).

## Editing trees later
Edit the `TREES` array in `index.html`, commit, and it auto-deploys.
Do **not** change a tree's `id` after voting starts — counts are tracked by `id`.
