import { type SpotifyResult } from "@prisma/client";

export function convertDbToState(
  previousRun: SpotifyResult,
): Record<string, unknown> {
  return { ...previousRun };
}

export function convertStateToDb(results: Record<string, unknown>) {
  return {
    short_summary: String(results.short_summary) ?? "",
    music_taste_analysis_1: String(results.music_taste_analysis_1) ?? "",
    music_taste_analysis_2: String(results.music_taste_analysis_2) ?? "",
    music_taste_analysis_3: String(results.music_taste_analysis_3) ?? "",
    lyric_therapy_needed: String(results.lyric_therapy_needed) ?? "",
    identity_crisis_level: results.identity_crisis_level ?? {},
    emotional_stability_rating: results.emotional_stability_rating ?? {},
    achievement: results.achievement ?? {},
    dance_floor_credibility: String(results.dance_floor_credibility) ?? "",
    song_you_would_hit_the_dance_floor:
      String(results.song_you_would_hit_the_dance_floor) ?? "",
    songs_you_secretly_think_are_about_you:
      String(results.songs_you_secretly_think_are_about_you) ?? "",
    guilty_pleasure_song: String(results.guilty_pleasure_song) ?? "",
    least_popular_artist: String(results.least_popular_artist) ?? "",
    most_popular_artist: String(results.most_popular_artist) ?? "",
    time_machine_status: String(results.time_machine_status) ?? "",
    titles_that_need_therapy: String(results.titles_that_need_therapy) ?? "",
    final_diagnosis: String(results.final_diagnosis) ?? "",
    recommendation: String(results.recommendation) ?? "",
    least_popular_artist_image_url:
      String(results.least_popular_artist_image_url) ?? null,
    most_popular_artist_image_url:
      String(results.most_popular_artist_image_url) ?? null,
    top_artist_image_url: String(results.top_artist_image_url) ?? null,
    user: {}, // Handled in procedure
  };
}