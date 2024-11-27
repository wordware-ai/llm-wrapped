import { type User, type SpotifyResult } from "@prisma/client";

export type UserWithSpotifyResult = User & {
  spotifyResult: SpotifyResult | null;
};
