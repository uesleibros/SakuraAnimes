export async function GET(request) {
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 3];
  const episodio = pathParts[pathParts.length - 2];

  if (!slug || !episodio || pathParts[pathParts.length - 1] !== "comment.html")
    return new Response(JSON.stringify({ error: "Invalid URL structure or missing slug/episodio." }), { status: 400 });

  const res = await fetch(`https://disqus.com/embed/comments/?base=default&f=animesroll2&t_i=609&t_u=https%3A%2F%2Fwww.anroll.net%2Fanime%2F${slug}%2Fepisodio-${episodio}&s_o=desc&l=pt_BR#version=4cca83b0da0691f931ef86061fb7db43`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    },
    cache: "no-store"
  });

  const data = await res.text();

  return new Response(data, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
      "X-Frame-Options": "ALLOW-FROM *",
      "Access-Control-Allow-Origin": "*"
    }
  });
}