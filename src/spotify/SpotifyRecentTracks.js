import {useEffect, useState} from "react";
import {getRecentlyPlayedTracks} from "@/spotify/SpotifyAPI";
import {Box, Link, Spinner, Stack, Text, Image} from "@chakra-ui/react";
import SpotifyLogo from "@/spotify/SpotifyLogo";

const SpotifyRecentTracks = () => {
	const [loading, setLoading] = useState(true);
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		Promise.all([getRecentlyPlayedTracks()]).then(([tracksResult]) => {
			setTracks(tracksResult || []);
			setLoading(false);
		});
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
									<Link href={track.songUrl} target="_blank">
										<Text
											fontWeight="semibold"
											width="full"
											isTruncated
											color="alph"
										>
											{track.title}
										</Text>
									</Link>
									<Text
										color="gray.500"
										isTruncated
									>
										{track.artist}
									</Text>
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