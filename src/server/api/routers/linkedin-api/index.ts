import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { LinkedInProfileSchema } from "./schemas";
import { convertLinkedinDataToMarkdown } from "@/lib/convert-to-markdown";

export const linkedinApiRouter = createTRPCRouter({
  getUserData: publicProcedure
    .input(
      z.object({
        linkedinUrl: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // First request to trigger the scraping
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

      const triggerData = (await triggerResponse.json()) as unknown;
      const snapshotId = triggerData.snapshot_id;

      console.log(triggerData);
      console.log(snapshotId);

      // Wait 10 seconds before fetching the snapshot data
      await new Promise((resolve) => setTimeout(resolve, 30000));

      // Second request to get the data using the snapshot ID
      const dataResponse = await fetch(
        `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
        {
          headers: {
            Authorization: `Bearer ${env.BRIGHTDATA_API_KEY}`,
          },
        },
      );

      const rawData = (await dataResponse.json()) as unknown[];
      console.log(rawData);

      // Parse the response with our schema
      const linkedinData = LinkedInProfileSchema.parse(rawData[0]);

      return {
        linkedinData: convertLinkedinDataToMarkdown(linkedinData),
        imageUrl: linkedinData.avatar,
        name: linkedinData.name,
      };
    }),
});
