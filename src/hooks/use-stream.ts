import { useStreamContext } from "@/components/stream-provider";
import { parsePartialJSON } from "@/lib/parse-partial-json";

export function useStream() {
  const { setResults, setIsLoading } = useStreamContext();

  async function streamResponse({
    promptId,
    data,
    onFinish,
  }: {
    promptId: string;
    data: string;
    onFinish?: (results: Record<string, unknown>) => void;
  }) {
    setIsLoading(true);
    setResults({}); // Clear previous results

    const response = await fetch(`/stream/${promptId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          data,
        },
        version: "^1.0",
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      setResults({ error: `Error: ${response.status}` });
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      setIsLoading(false);
      setResults({ error: "Error: No reader available" });
      return;
    }

    try {
      let accumulatedData = "";
      let finalResults: Record<string, unknown> = {};

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulatedData += decoder.decode(value);

        // Try to parse any complete key-value pairs
        try {
          const parsedResults = parsePartialJSON(accumulatedData) as Record<
            string,
            unknown
          >;
          console.log(parsedResults);
          finalResults = parsedResults;
          setResults(finalResults);
        } catch {
          // Continue if parsing fails
        }
      }

      // Use finalResults for logging and callback
      console.log("done", finalResults);
      onFinish?.(finalResults);
    } catch (error) {
      console.error("Stream error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    streamResponse,
  };
}
