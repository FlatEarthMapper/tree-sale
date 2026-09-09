// POST /api/vote  body: { "id": "redmaple" }  ->  returns updated { treeId: count, ... }
// Stores ALL counts in a single KV key ("tally") as one JSON object.
// This means one write per vote regardless of how many trees there are,
// which keeps you comfortably under the free-tier write limit.

// ┌───────────────────────────────────────────────────────────┐
// │  VOTING SWITCH — must match VOTING_OPEN in index.html.     │
// │    true  = accept votes                                    │
// │    false = reject all votes (voting closed)                │
// │  This server-side check is what makes "closed" tamper-     │
// │  proof: even a direct API call cannot add votes when false.│
// └───────────────────────────────────────────────────────────┘
const VOTING_OPEN = false;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!VOTING_OPEN) {
    return Response.json({ error: "voting is closed" }, { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id || typeof id !== "string") {
      return Response.json({ error: "missing id" }, { status: 400 });
    }
    const raw = await env.VOTES.get("tally");
    const tally = raw ? JSON.parse(raw) : {};
    tally[id] = (tally[id] || 0) + 1;
    await env.VOTES.put("tally", JSON.stringify(tally));
    return Response.json(tally);
  } catch (e) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
