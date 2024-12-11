import { type LinkedinResult } from "@prisma/client";

export function convertLinkedinDbToState(
  previousRun: Partial<LinkedinResult>,
): Record<string, unknown> {
  const fieldsToRemove = [
    "createdAt",
    "updatedAt",
    "id",
    "username",
    "name",
    "imageUrl",
    "currentPositionImageUrl",
    "scrapeFailed",
  ];
  const cleanedPreviousRun = Object.fromEntries(
    Object.entries(previousRun).filter(
      ([key]) => !fieldsToRemove.includes(key),
    ),
  );
  return { ...cleanedPreviousRun };
}

export function convertLinkedinToDb(results: Record<string, unknown>) {
  return {
    short_summary: String(results.short_summary) ?? "",
    current_position: String(results.current_position) ?? "",
    actual_position: String(results.actual_position) ?? "",
    position_mother: String(results.position_mother) ?? "",
    accidental_success: String(results.accidental_success) ?? "",
    ambition: results.ambition ?? {},
    delusional: results.delusional ?? {},
    performance: results.performance ?? {},
    career_trajectory: String(results.career_trajectory) ?? "",
    next_endeavor: String(results.next_endeavor) ?? "",
    job_description: String(results.job_description) ?? "",
    buzzword_bingo: String(results.buzzword_bingo) ?? "",
    skills: String(results.skills) ?? "",
    reason_for_firing: String(results.reason_for_firing) ?? "",
    recommendation: String(results.recommendation) ?? "",
  };
}
