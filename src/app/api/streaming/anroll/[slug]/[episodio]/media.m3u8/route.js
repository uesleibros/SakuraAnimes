import config from "@/config";

export async function GET(request) {
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 3];
  const episodio = pathParts[pathParts.length - 2];

  if (!slug || !episodio || pathParts[pathParts.length - 1] !== "media.m3u8")
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug/episodio." }), { status: 400 });

  const url = `https://${config.anroll.cdn}/cf/hls/animes/${slug}/${episodio}.mp4/media-1/stream.m3u8`;
  const res = await fetch(url, {
    headers: {
      "Referer": "https://www.anroll.net/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    },
    cache: "no-store"
  });

  if (!res.ok)
    return new Response(JSON.stringify({ error: "Failed to fetch the .m3u8 file." }), { status: res.status });

  const m3u8Text = await res.text();

  const updatedM3U8Text = m3u8Text.replace(/(https:\/\/[^\s]+)/g, (url) => {
    const encodedUrl = encodeURIComponent(url);
    return `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}/api/imagens/anroll?q=${encodedUrl}`;
  });

  return new Response(Buffer.from(updatedM3U8Text, "utf8"), {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Content-Disposition": `attachment; filename="${slug}-${episodio}.m3u8"`,
      "Content-Length": Buffer.byteLength(updatedM3U8Text, "utf8"),
      "Cache-Control": "no-store"
    }
  });
}
