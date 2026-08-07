export default async function handler(req, res) {
    const response = await fetch(
        "https://api.chess.com/pub/player/davidPeryRO/stats"
    );

    const data = await response.json();

    res.status(200).json({
        rapid: data.chess_rapid?.last?.rating ?? "N/A",
        blitz: data.chess_blitz?.last?.rating ?? "N/A",
        bullet: data.chess_bullet?.last?.rating ?? "N/A",
    });
}
