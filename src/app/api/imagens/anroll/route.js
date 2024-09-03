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
        "Referer": "https://www.anroll.net/",
        "Cookie": "cf_chl_rc_i=1; cf_clearance=EaQkfDtHavnIrHAsjDWCmX7uFruyw4MSFABs3V.CR.c-1725330835-1.2.1.1-xMEsj3zV6l3D7gTlIKTKNYP5W54OulGZ4AygD9nR0g9S_ti13CpOLntsFKM9fKLAIa5.ehqJPa1hhtKANBpLShiLfciHB6Em8QKu3JJgl1q9bpMAMt.yPKwhXDXQ_oCxrWKzmEvCaBSc9J9jTZ0ldSDfgGW.w8VAvI1Dj4i3sCg4QPmT26sKdZZvJbcyiyk.NhgPmCcIFYxN7EnLj7DRjcy4f75RLHeMeMzfVP9HPv6f7_Rxbtgovp.R4y4f0c4dnzfT5ATMjsNss55Yg.rOGzFXjM7Xw5UozRQaUUdWNuzUVc0Sbr3uz6Yi16xy0bHVbHFgmPWqXOixNkZQjjzduHKOdKilUuktUaF0INf6sw5Y6ApirZBt08dh_ljBcmNOGhYhsVgJOhjK24qpm6zNStBIKp13ADf7poThmb2WNAg",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
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
