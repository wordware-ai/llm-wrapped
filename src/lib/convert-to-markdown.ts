export const convertToMarkdown = (data: any): string => {
  const sections = [
    "# Spotify User Data Analysis",
    "",
    "### Artists",
    data.allArtistNames.map((artist) => `- ${artist}`).join("\n"),
    "",
    "### Tracks",
    data.allTracks
      .map((track) => `- ${track.trackName} by ${track.artistName}`)
      .join("\n"),
    "",
    "### Playlists",
    data.playlistNames.map((playlist) => `- ${playlist}`).join("\n"),
    "",
    "### Recently Played Tracks",
    data.recentlyPlayedTracks
      .map((track) => `- ${track.trackName} by ${track.artistName}`)
      .join("\n"),
    "",
    "### Least Popular Artists",
    data.leastPopularArtists
      .map((artist) => `- ${artist.name} (Popularity: ${artist.popularity})`)
      .join("\n"),
    "",
    "### Most Popular Artists",
    data.mostPopularArtists
      .map((artist) => `- ${artist.name} (Popularity: ${artist.popularity})`)
      .join("\n"),
    "",
    "### Most Followed Artists",
    data.mostFollowedArtists
      .map(
        (artist) =>
          `- ${artist.name} (Followers: ${artist.followers.total.toLocaleString()})`,
      )
      .join("\n"),
    "",
    "### Oldest Songs",
    data.oldestSongs
      .map(
        (song) =>
          `- ${song.name} by ${song.artist} (Album: ${song.albumName}, Released: ${song.releaseDate})`,
      )
      .join("\n"),
  ];

  // Join all sections with double newlines
  return sections.join("\n");
};
