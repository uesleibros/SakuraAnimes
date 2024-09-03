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
        "Referer": "https://www.anroll.net/",
        "Sec-Ch-Ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "Sec-Ch-Ua-Arch": '"x86"',
        "Sec-Ch-Ua-Bitness": '"64"',
        "Sec-Ch-Ua-Full-Version": '"128.0.6613.117"',
        "Sec-Ch-Ua-Full-Version-List": '"Chromium";v="128.0.6613.117", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.117"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Model": '',
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Ch-Ua-Platform-Version": '"10.0.0"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": '1',
        "Cookie": "cf_clearance=aps_Cj0Sv1XwmpyF.N0tfBd43f01XrqGW.MPoHJKqL0-1725373149-1.2.1.1-yyroorvlZjFxXf0dHLHU1N8XsO3Ld3BhNFahDDgzSl8qUBUkHHTMDtxKf6nGYQMpjLohC5fhZpvfNdwO9GsArFEdtgeBPonuYPoNzFV5vvlxFQTyO9TrD0YTj9SO9uOWCmxsUmFKId62ccO0dqydwqvzRzSQRXFTxUa.9BGLfuT8SRxY17QTwBmVugHuMzq8MviXnRirlzGaxAYrG.YrZ8h4C5bdEgGyClCDMZOnC0uVZ8S4EP8Z_tili8bMXqiq5XflngGfP.26eDFmJzDLGGLTvOf4nfPa7nCxOg7SuLKjfObyEq245Y5scusBhREqqppBpYN1RvHSOO3JhUib2USyZ40h6ccoTTOOWyfjVtKgry6Pw6PAXclWELWuHRYTUYwrZ_1p.i2Lr9ckiQEIGTYhCxrx_6xwdWcOW2QgfAzEjlzQzQjTsZ0kZHgcRr1X"
      },
      cache: "no-store",
    });

    console.log(await res.text());

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
