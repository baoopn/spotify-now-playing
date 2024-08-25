import { getNowPlayingItem } from "@/spotify/SpotifyAPI";

export default async function handler(req, res) {
  try {
    const nowPlaying = await getNowPlayingItem();
    res.status(200).json({ id: nowPlaying.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch now playing item' });
  }
}