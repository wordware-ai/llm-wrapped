"use server";

import { env } from "@/env";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export async function spotifyAuth() {
  console.log("hello");
  const client_id = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirect_uri = env.SPOTIFY_REDIRECT_URI;

  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  // Store state in session or cookies for validation later

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
