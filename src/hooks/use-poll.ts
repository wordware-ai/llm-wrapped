import { api } from "@/trpc/react";
import { useCallback } from "react";

export function usePoll() {
  const utils = api.useUtils();

  const pollData = useCallback(
    async (snapshotId: string) => {
      console.log("Starting poll for snapshot:", snapshotId);
      let attempts = 0;

      const poll = async () => {
        attempts++;
        console.log(
          `Polling attempt ${attempts} for snapshot ${snapshotId}...`,
        );

        const result = await utils.linkedinApi.getScrapedData.fetch({
          snapshotId,
        });

        if (result) {
          console.log("Data received:", {
            name: result.name,
            dataLength: result.linkedinData.length,
          });
          return result;
        }

        console.log(`No data yet (attempt ${attempts}), waiting 5 seconds...`);
        // If no data yet, continue polling
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return poll();
      };

      return poll();
    },
    [utils],
  );

  return { pollData };
}
