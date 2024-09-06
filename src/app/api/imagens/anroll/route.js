import axios from "axios";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query)
    return new Response(
      JSON.stringify({ error: "missing query." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

  try {
    const url = decodeURIComponent(query);
    const apikey = "ed59bacd6da711d678cf8baa6966aba6350d364a";

    const res = await axios({
      url: "https://api.zenrows.com/v1/",
      method: "GET",
      headers: {
        "Referer": "https://www.anroll.net/",
      },
      params: {
        "url": url,
        "apikey": apikey,
        "custom_headers": "true",
      },
      responseType: "arrayBuffer"
    });

    if (res.status !== 200) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch the image." }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const imageBuffer = res.data;
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
