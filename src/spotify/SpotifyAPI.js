import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

require('dotenv').config();

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`; // Recently played tracks
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

/**
 * Retrieves a new access token from the Spotify API using the client ID and client secret.
 *
 * @returns {Promise} A promise that resolves with the JSON response containing the access token.
 */
const getAccessToken = async () => {
    // Convert client_id and client_secret to a base64-encoded string
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    // Make a POST request to the Spotify token endpoint to get a new access token
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            // Include the base64-encoded client credentials in the Authorization header
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // Include the refresh token in the request body
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    // Return the JSON response containing the access token
    return response.json();
}

/**
 * Fetches the currently playing track from the Spotify API.
 *
 * @returns {Promise<Response>} A promise that resolves with the response from the Spotify API.
 */
const getNowPlaying = async () => {
    // Retrieve the access token from the Spotify API
    const { access_token } = await getAccessToken();

    // Make a GET request to the Spotify API to fetch the currently playing track
    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            // Include the access token in the Authorization header
            Authorization: `Bearer ${access_token}`,
        },
    });
}

/**
 * Fetches the recently played tracks from the Spotify API.
 *
 * @returns {Promise<Response>} A promise that resolves with the response from the Spotify API.
 */
const getRecentlyPlayed = async () => {
    // Retrieve the access token from the Spotify API
    const { access_token } = await getAccessToken();

    // Make a GET request to the Spotify API to fetch the recently played tracks
    return fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            // Include the access token in the Authorization header
            Authorization: `Bearer ${access_token}`,
        },
    });
}

/**
 * Retrieves the currently playing song information from the Spotify API.
 *
 * @returns {Object} An object containing details of the currently playing song.
 */
async function getNowPlayingItem() {
    // Fetch the currently playing track from the Spotify API
    const response = await getNowPlaying();

    // Check if the response status indicates an error or no content
    if (response.status === 204 || response.status > 400) {
        return false; // Return false if there is an issue with the response
    }

    // Parse the JSON response to get the song details
    const song = await response.json();

    // Extract relevant information from the song object
    return {
        albumImageUrl: song.item.album.images[0].url,
        artist: song.item.artists.map((_artist) => _artist.name).join(", "),
        isPlaying: song.is_playing,
        songUrl: song.item.external_urls.spotify,
        title: song.item.name,
        progress: song.progress_ms,
        duration: song.item.duration_ms,
    };
}

/**
 * Fetches the recently played tracks from the Spotify API and extracts relevant information.
 *
 * @returns {Array<Object>|boolean} An array of objects containing details of the recently played tracks,
 *                                  or false if there is an issue with the response.
 */
async function getRecentlyPlayedTracks() {
    // Fetch the response from the Spotify API for recently played tracks
    const response = await getRecentlyPlayed();

    // Check if the response status indicates an error or no content
    if (response.status === 204 || response.status > 400) {
        return false; // Return false if there is an issue with the response
    }

    // Extract the 'items' array from the JSON response
    const { items } = await response.json();

    // Map the 'items' array to extract relevant information for each track
    return items.map((item) => ({
        albumImageUrl: item.track.album.images[0].url, // Extract album image URL
        artist: item.track.artists.map((_artist) => _artist.name).join(", "), // Extract artist names
        songUrl: item.track.external_urls.spotify, // Extract Spotify URL for the track
        title: item.track.name, // Extract track title
    }));
}

export { getNowPlayingItem, getRecentlyPlayedTracks };