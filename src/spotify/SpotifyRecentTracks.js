import {useEffect, useState} from "react";
// import {getRecentlyPlayedTracks} from "@/spotify/SpotifyAPI";
import {Box, Link, Spinner, Stack, Text, Image, Tooltip} from "@chakra-ui/react";
import SpotifyLogo from "@/spotify/SpotifyLogo";
import {RECENTLY_PLAYED_ENDPOINT} from "@/spotify/Constants";

const SpotifyRecentTracks = () => {
	const [loading, setLoading] = useState(true);
	const [tracks, setTracks] = useState([]);

		// useEffect(() => {
		// 	const fetchRecentlyPlayedTracks = async () => {
		// 			const tracksResult = await getRecentlyPlayedTracks();
		// 			setTracks(tracksResult || []);
		// 			setLoading(false);
	
		// 			// Set up the next fetch using setTimeout
		// 			setTimeout(fetchRecentlyPlayedTracks, 10000); // Poll every 10 seconds
		// 	};
	
		// 	(async () => {
		// 			await fetchRecentlyPlayedTracks();
		// 	})();
	
		// 	return () => {
		// 			// No need to clear setTimeout as it will stop automatically when the component unmounts
		// 	};
		// }, []);

		useEffect(() => {
    const fetchRecentTracks = () => {
      fetch(RECENTLY_PLAYED_ENDPOINT)
        .then(response => response.json())
        .then(results => {
          setTracks(results);
          setLoading(false);
          // Fetch again after the previous fetch is finished
          setTimeout(fetchRecentTracks, 10000);
        })
        .catch(error => {
          console.error('Error fetching recently played tracks:', error);
          // Retry after 2 seconds if there is an error
          setTimeout(fetchRecentTracks, 2000);
        });
    };

    // Fetch immediately
    fetchRecentTracks();

    // Clean up function to stop fetching if the component unmounts
    return () => {
      // No need to clear interval as we are using setTimeout
    };
  }, []);


	return(
		<Box width="xs">
			{loading ?
				<Stack align="center" mb={8}>
					<Spinner size="md" speed="0.6s" thickness="3" color="gray.500"/>
				</Stack>
				:
				<Stack width="full" spacing={3}>
					<Stack spacing={2} direction="row" align="center">
						<SpotifyLogo/>
						<Text fontWeight="semibold">Recently Played</Text>
					</Stack>
					{tracks.map((track, index) => (
						<Box key={index} p={2} borderRadius="lg" borderWidth={1}>
							<Stack direction="row" spacing={4} align="center">
								<Image
									alt={`${track.title} album art`}
									src={track.albumImageUrl}
									width={12}
									height={12}
									borderRadius="sm"
								/>
								<Stack spacing={0} overflow="hidden">
									<Tooltip label={track.title} hasArrow>
										<Link href={track.songUrl} alignSelf="self-start" isExternal>
											<Text
												fontWeight="semibold"
												width="full"
												isTruncated
												color="alph"
											>
												{track.title}
											</Text>
										</Link>
									</Tooltip>
									<Tooltip label={track.artist} hasArrow>
										<Text
											color="gray.500"
											isTruncated
											alignSelf="self-start"
										>
											{track.artist}
										</Text>
									</Tooltip>
									<Text></Text>
								</Stack>
							</Stack>
						</Box>
					))}
				</Stack>
			}
		</Box>
	);
}

export default SpotifyRecentTracks;