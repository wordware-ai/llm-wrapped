import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { convertToMarkdown } from "@/lib/convert-to-markdown";

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

      const triggerData = await triggerResponse.json();
      const snapshotId = triggerData.snapshot_id;

      // Second request to get the data using the snapshot ID
      const dataResponse = await fetch(
        `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
        {
          headers: {
            Authorization: `Bearer ${env.BRIGHTDATA_API_KEY}`,
          },
        },
      );

      const linkedinData = await dataResponse.json();

      // For now, just return the raw data converted to markdown
      return {
        linkedinData: convertToMarkdown(linkedinData),
      };
    }),
});
