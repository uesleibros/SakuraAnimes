import {HttpsProxyAgent} from "https-proxy-agent";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query)
    return new Response(
      JSON.stringify({ error: "missing query." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

  try {
    const proxyUrl = "https://27.64.18.8:10004"
    const agent = new HttpsProxyAgent(proxyUrl);
    const url = decodeURIComponent(query);
    const res = await fetch(url, {
      agent,
      headers: {
        "Authority": "vidroll.cloud",
        "Referer": url,
        "Host": "www.anroll.net",
        "X-Forwarded-For": "172.67.177.146",
        "CF-Connecting-IP": "172.67.177.146",
        "Origin": `https://${new URL(url).host}`,
        "Pragma": "no-cache",
        "Priority": "u=0, i",
        "Upgrade-Insecure-Requests": '1',
        "Cookie": "cf_clearance=mpWDXxOaS410.7OyUd4YSeSQbAyb16Y8Lna8Zy7q6Eo-1725375052-1.2.1.1-1jLYbFLglg..lVrh6sRoCX.6Ri897NOeS6jnHmBH71qheqChlB1buuK9WAOKtcJQk4WjzxWLsckCd9mgKgUg1MmmRwsWwnOdvzbFiKaPwnSr8GFTlQR1HLKOWABF5EvIbz6ygP.PKZ1rHMXuKQLx34dTgzrYWmphazwbmminzoTPZ_vxmhDzUwgItcK07J4Hb2mynj3h6XSFIrY3Hz6hrP31R98_.iT.w1bEIUr0oLVOOZqAUfotV0pNwl35bznjPbWwpKTs7lZJSakt6FasQltHfNgiba2.rd3lzy57ruxCIjMY6pnmRRiXKLJiMmMJGjhVIwdty6rXEms9c330n6ie5hc8PlosxvlOG4A_Iy68p1mgYEIjI7An_DgmmWAUMmhA.H6YANvBdEsBSjcuV4zH9dXEqplcEErfVl94PAIETCZ._EPoLzVGZiL1iut_",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
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
