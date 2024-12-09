import { type TinderResult } from "@prisma/client";

export function convertTinderDbToState(
  previousRun: Partial<TinderResult>,
): Record<string, unknown> {
  const fieldsToRemove = ["createdAt", "updatedAt", "id", "name"];
  const cleanedPreviousRun = Object.fromEntries(
    Object.entries(previousRun).filter(
      ([key]) => !fieldsToRemove.includes(key),
    ),
  );
  return { ...cleanedPreviousRun };
}

export function convertTinderToDb(results: Record<string, unknown>) {
  return {
    short_summary: String(results.short_summary) ?? "",
    alternative: String(results.alternative) ?? "",
    roast_bio: String(results.roast_bio) ?? "",
    age_preferences: String(results.age_preferences) ?? "",
    swipe_ratios: results.swipe_ratios ?? {},
    match_ratios: results.match_ratios ?? {},
    message_peak_day: results.message_peak_day ?? {},
    total_messages_sent: results.total_messages_sent ?? {},
    chat_heavy_days: results.chat_heavy_days ?? {},
    personality_insights: String(results.personality_insights) ?? "",
    theme_song_analysis: String(results.theme_song_analysis) ?? "",
    bold_text_moves: String(results.bold_text_moves) ?? "",
    bold_text_moves2: String(results.bold_text_moves2) ?? "",
    bold_text_moves3: String(results.bold_text_moves3) ?? "",
    message_style: results.message_style ?? {},
    red_flags: String(results.red_flags) ?? "",
    final_recommendation: String(results.final_recommendation) ?? "",
  };
}
