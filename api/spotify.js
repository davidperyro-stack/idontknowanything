import { getNowPlaying } from "../lib/spotify.js";

export default async function handler(req, res) {
    try {

        const song = await getNowPlaying();

        if (!song) {
            return res.status(200).json({
                isPlaying: false,
            });
        }

        return res.status(200).json({
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map(artist => artist.name).join(", "),
            album: song.item.album.name,
            albumImage: song.item.album.images[0].url,
            songUrl: song.item.external_urls.spotify,
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message,
        });

    }
}