"use client";

import { spotifyAuth } from "@/actions/spotify";
import { Button } from "@/components/ui/button";

export function SpotifyButton() {
  const handleAuth = async () => {
    const authUrl = await spotifyAuth();
    window.location.href = authUrl;
  };

  return <Button onClick={handleAuth}>Login with Spotify</Button>;
}
