export function parsePartialJSON(input: string): unknown {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  // Helper function to balance quotes
  function balanceQuotes(str: string): string {
    let inString = false;
    let escaped = false;

    for (const char of str) {
      if (char === '"' && !escaped) {
        inString = !inString;
      }
      escaped = char === "\\" && !escaped;
    }

    // If we're still in a string, close it
    if (inString) {
      return str + '"';
    }
    return str;
  }

  // Helper function to balance braces
  function balanceBraces(str: string): string {
    let result = str;
    let openBraces = 0;
    let openBrackets = 0;
    let inString = false;
    let escaped = false;

    for (const char of str) {
      if (char === '"' && !escaped) {
        inString = !inString;
      } else if (!inString) {
        if (char === "{") openBraces++;
        if (char === "}") openBraces--;
        if (char === "[") openBrackets++;
        if (char === "]") openBrackets--;
      }
      escaped = char === "\\" && !escaped;
    }

    // Add missing closing braces and brackets
    while (openBraces > 0) {
      result += "}";
      openBraces--;
    }
    while (openBrackets > 0) {
      result += "]";
      openBrackets--;
    }

    return result;
  }

  try {
    // Try parsing as-is first
    return JSON.parse(input);
  } catch {
    // If parsing fails, try to fix the JSON
    let processed = input.trim();

    // Balance quotes first
    processed = balanceQuotes(processed);

    // Then balance braces
    processed = balanceBraces(processed);

    try {
      return JSON.parse(processed);
    } catch (e: unknown) {
      throw new Error(
        `Could not parse JSON: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }
}
