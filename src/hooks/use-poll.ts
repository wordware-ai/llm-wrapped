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

        console.log(result);

        if (result && Object.keys(result).length > 0) {
          console.log("Data received:", {
            name: result.name,
            dataLength: result.linkedinData?.length,
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

// import { api } from "@/trpc/react";
// import { useCallback } from "react";

// export function usePoll() {
//   const utils = api.useUtils();

//   const pollData = useCallback(
//     async (snapshotId: string) => {
//       console.log("Starting request for snapshot:", snapshotId);

//       // Wait for 2 seconds
//       await new Promise((resolve) => setTimeout(resolve, 20000));

//       // Make single request
//       const result = await utils.linkedinApi.getScrapedData.fetch({
//         snapshotId,
//       });

//       if (result) {
//         console.log("Data received:", {
//           name: result.name,
//           dataLength: result.linkedinData.length,
//         });
//       }

//       return result;
//     },
//     [utils],
//   );

//   return { pollData };
// }

// import { api } from "@/trpc/react";
// import { useCallback } from "react";

// export function usePoll() {
//   const utils = api.useUtils();

//   const pollData = useCallback(
//     async (snapshotId: string) => {
//       console.log("Starting polling for snapshot:", snapshotId);

//       while (true) {
//         try {
//           const result = await utils.linkedinApi.getScrapedData.fetch({
//             snapshotId,
//           });

//           // If we get here, we received a successful response (not 202)
//           if (result) {
//             console.log("Data received:", {
//               name: result.name,
//               dataLength: result.linkedinData.length,
//             });
//             return result;
//           }

//           // If result is null (indicating 202), wait 5 seconds and try again
//           await new Promise((resolve) => setTimeout(resolve, 5000));
//         } catch (error) {
//           if (error instanceof Response && error.status === 202) {
//             // Wait 5 seconds before retrying
//             await new Promise((resolve) => setTimeout(resolve, 5000));
//             continue;
//           }
//           // For any other error, throw it
//           throw error;
//         }
//       }
//     },
//     [utils],
//   );

//   return { pollData };
// }
