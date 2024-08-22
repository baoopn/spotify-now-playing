"use client";

import {Box, ChakraProvider, Flex, Text, Link} from "@chakra-ui/react";
import {ColorModeSwitcher} from "@/app/ColorModeSwitcher";
import SpotifyNowPlaying from "@/spotify/SpotifyNowPlaying";
import SpotifyRecentTracks from "@/spotify/SpotifyRecentTracks";
import React from 'react';

require('dotenv').config();

export default function Home() {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Box textAlign="right" p={3}>
          <ColorModeSwitcher initialColorMode="dark" />
        </Box>

        <Flex direction="column" justifyContent="center" align="center" minHeight="90vh" mb={6}>
          <Box textAlign="start" mb={6} mx={12}>
            <h1>Explore the tracks I&apos;m listening to right now and check out my recent Spotify activity.</h1>
            <Text mt={4}>
              Discover more about me and my work on my personal page: <Link href="https://baoopn.com" color="teal.500" isExternal>baoopn.com</Link>.
            </Text>
          </Box>

          <Flex direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="top" gap={6} overflowY={{ base: "auto", md: "hidden" }} overflowX="auto">
            <SpotifyNowPlaying />
            <SpotifyRecentTracks />
          </Flex>
        </Flex>
      </ChakraProvider>
    </React.StrictMode>
  );
}
