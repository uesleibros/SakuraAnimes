export async function GET(request) {
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 3];
  const episodio = pathParts[pathParts.length - 2];

  if (!slug || !episodio || pathParts[pathParts.length - 1] !== "media.mp4")
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug/episodio." }), { status: 400 });

  const res = await fetch(`https://s2.lightspeedst.net/s2/mp4/megami-no-cafe-terrace-2nd-season/hd/1.mp4`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Referer": "https://animefire.plus/",
      "Server": "nginx"
    },
    cache: "no-store"
  });

  if (!res.ok)
    return new Response(JSON.stringify({ error: "Failed to fetch the .mp4 file." }), { status: res.status });

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${slug}-${episodio}.mp4"`,
      "Content-Length": buffer.byteLength,
      "Content-Range": "bytes 93978624-94815723/94815724",
      "Cache-Control": "no-store"
    }
  });
}
