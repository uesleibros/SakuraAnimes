export async function GET(request) {
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 2];

  if (!slug || pathParts[pathParts.length - 1] !== "media.m3u8")
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug." }), { status: 400 });

  const res = await fetch(`https://cdn-zenitsu-2-gamabunta.b-cdn.net/cf/hls/movies/${slug}/movie.mp4/media-1/stream.m3u8`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Referer": "https://www.anroll.net/"
    },
    cache: "no-store"
  });

  if (!res.ok)
    return new Response(JSON.stringify({ error: "Failed to fetch the .m3u8 file." }), { status: res.status });

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Content-Disposition": `attachment; filename="${slug}.m3u8"`,
      "Content-Length": buffer.byteLength,
      "Cache-Control": "no-store"
    }
  });
}
