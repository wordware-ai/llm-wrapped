import { useStreamContext } from "@/components/stream-provider";
import { parsePartialJSON } from "@/lib/parse-partial-json";

export function useStream() {
  const { setResults, setIsLoading } = useStreamContext();

  async function streamResponse({
    promptId,
    data,
    onFinish,
    timeout = 30000, // 30 second timeout
  }: {
    promptId: string;
    data: string;
    onFinish?: (results: Record<string, unknown>) => void;
    timeout?: number;
  }) {
    setIsLoading(true);
    setResults({}); // Clear previous results

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let accumulatedData = "";
      let finalResults: Record<string, unknown> = {};

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Final decoder flush
            accumulatedData += decoder.decode();
            break;
          }

          accumulatedData += decoder.decode(value, { stream: true });

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

        // Try one final parse after the stream is complete
        try {
          const parsedResults = parsePartialJSON(accumulatedData) as Record<
            string,
            unknown
          >;
          finalResults = parsedResults;
          setResults(finalResults);
        } catch (error) {
          console.error("Final parse error:", error);
        }

        console.log("Stream complete:", finalResults);
        onFinish?.(finalResults);
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("Stream error:", error);
      setResults({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    streamResponse,
  };
}
