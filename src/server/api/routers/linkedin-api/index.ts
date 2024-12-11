import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { type Experience, LinkedInProfileSchema } from "./schemas";
import { convertLinkedinDataToMarkdown } from "@/lib/convert-to-markdown";

const triggerScrapeResponseSchema = z.object({
  snapshot_id: z.string(),
});

export const linkedinApiRouter = createTRPCRouter({
  // First endpoint to trigger the scraping
  triggerScrape: publicProcedure
    .input(
      z.object({
        linkedinUrl: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const triggerResponse = await fetch(
        "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_l1viktl72bvl7bjuj0&include_errors=true",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.BRIGHTDATA_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ url: input.linkedinUrl }]),
        },
      );

      const rawData = (await triggerResponse.json()) as unknown;
      const triggerData = triggerScrapeResponseSchema.parse(rawData);

      return triggerData.snapshot_id;
    }),

  // Second endpoint to fetch the scraped data
  getScrapedData: publicProcedure
    .input(
      z.object({
        snapshotId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const dataResponse = await fetch(
        `https://api.brightdata.com/datasets/v3/snapshot/${input.snapshotId}?format=json`,
        {
          headers: {
            Authorization: `Bearer ${env.BRIGHTDATA_API_KEY}`,
          },
        },
      );

      // If status is 202, data is not ready yet
      if (dataResponse.status === 202) {
        return {};
      }

      const rawData = (await dataResponse.json()) as unknown[];

      // If no data, throw an error
      if (!rawData || rawData.length === 0) {
        throw new Error("No data found");
      }

      // Rest of your existing processing logic
      const linkedinData = LinkedInProfileSchema.parse(rawData[0]);

      if (!linkedinData.experience) {
        return { noExperienceData: true, profileData: linkedinData };
      }

      const getCurrentCompanyImageUrl = (experience?: Experience[] | null) => {
        if (!experience) return null;
        return experience
          .sort((a, b) => {
            const dateA = new Date(a?.start_date ?? 0);
            const dateB = new Date(b?.start_date ?? 0);
            return dateB.getTime() - dateA.getTime();
          })
          .find((experience) => experience?.company)?.company_logo_url;
      };

      return {
        linkedinData: convertLinkedinDataToMarkdown(linkedinData),
        imageUrl: linkedinData.avatar,
        name: linkedinData.name,
        currentCompanyImageUrl: getCurrentCompanyImageUrl(
          linkedinData.experience,
        ),
      };
    }),
});
