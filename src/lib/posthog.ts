import { env } from "@/env";
import "server-only";

interface PostHogInsightResult {
  count: number;
  label: string;
}

interface PostHogResponse {
  result: PostHogInsightResult[];
}

interface VisitData {
  name: string;
  visits: number;
}

export interface MostVisitedData {
  spotify: VisitData[];
  linkedin: VisitData[];
  tinder: VisitData[];
}

export const getMostVisited = async (): Promise<MostVisitedData> => {
  try {
    const response = await fetch(
      `https://app.posthog.com/api/projects/${env.POSTHOG_PROJECT_ID}/insights/2150575`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.POSTHOG_PERSONAL_API_KEY}`,
        },
      },
    );
    const data = (await response.json()) as PostHogResponse;
    const insights = data.result;

    const processInsights = (
      platform: "spotify" | "linkedin" | "tinder",
    ): VisitData[] => {
      return insights
        .filter(
          (item) =>
            item.label !== "open" && item.label.startsWith(`/${platform}/`),
        )
        .map((item) => ({
          name: item.label.split(`/${platform}/`)[1], // Only get the username part
          visits: item.count,
        }))
        .filter((item): item is VisitData => item.name !== undefined);
    };

    return {
      spotify: processInsights("spotify"),
      linkedin: processInsights("linkedin"),
      tinder: processInsights("tinder"),
    };
  } catch (error) {
    console.error("🥲 Error fetching visited data:", error);
    return {
      spotify: [],
      linkedin: [],
      tinder: [],
    };
  }
};
