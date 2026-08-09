export default async function handler(req, res) {
    const username = "davidPeryRO";

    try {
        const response = await fetch(
            `https://api.chess.com/pub/player/${username}/stats`,
            {
                headers: {
                    "User-Agent": "PeryPersonalSite/1.0 (personal website)"
                }
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Chess.com API request failed"
            });
        }

        const data = await response.json();

        res.status(200).json({
            username,

            rapid: data.chess_rapid?.last?.rating ?? null,
            blitz: data.chess_blitz?.last?.rating ?? null,
            bullet: data.chess_bullet?.last?.rating ?? null,

            rapidRecord: data.chess_rapid?.record ?? null,
            blitzRecord: data.chess_blitz?.record ?? null,
            bulletRecord: data.chess_bullet?.record ?? null
        });

    } catch (error) {

        res.status(500).json({
            error: "Failed to fetch Chess.com data"
        });

    }
}