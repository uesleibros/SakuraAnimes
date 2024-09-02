export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query)
    return new Response(
      JSON.stringify({ error: "missing query." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

  try {
    const url = decodeURIComponent(query);
    const res = await fetch(url, {
      headers: {
        "Authority": new URL(url).host,
        "Host": "anroll.net",
        "Origin": "https://www.anroll.net",
        "Referer": "https://www.anroll.net/",
        "Cf-Ray": "8bc942b6981b5210-GRU",
        "Nel": '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
        "Report-To": '{"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v4?s=5cULeDVZhT2XGTomTHZHBNgkCWrDOMuKCY1imqjyaln4eueUt%2F3W0VHTYV1s0iZ1k%2B5LO%2B5olLC2L5Iw6CJeWk8Z8gMU85aMIummLJ9WoV6QWYxn45cJuguTZD3tF8sZ8pLcjz8e1j6afRMPppvv"}],"group":"cf-nel","max_age":604800}',
        "Server": "cloudflare",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch the image." }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const imageBuffer = await res.arrayBuffer();
    const contentLength = imageBuffer.byteLength;

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": contentLength.toString(),
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
