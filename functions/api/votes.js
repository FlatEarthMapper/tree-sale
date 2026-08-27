// GET /api/votes  ->  returns { treeId: count, ... }
// Reads the whole tally object from KV. One KV read per page load.
export async function onRequestGet(context) {
  const { env } = context;
  try {
    const raw = await env.VOTES.get("tally");
    const tally = raw ? JSON.parse(raw) : {};
    return Response.json(tally);
  } catch (e) {
    return Response.json({}, { status: 200 });
  }
}
