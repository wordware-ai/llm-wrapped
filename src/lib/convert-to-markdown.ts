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

  const getTop3DatesWithValues = (record: Record<string, number | null>) => {
    return Object.entries(record)
      .filter(([_, value]) => value !== null)
      .sort(([_, a], [__, b]) => (b || 0) - (a || 0))
      .slice(0, 3)
      .map(([date, value]) => `${date}: ${value}`)
      .join(", ");
  };

  const sections = [
    // Messages section
    data.messages.length > 0
      ? `## Messages\n${data.messages.map((msg) => `- ${msg}`).join("\n")}`
      : "",

    // Spotify
    data.spotify
      ? `## Spotify\n- Song: ${data.spotify.name}\n- Artist: ${data.spotify.artists[0]?.name}`
      : "",

    // Usage Statistics
    `## Usage Statistics
- Total App Opens: ${data.stats.totalAppOpens}
  - Top Days: ${getTop3DatesWithValues(data.stats.appOpensByDate)}
- Days App Opened: ${data.stats.daysWithAppOpens}
- Days with Messages: ${data.stats.daysWithMessages}

## Swipe Statistics
- Likes: ${data.stats.totalSwipesLikes}
  - Top Days: ${getTop3DatesWithValues(data.stats.swipeLikesByDate)}
- Passes: ${data.stats.totalSwipesPasses}
  - Top Days: ${getTop3DatesWithValues(data.stats.swipePassesByDate)}
- Average Swipes per Day: ${data.stats.averageSwipesPerDay}
- Right to Left Ratio: ${data.stats.swipeRightToLeftRatio}%
- Matches to Right Swipe Ratio: ${data.stats.matchesToSwipeRightRatio}%
- Total Superlikes: ${data.stats.totalSuperlikes}

## Match Statistics
- Total Matches: ${data.stats.totalMatches}
  - Top Days: ${getTop3DatesWithValues(data.stats.matchesByDate)}
- Match Ratio: ${data.stats.matchesRatio}%

## Message Statistics
- Messages Sent: ${data.stats.totalMessagesSent}
  - Top Days: ${getTop3DatesWithValues(data.stats.messagesSentByDate)}
- Messages Received: ${data.stats.totalMessagesReceived}
  - Top Days: ${getTop3DatesWithValues(data.stats.messagesReceivedByDate)}

## User Profile
- Age Range: ${data.user.age_filter_min} - ${data.user.age_filter_max}
- Birth Date: ${new Date(data.user.birth_date).toLocaleDateString()}
- Age: ${new Date().getFullYear() - new Date(data.user.birth_date).getFullYear()}
- Gender: ${data.user.gender}
- Bio: ${data.user.bio}
- Interests: ${data.user.user_interests.join(", ")}`,
  ];

  return sections.filter(Boolean).join("\n\n");
};
