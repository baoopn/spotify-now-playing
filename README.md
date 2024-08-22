# Spotify Now Playing and Recent Tracks

This is a Next.js project that displays the currently playing track on Spotify as well as a list of recently played tracks. It uses the Spotify Web API to fetch the data and is inspired by [Lee Robinson's tutorial](https://leerob.io/blog/spotify-api-nextjs).

## Features

- **Now Playing**: Shows the track you're currently listening to on Spotify.
- **Recently Played**: Displays a list of your recently played tracks.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed.
- A [Spotify Developer Account](https://developer.spotify.com/dashboard/applications) to create an app and get API credentials.

### Installation

1. Clone this repository:

```bash
git clone https://github.com/baoopn/spotify-now-playing.git
cd spotify-now-playing
```

2. Install dependencies:

```bash
npm install
```

### Setting Up the Spotify API

To use the Spotify API, you’ll need to obtain the following credentials:

- **Client ID**
- **Client Secret**
- **Refresh Token**

Follow the instructions in [this guide](https://leerob.io/blog/spotify-api-nextjs) to generate your refresh token and understand how to authenticate your Spotify API requests.

### Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

### Configuration for Cloudflare Pages Deployment

This project is configured to be deployed on Cloudflare Pages using the `@cloudflare/next-on-pages` dependency. The deployment-specific settings are defined in the `next.config.mjs` file.

To ensure compatibility with Cloudflare Pages:

- The `next.config.mjs` includes settings to optimize static builds.
- The `@cloudflare/next-on-pages` package is used to handle the build process tailored for Cloudflare’s infrastructure.

### Running the Project

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

### Deployment

For deployment, consider using platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) or [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/). These platforms offer seamless integration with Next.js and handle environment variables securely.

## References

This project is based on [Lee Robinson’s tutorial on using the Spotify API in Next.js](https://leerob.io/blog/spotify-api-nextjs). You can check out the detailed guide there to learn more about how the Spotify API works and how to handle authentication.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to customize the content further based on your project's specifics. If you have any questions or need further assistance, please let me know! 🚀