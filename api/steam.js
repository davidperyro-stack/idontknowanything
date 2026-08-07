const API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = "76561199833330653";

export default async function handler(req, res) {

    try {

        const response = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_ID}`
        );

        const data = await response.json();

        const player = data.response.players[0];

        res.status(200).json({
            name: player.personaname,
            avatar: player.avatarfull,
            status: player.personastate,
            game: player.gameextrainfo || null,
            profile: player.profileurl
        });

    } catch {

        res.status(500).json({
            error: "Couldn't load Steam."
        });

    }

}