import {useEffect, useState} from "react";
import {Box, Spinner, Stack, Text, Link, Progress, Image, Tooltip} from "@chakra-ui/react";
import SpotifyLogo from "@/spotify/SpotifyLogo";
import PlayingAnimation from "@/spotify/PlayingAnimation";
import {getNowPlayingItem} from "@/spotify/SpotifyAPI";

const SpotifyNowPlaying = () => {
	const [loading, setLoading] = useState(true);
	const [track, setTrack] = useState({});

		useEffect(() => {
			const fetchNowPlaying = async () => {
					const nowPlaying = await getNowPlayingItem();
					setTrack(nowPlaying);
					setLoading(false);
	
					// Set up the next fetch using setTimeout
					setTimeout(fetchNowPlaying, 1000); // Poll every 1 second
			};
	
			(async () => {
					await fetchNowPlaying();
			})();
	
			return () => {
					// No need to clear setTimeout as it will stop automatically when the component unmounts
			};
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
					{!track.isPlaying && 
            <Box p={4} borderRadius="lg" borderWidth={1}>
							<Stack direction="column" spacing={1} align="center">
								<Image
									src={`https://cdn.baoopn.com/data/img/Baoo.png`}
									alt={`Bao's Image`}
									width={72}
									height={72}
									borderRadius="md"
								/>
								<Text
									fontWeight="semibold"
									fontSize="lg"
									width="full"
									color="alph"
								>
									Bao isn&apos;t listening to anything right now.
								</Text>
							</Stack>
            </Box>
					}
					{track.isPlaying &&
						<Box p={4} borderRadius="lg" borderWidth={1}>
							<Stack direction="column" spacing={4} align="center">
								<Box position="relative">
									<Image
										src={track.albumImageUrl}
										alt={`${track.title} by ${track.artist}`}
										width={64}
										height={64}
										borderRadius="50%"
										className="rotating-disk"
									/>
									<div className="center-circle"></div>
									<div className="smaller-white-circle"></div>
								</Box>
								<Stack spacing={1} overflow={"hidden"} width="full">
									<Tooltip label={track.title} alignSelf="self-start" hasArrow>
										<Link href={track.songUrl} alignSelf="self-start" isExternal>
											<Text
												fontWeight="semibold"
												fontSize="x-large"
												width="full"
												isTruncated
												color="alph"
											>
												{track.title}
											</Text>
										</Link>
									</Tooltip>
									<Tooltip label={track.artist} alignSelf="self-start" hasArrow>
										<Text
											color="gray.500"
											isTruncated
											alignSelf="self-start"
										>
											{track.artist}
										</Text>
									</Tooltip>
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