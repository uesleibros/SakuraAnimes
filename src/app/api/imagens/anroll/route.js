import {HttpsProxyAgent} from "https-proxy-agent";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query)
    return new Response(
      JSON.stringify({ error: "missing query." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

  try {
    const proxyUrl = "http://27.64.18.8:10004"
    const agent = new HttpsProxyAgent(proxyUrl);
    const url = decodeURIComponent(query);
    const res = await fetch(`${url}&__cf_chl_rt_tk=mkrdVHTBzhTDAR0lA4vkagRNKH2MOHkFhCo0068kn_4-1725379337-0.0.1.1-7316`, {
      agent,
      headers: {
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
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Service-Worker-Navigation-Preload": "true",
        "Upgrade-Insecure-Requests": '1',
        "Cookie": "cf_chl_rc_i=14; cf_clearance=sn64to8rx_RtsuIE8gYRmHaSRVvdPj5IBEwDRVxK1qM-1725381127-1.2.1.1-fLBtKZNM003d3L1H6M0pqtRDTW77mRi5c8NfOYAs3sk.RMWJwqu2P1Y4GAKQ1Tbb38cXLFHQRBEdsrvTlKHMwO_4TddJt0pkvwrhSWH44fe4W2MtuV4Wh5rVzHDGM75QYgqHKI0gz558XAE69KU5b6JhGHz.zdaO9xUp7xTsh5J22iBerMXIswP0EBvHtrqqUzoek1XEEv9Btee2k2y3jWR9e7Bufx.yeBZUEt1AtCZ5igE_R60wLZew7HBAtf8fqLWBbWQWAl83fuHlw.zogKVqAhcULdJ9IQgF3BK1KjB5UvhDEwrJYPq_krzMMrcVtlPWVLRCC1Z7DWyRJyub7Ulud5QZWoUS8vahaWwUdpuwhOPLQqwJL9DoaM3Epnwhl5IlMNIe1HkOB9C9ElWOa4EiBVcUYSzqUu17SQ2EIjbDaEQ7VHYutDa1hWW9S6ji",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
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
