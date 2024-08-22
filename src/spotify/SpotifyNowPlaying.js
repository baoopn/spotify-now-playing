import {useEffect, useState} from "react";
import {Box, Spinner, Stack, Text, Link, Progress, Image} from "@chakra-ui/react";
import SpotifyLogo from "@/spotify/SpotifyLogo";
import PlayingAnimation from "@/spotify/PlayingAnimation";
import {getNowPlayingItem} from "@/spotify/SpotifyAPI";

const SpotifyNowPlaying = () => {
	const [loading, setLoading] = useState(true);
	const [track, setTrack] = useState({});

	useEffect(() => {
		Promise.all([
			getNowPlayingItem(),
		]).then((results) => {
			setTrack(results[0]);
			setLoading(false);
		});
	}, []);

	return (
		<Box width="xs">
			{loading ?
				<Stack align="center" mb={8}>
					<Spinner size="md" speed="0.6s" thickness="3" color="gray.500"/>
				</Stack>
				:
				<Stack width="full" mb={track.isPlaying ? 2 : 4} spacing={3}>
					<Stack spacing={2} direction="row" align="center">
						<SpotifyLogo/>
						<Text fontWeight="semibold">{track.isPlaying ? 'Now Playing' : 'Currently Offline'}</Text>
						{track.isPlaying && <PlayingAnimation/>}
					</Stack>
					{track.isPlaying &&
						<Box p={4} borderRadius="lg" borderWidth={1}>
							<Stack direction="column" spacing={4} align="center">
								<Image
									src={track.albumImageUrl}
									alt={`${track.title} by ${track.artist}`}
									width={72}
									height={72}
									borderRadius="md"
								/>
								<Stack spacing={0} overflow={"hidden"} width="full">
									<Link href={track.songUrl} isExternal>
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
									<Progress
										size="xs"
										colorScheme="green"
										borderRadius="md"
										value={(track.progress / track.duration) * 100}
									/>
								</Stack>
							</Stack>
						</Box>
					}
				</Stack>
			}
		</Box>
	)
}

export default SpotifyNowPlaying;