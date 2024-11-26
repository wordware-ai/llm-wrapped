import { useState } from "react";

export function useStream(promptId: string) {
  const [results, setResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function streamResponse() {
    setIsLoading(true);
    setResults({}); // Clear previous results

    const response = await fetch(`/stream/${promptId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          data: "I like the smiths",
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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulatedData += decoder.decode(value);

        // Try to parse any complete key-value pairs
        try {
          // Add closing quote and brace if needed
          let jsonString = accumulatedData;
          if (!jsonString.endsWith("}")) {
            // If the last quote is not closed, close it
            if ((jsonString.match(/"/g) ?? []).length % 2 !== 0) {
              jsonString += '"';
            }
            jsonString += "}";
          }

          // Remove curly braces and split by commas
          const cleanData = jsonString.replace(/^\{|\}$/g, "").trim();

          if (cleanData) {
            // Parse individual key-value pairs
            const pairs = cleanData.split(/,(?=\s*")/);
            const parsedResults: Record<string, string> = {};

            pairs.forEach((pair) => {
              try {
                // Updated regex to handle incomplete strings
                const match = /"([^"]+)":\s*"([^"]*)/.exec(pair);
                if (match?.[1] && match?.[2]) {
                  const [_, key, value] = match;
                  parsedResults[key] = value;
                }
              } catch {
                // Skip invalid pairs
              }
            });

            setResults(parsedResults);
          }
        } catch {
          // Continue if parsing fails
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    results,
    isLoading,
    streamResponse,
  };
}
