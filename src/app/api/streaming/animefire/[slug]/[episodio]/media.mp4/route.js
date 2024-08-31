export async function GET(request) {
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 3];
  const episodio = pathParts[pathParts.length - 2];

  if (!slug || !episodio || pathParts[pathParts.length - 1] !== "media.mp4")
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug/episodio." }), { status: 400 });

  const res = await fetch(`https://s2.lightspeedst.net/s2/mp4/hazurewaku-no-joutai-ijou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made/sd/8.mp4`, {
    headers: {
      "Authority": "s2.lightspeedst.net",
      "Host": "s2.lightspeedst.net",
      "Content-Type": "video/mp4",
      "Range": request.headers.get("range"),
      "Referer": "https://animefire.plus/",
      "Sec-Ch-Ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "\"Windows\"",
      "Sec-Fetch-Dest": "video",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
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
