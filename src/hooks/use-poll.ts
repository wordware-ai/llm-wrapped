import { api } from "@/trpc/react";
import { useCallback } from "react";

export function usePoll() {
  const utils = api.useUtils();

  const pollData = useCallback(
    async (snapshotId: string) => {
      const poll = async () => {
        const result = await utils.linkedinApi.getScrapedData.fetch({
          snapshotId,
        });

        if (result && Object.keys(result).length > 0) {
          return result;
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
        return poll();
      };

      return poll();
    },

    [utils],
  );

  return { pollData };
}
