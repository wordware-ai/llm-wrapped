/* eslint-disable */

import { TinderData } from "@/components/tinder/schemas";
import { LinkedInProfile } from "@/server/api/routers/linkedin-api/schemas";

export const convertSpotifyDataToMarkdown = (data: any): string => {
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

export const convertLinkedinDataToMarkdown = (
  data: LinkedInProfile,
): string => {
  const sections = [
    "# LinkedIn Profile Analysis",
    "",
    "## Personal Information",
    `- Name: ${data.name || "Not specified"}`,
    `- Location: ${data.location || data.city || "Not specified"}`,
    `- Current Position: ${data.position || "Not specified"}`,
    `- Current Company: ${data.current_company_name || data.current_company?.name || "Not specified"}`,
    `- Connections: ${data.connections?.toLocaleString() || "Not specified"}`,
    `- Followers: ${data.followers?.toLocaleString() || "Not specified"}`,
    "",
    "## About",
    data.about ? data.about : "No about section provided",
    "",
    "## Professional Experience",
    ...(data.experience?.map((exp) =>
      [
        `### ${exp?.title || "Role"} at ${exp?.company || "Company"}`,
        `- Duration: ${exp?.start_date || ""} - ${exp?.end_date || "Present"} (${exp?.duration_short || ""})`,
        `- Location: ${exp?.location || "Not specified"}`,
        "",
      ].join("\n"),
    ) || ["No professional experience listed"]),
    "",
    "## Education",
    ...(data.education?.map((edu) =>
      [
        `### ${edu?.title || "Institution"}`,
        `- Degree: ${edu?.degree || "Not specified"}`,
        `- Field: ${edu?.field || "Not specified"}`,
        `- Duration: ${edu?.start_year || ""} - ${edu?.end_year || ""}`,
        edu?.description ? `- Description: ${edu.description}` : "",
        "",
      ].join("\n"),
    ) || ["No education history listed"]),
    "",

    data.honors_and_awards
      ? [
          "## Honors and Awards",
          JSON.stringify(data.honors_and_awards, null, 2),
        ].join("\n")
      : "",
  ];

  // Filter out empty strings and join all sections with newlines
  return sections.filter((section) => section !== "").join("\n");
};

export const convertTinderDataToMarkdown = (
  data: TinderData | null,
): string => {
  if (!data) return "No data available";

  const sections = [
    // Spotify Section
    data.spotify
      ? `## Spotify
- Song: ${data.spotify.name}
- Artist: ${data.spotify.artists[0]?.name}
- Album: ${data.spotify.album.name}`
      : "",

    // Messages Section (last 100 messages)
    data.messages.length > 0
      ? `## Recent Messages (Last 100)
${data.messages.map((msg) => `- ${msg.message}`).join("\n")}`
      : "",

    // Statistics Section
    `## Usage Statistics
- Total App Opens: ${data.stats.totalAppOpens}
- Days with Activity: ${data.stats.daysWithAppOpens}
- Days with Messages: ${data.stats.daysWithMessages}

## Swipe Statistics
- Total Likes: ${data.stats.totalSwipesLikes}
- Total Passes: ${data.stats.totalSwipesPasses}
- Total Superlikes: ${data.stats.totalSuperlikes}
- Average Swipes per Day: ${data.stats.averageSwipesPerDay}
- Right Swipe Ratio: ${data.stats.swipeRightToLeftRatio}%

## Match Statistics
- Total Matches: ${data.stats.totalMatches}
- Match to Like Ratio: ${data.stats.matchesToSwipeRightRatio}%
- Overall Match Rate: ${data.stats.matchesRatio}%

## Peak Days
- Most Active Day: ${data.stats.peakDays.appOpens.date} (${data.stats.peakDays.appOpens.value} opens)
- Most Likes: ${data.stats.peakDays.swipesLikes.date} (${data.stats.peakDays.swipesLikes.value} likes)
- Most Passes: ${data.stats.peakDays.swipesPasses.date} (${data.stats.peakDays.swipesPasses.value} passes)
- Most Matches: ${data.stats.peakDays.matches.date} (${data.stats.peakDays.matches.value} matches)
- Most Messages Sent: ${data.stats.peakDays.messagesSent.date} (${data.stats.peakDays.messagesSent.value} messages)
- Most Messages Received: ${data.stats.peakDays.messagesReceived.date} (${data.stats.peakDays.messagesReceived.value} messages)

## Messaging Statistics
- Total Messages Sent: ${data.stats.totalMessagesSent}
- Total Messages Received: ${data.stats.totalMessagesReceived}

## User Profile
- Name: ${data.user.name}
- Age Preferences: ${data.user.age_filter_min} - ${data.user.age_filter_max}
- Birth Date: ${new Date(data.user.birth_date).toLocaleDateString()}
- Gender: ${data.user.gender}
- Bio: ${data.user.bio}
- Interests: ${data.user.user_interests.join(", ")}`,
  ];

  return sections.filter(Boolean).join("\n\n");
};
