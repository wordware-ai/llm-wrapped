/* eslint-disable */

export const convertToMarkdown = (data: any): string => {
  const sections = [
    "# Spotify User Data Analysis",
    "",
    "### Artists",
    data.allArtistNames.map((artist: any) => `- ${artist}`).join("\n"),
    "",
    "### Tracks",
    data.allTracks
      .map((track: any) => `- ${track.trackName} by ${track.artistName}`)
      .join("\n"),
    "",
    "### Playlists",
    data.playlistNames.map((playlist: any) => `- ${playlist}`).join("\n"),
    "",
    "### Recently Played Tracks",
    data.recentlyPlayedTracks
      .map((track: any) => `- ${track.trackName} by ${track.artistName}`)
      .join("\n"),
    "",
    "### Least Popular Artists",
    data.leastPopularArtists
      .map(
        (artist: any) => `- ${artist.name} (Popularity: ${artist.popularity})`,
      )
      .join("\n"),
    "",
    "### Most Popular Artists",
    data.mostPopularArtists
      .map(
        (artist: any) => `- ${artist.name} (Popularity: ${artist.popularity})`,
      )
      .join("\n"),
    "",
    "### Most Followed Artists",
    data.mostFollowedArtists
      .map(
        (artist: any) =>
          `- ${artist.name} (Followers: ${artist.followers.total.toLocaleString()})`,
      )
      .join("\n"),
    "",
    "### Oldest Songs",
    data.oldestSongs
      .map(
        (song: any) =>
          `- ${song.name} by ${song.artist} (Album: ${song.albumName}, Released: ${song.releaseDate})`,
      )
      .join("\n"),
  ];

  // Join all sections with double newlines
  return sections.join("\n");
};
