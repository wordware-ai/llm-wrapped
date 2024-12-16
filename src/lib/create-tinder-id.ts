import { randomUUID } from "crypto";

export const createId = (name?: string) => {
  const baseId = name ? name.toLowerCase().replace(/\s+/g, "-") : randomUUID(); // Use crypto UUID if no name
  const uniqueSuffix = Math.random().toString(36).substring(2, 8); // Generates a random string
  return `${baseId}-${uniqueSuffix}`;
};
