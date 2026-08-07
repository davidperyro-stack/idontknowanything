const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(
    `${client_id}:${client_secret}`
).toString("base64");

async function getAccessToken() {

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        }),
    });

    return response.json();
}

export async function getNowPlaying() {

    const { access_token } = await getAccessToken();

    const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    if (response.status === 204) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
}