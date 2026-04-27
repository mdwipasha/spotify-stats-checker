// src/pages/api/token.js
export async function GET({ url }) {
  const code = url.searchParams.get("code")

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          import.meta.env.SPOTIFY_CLIENT_ID +
          ":" +
          import.meta.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.REDIRECT_URI,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data))
}