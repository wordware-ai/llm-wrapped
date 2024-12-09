import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SpotifyResultScalarFieldEnumSchema = z.enum(['id','userId','email','username','imageUrl','leastPopularImageUrl','mostPopularImageUrl','topArtistImageUrl','leastPopularUrl','mostPopularUrl','topArtistUrl','short_summary','music_taste_analysis_1','music_taste_analysis_2','music_taste_analysis_3','lyric_therapy_needed','identity_crisis_level','emotional_stability_rating','achievement','dance_floor_credibility','song_you_would_hit_the_dance_floor','songs_you_secretly_think_are_about_you','guilty_pleasure_song','least_popular_artist','most_popular_artist','time_machine_status','titles_that_need_therapy','final_diagnosis','recommendation','createdAt','updatedAt']);

export const LinkedinResultScalarFieldEnumSchema = z.enum(['id','username','name','imageUrl','currentPositionImageUrl','short_summary','current_position','actual_position','position_mother','accidental_success','ambition','delusional','performance','career_trajectory','next_endeavor','job_description','buzzword_bingo','skills','reason_for_firing','recommendation','createdAt','updatedAt']);

export const TinderResultScalarFieldEnumSchema = z.enum(['id','name','short_summary','alternative','roast_bio','age_preferences','swipe_ratios','match_ratios','message_peak_day','total_messages_sent','chat_heavy_days','personality_insights','theme_song_analysis','bold_text_moves','bold_text_moves_2','bold_text_moves_3','message_style','red_flags','final_recommendation','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SPOTIFY RESULT SCHEMA
/////////////////////////////////////////

export const SpotifyResultSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
  imageUrl: z.string().nullable(),
  leastPopularImageUrl: z.string().nullable(),
  mostPopularImageUrl: z.string().nullable(),
  topArtistImageUrl: z.string().nullable(),
  leastPopularUrl: z.string().nullable(),
  mostPopularUrl: z.string().nullable(),
  topArtistUrl: z.string().nullable(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: JsonValueSchema,
  emotional_stability_rating: JsonValueSchema,
  achievement: JsonValueSchema,
  dance_floor_credibility: z.string(),
  song_you_would_hit_the_dance_floor: z.string(),
  songs_you_secretly_think_are_about_you: z.string(),
  guilty_pleasure_song: z.string(),
  least_popular_artist: z.string(),
  most_popular_artist: z.string(),
  time_machine_status: z.string(),
  titles_that_need_therapy: z.string(),
  final_diagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SpotifyResult = z.infer<typeof SpotifyResultSchema>

/////////////////////////////////////////
// LINKEDIN RESULT SCHEMA
/////////////////////////////////////////

export const LinkedinResultSchema = z.object({
  id: z.string().cuid(),
  username: z.string(),
  name: z.string().nullable(),
  imageUrl: z.string().nullable(),
  currentPositionImageUrl: z.string().nullable(),
  short_summary: z.string(),
  current_position: z.string(),
  actual_position: z.string(),
  position_mother: z.string(),
  accidental_success: z.string(),
  ambition: JsonValueSchema,
  delusional: JsonValueSchema,
  performance: JsonValueSchema,
  career_trajectory: z.string(),
  next_endeavor: z.string(),
  job_description: z.string(),
  buzzword_bingo: z.string(),
  skills: z.string(),
  reason_for_firing: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type LinkedinResult = z.infer<typeof LinkedinResultSchema>

/////////////////////////////////////////
// TINDER RESULT SCHEMA
/////////////////////////////////////////

export const TinderResultSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  short_summary: z.string(),
  alternative: z.string(),
  roast_bio: z.string(),
  age_preferences: z.string(),
  swipe_ratios: JsonValueSchema,
  match_ratios: JsonValueSchema,
  message_peak_day: JsonValueSchema,
  total_messages_sent: JsonValueSchema,
  chat_heavy_days: JsonValueSchema,
  personality_insights: z.string(),
  theme_song_analysis: z.string(),
  bold_text_moves: z.string(),
  bold_text_moves_2: z.string(),
  bold_text_moves_3: z.string(),
  message_style: JsonValueSchema,
  red_flags: z.string(),
  final_recommendation: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TinderResult = z.infer<typeof TinderResultSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SPOTIFY RESULT
//------------------------------------------------------

export const SpotifyResultSelectSchema: z.ZodType<Prisma.SpotifyResultSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  leastPopularImageUrl: z.boolean().optional(),
  mostPopularImageUrl: z.boolean().optional(),
  topArtistImageUrl: z.boolean().optional(),
  leastPopularUrl: z.boolean().optional(),
  mostPopularUrl: z.boolean().optional(),
  topArtistUrl: z.boolean().optional(),
  short_summary: z.boolean().optional(),
  music_taste_analysis_1: z.boolean().optional(),
  music_taste_analysis_2: z.boolean().optional(),
  music_taste_analysis_3: z.boolean().optional(),
  lyric_therapy_needed: z.boolean().optional(),
  identity_crisis_level: z.boolean().optional(),
  emotional_stability_rating: z.boolean().optional(),
  achievement: z.boolean().optional(),
  dance_floor_credibility: z.boolean().optional(),
  song_you_would_hit_the_dance_floor: z.boolean().optional(),
  songs_you_secretly_think_are_about_you: z.boolean().optional(),
  guilty_pleasure_song: z.boolean().optional(),
  least_popular_artist: z.boolean().optional(),
  most_popular_artist: z.boolean().optional(),
  time_machine_status: z.boolean().optional(),
  titles_that_need_therapy: z.boolean().optional(),
  final_diagnosis: z.boolean().optional(),
  recommendation: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// LINKEDIN RESULT
//------------------------------------------------------

export const LinkedinResultSelectSchema: z.ZodType<Prisma.LinkedinResultSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  name: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  currentPositionImageUrl: z.boolean().optional(),
  short_summary: z.boolean().optional(),
  current_position: z.boolean().optional(),
  actual_position: z.boolean().optional(),
  position_mother: z.boolean().optional(),
  accidental_success: z.boolean().optional(),
  ambition: z.boolean().optional(),
  delusional: z.boolean().optional(),
  performance: z.boolean().optional(),
  career_trajectory: z.boolean().optional(),
  next_endeavor: z.boolean().optional(),
  job_description: z.boolean().optional(),
  buzzword_bingo: z.boolean().optional(),
  skills: z.boolean().optional(),
  reason_for_firing: z.boolean().optional(),
  recommendation: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// TINDER RESULT
//------------------------------------------------------

export const TinderResultSelectSchema: z.ZodType<Prisma.TinderResultSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  short_summary: z.boolean().optional(),
  alternative: z.boolean().optional(),
  roast_bio: z.boolean().optional(),
  age_preferences: z.boolean().optional(),
  swipe_ratios: z.boolean().optional(),
  match_ratios: z.boolean().optional(),
  message_peak_day: z.boolean().optional(),
  total_messages_sent: z.boolean().optional(),
  chat_heavy_days: z.boolean().optional(),
  personality_insights: z.boolean().optional(),
  theme_song_analysis: z.boolean().optional(),
  bold_text_moves: z.boolean().optional(),
  bold_text_moves_2: z.boolean().optional(),
  bold_text_moves_3: z.boolean().optional(),
  message_style: z.boolean().optional(),
  red_flags: z.boolean().optional(),
  final_recommendation: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SpotifyResultWhereInputSchema: z.ZodType<Prisma.SpotifyResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  leastPopularUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mostPopularUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topArtistUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonFilterSchema).optional(),
  emotional_stability_rating: z.lazy(() => JsonFilterSchema).optional(),
  achievement: z.lazy(() => JsonFilterSchema).optional(),
  dance_floor_credibility: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guilty_pleasure_song: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  least_popular_artist: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  most_popular_artist: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  time_machine_status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  titles_that_need_therapy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_diagnosis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SpotifyResultOrderByWithRelationInputSchema: z.ZodType<Prisma.SpotifyResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  leastPopularImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mostPopularImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topArtistImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  leastPopularUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mostPopularUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topArtistUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_rating: z.lazy(() => SortOrderSchema).optional(),
  achievement: z.lazy(() => SortOrderSchema).optional(),
  dance_floor_credibility: z.lazy(() => SortOrderSchema).optional(),
  song_you_would_hit_the_dance_floor: z.lazy(() => SortOrderSchema).optional(),
  songs_you_secretly_think_are_about_you: z.lazy(() => SortOrderSchema).optional(),
  guilty_pleasure_song: z.lazy(() => SortOrderSchema).optional(),
  least_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  most_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  time_machine_status: z.lazy(() => SortOrderSchema).optional(),
  titles_that_need_therapy: z.lazy(() => SortOrderSchema).optional(),
  final_diagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyResultWhereUniqueInputSchema: z.ZodType<Prisma.SpotifyResultWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    email: z.string(),
    username: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    username: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
    email: z.string(),
    username: z.string(),
  }),
  z.object({
    userId: z.string(),
    email: z.string(),
  }),
  z.object({
    userId: z.string(),
    username: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    email: z.string(),
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  leastPopularUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mostPopularUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topArtistUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonFilterSchema).optional(),
  emotional_stability_rating: z.lazy(() => JsonFilterSchema).optional(),
  achievement: z.lazy(() => JsonFilterSchema).optional(),
  dance_floor_credibility: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guilty_pleasure_song: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  least_popular_artist: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  most_popular_artist: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  time_machine_status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  titles_that_need_therapy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_diagnosis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const SpotifyResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpotifyResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  leastPopularImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mostPopularImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topArtistImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  leastPopularUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mostPopularUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topArtistUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_rating: z.lazy(() => SortOrderSchema).optional(),
  achievement: z.lazy(() => SortOrderSchema).optional(),
  dance_floor_credibility: z.lazy(() => SortOrderSchema).optional(),
  song_you_would_hit_the_dance_floor: z.lazy(() => SortOrderSchema).optional(),
  songs_you_secretly_think_are_about_you: z.lazy(() => SortOrderSchema).optional(),
  guilty_pleasure_song: z.lazy(() => SortOrderSchema).optional(),
  least_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  most_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  time_machine_status: z.lazy(() => SortOrderSchema).optional(),
  titles_that_need_therapy: z.lazy(() => SortOrderSchema).optional(),
  final_diagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpotifyResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpotifyResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpotifyResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const SpotifyResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpotifyResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  leastPopularUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mostPopularUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  topArtistUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  emotional_stability_rating: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  achievement: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  dance_floor_credibility: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  guilty_pleasure_song: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  least_popular_artist: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  most_popular_artist: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  time_machine_status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  titles_that_need_therapy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  final_diagnosis: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LinkedinResultWhereInputSchema: z.ZodType<Prisma.LinkedinResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LinkedinResultWhereInputSchema),z.lazy(() => LinkedinResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LinkedinResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LinkedinResultWhereInputSchema),z.lazy(() => LinkedinResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  current_position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actual_position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position_mother: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accidental_success: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ambition: z.lazy(() => JsonFilterSchema).optional(),
  delusional: z.lazy(() => JsonFilterSchema).optional(),
  performance: z.lazy(() => JsonFilterSchema).optional(),
  career_trajectory: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  next_endeavor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  buzzword_bingo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  skills: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason_for_firing: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LinkedinResultOrderByWithRelationInputSchema: z.ZodType<Prisma.LinkedinResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currentPositionImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  current_position: z.lazy(() => SortOrderSchema).optional(),
  actual_position: z.lazy(() => SortOrderSchema).optional(),
  position_mother: z.lazy(() => SortOrderSchema).optional(),
  accidental_success: z.lazy(() => SortOrderSchema).optional(),
  ambition: z.lazy(() => SortOrderSchema).optional(),
  delusional: z.lazy(() => SortOrderSchema).optional(),
  performance: z.lazy(() => SortOrderSchema).optional(),
  career_trajectory: z.lazy(() => SortOrderSchema).optional(),
  next_endeavor: z.lazy(() => SortOrderSchema).optional(),
  job_description: z.lazy(() => SortOrderSchema).optional(),
  buzzword_bingo: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  reason_for_firing: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LinkedinResultWhereUniqueInputSchema: z.ZodType<Prisma.LinkedinResultWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    username: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => LinkedinResultWhereInputSchema),z.lazy(() => LinkedinResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LinkedinResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LinkedinResultWhereInputSchema),z.lazy(() => LinkedinResultWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  current_position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actual_position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position_mother: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accidental_success: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ambition: z.lazy(() => JsonFilterSchema).optional(),
  delusional: z.lazy(() => JsonFilterSchema).optional(),
  performance: z.lazy(() => JsonFilterSchema).optional(),
  career_trajectory: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  next_endeavor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  buzzword_bingo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  skills: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason_for_firing: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const LinkedinResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.LinkedinResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currentPositionImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  current_position: z.lazy(() => SortOrderSchema).optional(),
  actual_position: z.lazy(() => SortOrderSchema).optional(),
  position_mother: z.lazy(() => SortOrderSchema).optional(),
  accidental_success: z.lazy(() => SortOrderSchema).optional(),
  ambition: z.lazy(() => SortOrderSchema).optional(),
  delusional: z.lazy(() => SortOrderSchema).optional(),
  performance: z.lazy(() => SortOrderSchema).optional(),
  career_trajectory: z.lazy(() => SortOrderSchema).optional(),
  next_endeavor: z.lazy(() => SortOrderSchema).optional(),
  job_description: z.lazy(() => SortOrderSchema).optional(),
  buzzword_bingo: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  reason_for_firing: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LinkedinResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LinkedinResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LinkedinResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const LinkedinResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LinkedinResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LinkedinResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LinkedinResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LinkedinResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LinkedinResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LinkedinResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  current_position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  actual_position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  position_mother: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accidental_success: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ambition: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  delusional: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  performance: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  career_trajectory: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  next_endeavor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  job_description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  buzzword_bingo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  skills: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reason_for_firing: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TinderResultWhereInputSchema: z.ZodType<Prisma.TinderResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TinderResultWhereInputSchema),z.lazy(() => TinderResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TinderResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TinderResultWhereInputSchema),z.lazy(() => TinderResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alternative: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roast_bio: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age_preferences: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  swipe_ratios: z.lazy(() => JsonFilterSchema).optional(),
  match_ratios: z.lazy(() => JsonFilterSchema).optional(),
  message_peak_day: z.lazy(() => JsonFilterSchema).optional(),
  total_messages_sent: z.lazy(() => JsonFilterSchema).optional(),
  chat_heavy_days: z.lazy(() => JsonFilterSchema).optional(),
  personality_insights: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  theme_song_analysis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message_style: z.lazy(() => JsonFilterSchema).optional(),
  red_flags: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TinderResultOrderByWithRelationInputSchema: z.ZodType<Prisma.TinderResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  alternative: z.lazy(() => SortOrderSchema).optional(),
  roast_bio: z.lazy(() => SortOrderSchema).optional(),
  age_preferences: z.lazy(() => SortOrderSchema).optional(),
  swipe_ratios: z.lazy(() => SortOrderSchema).optional(),
  match_ratios: z.lazy(() => SortOrderSchema).optional(),
  message_peak_day: z.lazy(() => SortOrderSchema).optional(),
  total_messages_sent: z.lazy(() => SortOrderSchema).optional(),
  chat_heavy_days: z.lazy(() => SortOrderSchema).optional(),
  personality_insights: z.lazy(() => SortOrderSchema).optional(),
  theme_song_analysis: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_2: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_3: z.lazy(() => SortOrderSchema).optional(),
  message_style: z.lazy(() => SortOrderSchema).optional(),
  red_flags: z.lazy(() => SortOrderSchema).optional(),
  final_recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TinderResultWhereUniqueInputSchema: z.ZodType<Prisma.TinderResultWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TinderResultWhereInputSchema),z.lazy(() => TinderResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TinderResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TinderResultWhereInputSchema),z.lazy(() => TinderResultWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alternative: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roast_bio: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age_preferences: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  swipe_ratios: z.lazy(() => JsonFilterSchema).optional(),
  match_ratios: z.lazy(() => JsonFilterSchema).optional(),
  message_peak_day: z.lazy(() => JsonFilterSchema).optional(),
  total_messages_sent: z.lazy(() => JsonFilterSchema).optional(),
  chat_heavy_days: z.lazy(() => JsonFilterSchema).optional(),
  personality_insights: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  theme_song_analysis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bold_text_moves_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message_style: z.lazy(() => JsonFilterSchema).optional(),
  red_flags: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const TinderResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.TinderResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  alternative: z.lazy(() => SortOrderSchema).optional(),
  roast_bio: z.lazy(() => SortOrderSchema).optional(),
  age_preferences: z.lazy(() => SortOrderSchema).optional(),
  swipe_ratios: z.lazy(() => SortOrderSchema).optional(),
  match_ratios: z.lazy(() => SortOrderSchema).optional(),
  message_peak_day: z.lazy(() => SortOrderSchema).optional(),
  total_messages_sent: z.lazy(() => SortOrderSchema).optional(),
  chat_heavy_days: z.lazy(() => SortOrderSchema).optional(),
  personality_insights: z.lazy(() => SortOrderSchema).optional(),
  theme_song_analysis: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_2: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_3: z.lazy(() => SortOrderSchema).optional(),
  message_style: z.lazy(() => SortOrderSchema).optional(),
  red_flags: z.lazy(() => SortOrderSchema).optional(),
  final_recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TinderResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TinderResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TinderResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const TinderResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TinderResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TinderResultScalarWhereWithAggregatesInputSchema),z.lazy(() => TinderResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TinderResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TinderResultScalarWhereWithAggregatesInputSchema),z.lazy(() => TinderResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  short_summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  alternative: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roast_bio: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  age_preferences: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  swipe_ratios: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  match_ratios: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  message_peak_day: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  total_messages_sent: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  chat_heavy_days: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  personality_insights: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  theme_song_analysis: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bold_text_moves: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bold_text_moves_2: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bold_text_moves_3: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message_style: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  red_flags: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  final_recommendation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SpotifyResultCreateInputSchema: z.ZodType<Prisma.SpotifyResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  leastPopularImageUrl: z.string().optional().nullable(),
  mostPopularImageUrl: z.string().optional().nullable(),
  topArtistImageUrl: z.string().optional().nullable(),
  leastPopularUrl: z.string().optional().nullable(),
  mostPopularUrl: z.string().optional().nullable(),
  topArtistUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  dance_floor_credibility: z.string(),
  song_you_would_hit_the_dance_floor: z.string(),
  songs_you_secretly_think_are_about_you: z.string(),
  guilty_pleasure_song: z.string(),
  least_popular_artist: z.string(),
  most_popular_artist: z.string(),
  time_machine_status: z.string(),
  titles_that_need_therapy: z.string(),
  final_diagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyResultUncheckedCreateInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  leastPopularImageUrl: z.string().optional().nullable(),
  mostPopularImageUrl: z.string().optional().nullable(),
  topArtistImageUrl: z.string().optional().nullable(),
  leastPopularUrl: z.string().optional().nullable(),
  mostPopularUrl: z.string().optional().nullable(),
  topArtistUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  dance_floor_credibility: z.string(),
  song_you_would_hit_the_dance_floor: z.string(),
  songs_you_secretly_think_are_about_you: z.string(),
  guilty_pleasure_song: z.string(),
  least_popular_artist: z.string(),
  most_popular_artist: z.string(),
  time_machine_status: z.string(),
  titles_that_need_therapy: z.string(),
  final_diagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyResultUpdateInputSchema: z.ZodType<Prisma.SpotifyResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dance_floor_credibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guilty_pleasure_song: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  least_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  most_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time_machine_status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titles_that_need_therapy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_diagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyResultUncheckedUpdateInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dance_floor_credibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guilty_pleasure_song: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  least_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  most_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time_machine_status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titles_that_need_therapy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_diagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyResultCreateManyInputSchema: z.ZodType<Prisma.SpotifyResultCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  leastPopularImageUrl: z.string().optional().nullable(),
  mostPopularImageUrl: z.string().optional().nullable(),
  topArtistImageUrl: z.string().optional().nullable(),
  leastPopularUrl: z.string().optional().nullable(),
  mostPopularUrl: z.string().optional().nullable(),
  topArtistUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  dance_floor_credibility: z.string(),
  song_you_would_hit_the_dance_floor: z.string(),
  songs_you_secretly_think_are_about_you: z.string(),
  guilty_pleasure_song: z.string(),
  least_popular_artist: z.string(),
  most_popular_artist: z.string(),
  time_machine_status: z.string(),
  titles_that_need_therapy: z.string(),
  final_diagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyResultUpdateManyMutationInputSchema: z.ZodType<Prisma.SpotifyResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dance_floor_credibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guilty_pleasure_song: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  least_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  most_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time_machine_status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titles_that_need_therapy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_diagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  leastPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mostPopularUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topArtistUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_rating: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  achievement: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dance_floor_credibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  song_you_would_hit_the_dance_floor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songs_you_secretly_think_are_about_you: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guilty_pleasure_song: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  least_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  most_popular_artist: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time_machine_status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titles_that_need_therapy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_diagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LinkedinResultCreateInputSchema: z.ZodType<Prisma.LinkedinResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  name: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  currentPositionImageUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  current_position: z.string(),
  actual_position: z.string(),
  position_mother: z.string(),
  accidental_success: z.string(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  career_trajectory: z.string(),
  next_endeavor: z.string(),
  job_description: z.string(),
  buzzword_bingo: z.string(),
  skills: z.string(),
  reason_for_firing: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LinkedinResultUncheckedCreateInputSchema: z.ZodType<Prisma.LinkedinResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  name: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  currentPositionImageUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  current_position: z.string(),
  actual_position: z.string(),
  position_mother: z.string(),
  accidental_success: z.string(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  career_trajectory: z.string(),
  next_endeavor: z.string(),
  job_description: z.string(),
  buzzword_bingo: z.string(),
  skills: z.string(),
  reason_for_firing: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LinkedinResultUpdateInputSchema: z.ZodType<Prisma.LinkedinResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actual_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position_mother: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accidental_success: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  career_trajectory: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  next_endeavor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buzzword_bingo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_for_firing: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LinkedinResultUncheckedUpdateInputSchema: z.ZodType<Prisma.LinkedinResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actual_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position_mother: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accidental_success: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  career_trajectory: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  next_endeavor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buzzword_bingo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_for_firing: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LinkedinResultCreateManyInputSchema: z.ZodType<Prisma.LinkedinResultCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  name: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  currentPositionImageUrl: z.string().optional().nullable(),
  short_summary: z.string(),
  current_position: z.string(),
  actual_position: z.string(),
  position_mother: z.string(),
  accidental_success: z.string(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  career_trajectory: z.string(),
  next_endeavor: z.string(),
  job_description: z.string(),
  buzzword_bingo: z.string(),
  skills: z.string(),
  reason_for_firing: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LinkedinResultUpdateManyMutationInputSchema: z.ZodType<Prisma.LinkedinResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actual_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position_mother: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accidental_success: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  career_trajectory: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  next_endeavor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buzzword_bingo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_for_firing: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LinkedinResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LinkedinResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentPositionImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actual_position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position_mother: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accidental_success: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ambition: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  delusional: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  performance: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  career_trajectory: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  next_endeavor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buzzword_bingo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_for_firing: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TinderResultCreateInputSchema: z.ZodType<Prisma.TinderResultCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  short_summary: z.string(),
  alternative: z.string(),
  roast_bio: z.string(),
  age_preferences: z.string(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  personality_insights: z.string(),
  theme_song_analysis: z.string(),
  bold_text_moves: z.string(),
  bold_text_moves_2: z.string(),
  bold_text_moves_3: z.string(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  red_flags: z.string(),
  final_recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TinderResultUncheckedCreateInputSchema: z.ZodType<Prisma.TinderResultUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  short_summary: z.string(),
  alternative: z.string(),
  roast_bio: z.string(),
  age_preferences: z.string(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  personality_insights: z.string(),
  theme_song_analysis: z.string(),
  bold_text_moves: z.string(),
  bold_text_moves_2: z.string(),
  bold_text_moves_3: z.string(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  red_flags: z.string(),
  final_recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TinderResultUpdateInputSchema: z.ZodType<Prisma.TinderResultUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alternative: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roast_bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age_preferences: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  personality_insights: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  theme_song_analysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  red_flags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TinderResultUncheckedUpdateInputSchema: z.ZodType<Prisma.TinderResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alternative: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roast_bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age_preferences: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  personality_insights: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  theme_song_analysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  red_flags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TinderResultCreateManyInputSchema: z.ZodType<Prisma.TinderResultCreateManyInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  short_summary: z.string(),
  alternative: z.string(),
  roast_bio: z.string(),
  age_preferences: z.string(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  personality_insights: z.string(),
  theme_song_analysis: z.string(),
  bold_text_moves: z.string(),
  bold_text_moves_2: z.string(),
  bold_text_moves_3: z.string(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  red_flags: z.string(),
  final_recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TinderResultUpdateManyMutationInputSchema: z.ZodType<Prisma.TinderResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alternative: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roast_bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age_preferences: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  personality_insights: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  theme_song_analysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  red_flags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TinderResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TinderResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alternative: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roast_bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age_preferences: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  swipe_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  match_ratios: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  message_peak_day: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  total_messages_sent: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  chat_heavy_days: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  personality_insights: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  theme_song_analysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bold_text_moves_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  red_flags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SpotifyResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistImageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_rating: z.lazy(() => SortOrderSchema).optional(),
  achievement: z.lazy(() => SortOrderSchema).optional(),
  dance_floor_credibility: z.lazy(() => SortOrderSchema).optional(),
  song_you_would_hit_the_dance_floor: z.lazy(() => SortOrderSchema).optional(),
  songs_you_secretly_think_are_about_you: z.lazy(() => SortOrderSchema).optional(),
  guilty_pleasure_song: z.lazy(() => SortOrderSchema).optional(),
  least_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  most_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  time_machine_status: z.lazy(() => SortOrderSchema).optional(),
  titles_that_need_therapy: z.lazy(() => SortOrderSchema).optional(),
  final_diagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistImageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  dance_floor_credibility: z.lazy(() => SortOrderSchema).optional(),
  song_you_would_hit_the_dance_floor: z.lazy(() => SortOrderSchema).optional(),
  songs_you_secretly_think_are_about_you: z.lazy(() => SortOrderSchema).optional(),
  guilty_pleasure_song: z.lazy(() => SortOrderSchema).optional(),
  least_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  most_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  time_machine_status: z.lazy(() => SortOrderSchema).optional(),
  titles_that_need_therapy: z.lazy(() => SortOrderSchema).optional(),
  final_diagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularImageUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistImageUrl: z.lazy(() => SortOrderSchema).optional(),
  leastPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  mostPopularUrl: z.lazy(() => SortOrderSchema).optional(),
  topArtistUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  dance_floor_credibility: z.lazy(() => SortOrderSchema).optional(),
  song_you_would_hit_the_dance_floor: z.lazy(() => SortOrderSchema).optional(),
  songs_you_secretly_think_are_about_you: z.lazy(() => SortOrderSchema).optional(),
  guilty_pleasure_song: z.lazy(() => SortOrderSchema).optional(),
  least_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  most_popular_artist: z.lazy(() => SortOrderSchema).optional(),
  time_machine_status: z.lazy(() => SortOrderSchema).optional(),
  titles_that_need_therapy: z.lazy(() => SortOrderSchema).optional(),
  final_diagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const LinkedinResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.LinkedinResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  currentPositionImageUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  current_position: z.lazy(() => SortOrderSchema).optional(),
  actual_position: z.lazy(() => SortOrderSchema).optional(),
  position_mother: z.lazy(() => SortOrderSchema).optional(),
  accidental_success: z.lazy(() => SortOrderSchema).optional(),
  ambition: z.lazy(() => SortOrderSchema).optional(),
  delusional: z.lazy(() => SortOrderSchema).optional(),
  performance: z.lazy(() => SortOrderSchema).optional(),
  career_trajectory: z.lazy(() => SortOrderSchema).optional(),
  next_endeavor: z.lazy(() => SortOrderSchema).optional(),
  job_description: z.lazy(() => SortOrderSchema).optional(),
  buzzword_bingo: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  reason_for_firing: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LinkedinResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LinkedinResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  currentPositionImageUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  current_position: z.lazy(() => SortOrderSchema).optional(),
  actual_position: z.lazy(() => SortOrderSchema).optional(),
  position_mother: z.lazy(() => SortOrderSchema).optional(),
  accidental_success: z.lazy(() => SortOrderSchema).optional(),
  career_trajectory: z.lazy(() => SortOrderSchema).optional(),
  next_endeavor: z.lazy(() => SortOrderSchema).optional(),
  job_description: z.lazy(() => SortOrderSchema).optional(),
  buzzword_bingo: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  reason_for_firing: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LinkedinResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.LinkedinResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  currentPositionImageUrl: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  current_position: z.lazy(() => SortOrderSchema).optional(),
  actual_position: z.lazy(() => SortOrderSchema).optional(),
  position_mother: z.lazy(() => SortOrderSchema).optional(),
  accidental_success: z.lazy(() => SortOrderSchema).optional(),
  career_trajectory: z.lazy(() => SortOrderSchema).optional(),
  next_endeavor: z.lazy(() => SortOrderSchema).optional(),
  job_description: z.lazy(() => SortOrderSchema).optional(),
  buzzword_bingo: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  reason_for_firing: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TinderResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.TinderResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  alternative: z.lazy(() => SortOrderSchema).optional(),
  roast_bio: z.lazy(() => SortOrderSchema).optional(),
  age_preferences: z.lazy(() => SortOrderSchema).optional(),
  swipe_ratios: z.lazy(() => SortOrderSchema).optional(),
  match_ratios: z.lazy(() => SortOrderSchema).optional(),
  message_peak_day: z.lazy(() => SortOrderSchema).optional(),
  total_messages_sent: z.lazy(() => SortOrderSchema).optional(),
  chat_heavy_days: z.lazy(() => SortOrderSchema).optional(),
  personality_insights: z.lazy(() => SortOrderSchema).optional(),
  theme_song_analysis: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_2: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_3: z.lazy(() => SortOrderSchema).optional(),
  message_style: z.lazy(() => SortOrderSchema).optional(),
  red_flags: z.lazy(() => SortOrderSchema).optional(),
  final_recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TinderResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TinderResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  alternative: z.lazy(() => SortOrderSchema).optional(),
  roast_bio: z.lazy(() => SortOrderSchema).optional(),
  age_preferences: z.lazy(() => SortOrderSchema).optional(),
  personality_insights: z.lazy(() => SortOrderSchema).optional(),
  theme_song_analysis: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_2: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_3: z.lazy(() => SortOrderSchema).optional(),
  red_flags: z.lazy(() => SortOrderSchema).optional(),
  final_recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TinderResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.TinderResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  alternative: z.lazy(() => SortOrderSchema).optional(),
  roast_bio: z.lazy(() => SortOrderSchema).optional(),
  age_preferences: z.lazy(() => SortOrderSchema).optional(),
  personality_insights: z.lazy(() => SortOrderSchema).optional(),
  theme_song_analysis: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_2: z.lazy(() => SortOrderSchema).optional(),
  bold_text_moves_3: z.lazy(() => SortOrderSchema).optional(),
  red_flags: z.lazy(() => SortOrderSchema).optional(),
  final_recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SpotifyResultFindFirstArgsSchema: z.ZodType<Prisma.SpotifyResultFindFirstArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyResultScalarFieldEnumSchema,SpotifyResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpotifyResultFindFirstOrThrowArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyResultScalarFieldEnumSchema,SpotifyResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyResultFindManyArgsSchema: z.ZodType<Prisma.SpotifyResultFindManyArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyResultScalarFieldEnumSchema,SpotifyResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyResultAggregateArgsSchema: z.ZodType<Prisma.SpotifyResultAggregateArgs> = z.object({
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyResultGroupByArgsSchema: z.ZodType<Prisma.SpotifyResultGroupByArgs> = z.object({
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithAggregationInputSchema.array(),SpotifyResultOrderByWithAggregationInputSchema ]).optional(),
  by: SpotifyResultScalarFieldEnumSchema.array(),
  having: SpotifyResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyResultFindUniqueArgsSchema: z.ZodType<Prisma.SpotifyResultFindUniqueArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpotifyResultFindUniqueOrThrowArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const LinkedinResultFindFirstArgsSchema: z.ZodType<Prisma.LinkedinResultFindFirstArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereInputSchema.optional(),
  orderBy: z.union([ LinkedinResultOrderByWithRelationInputSchema.array(),LinkedinResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LinkedinResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LinkedinResultScalarFieldEnumSchema,LinkedinResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LinkedinResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LinkedinResultFindFirstOrThrowArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereInputSchema.optional(),
  orderBy: z.union([ LinkedinResultOrderByWithRelationInputSchema.array(),LinkedinResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LinkedinResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LinkedinResultScalarFieldEnumSchema,LinkedinResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LinkedinResultFindManyArgsSchema: z.ZodType<Prisma.LinkedinResultFindManyArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereInputSchema.optional(),
  orderBy: z.union([ LinkedinResultOrderByWithRelationInputSchema.array(),LinkedinResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LinkedinResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LinkedinResultScalarFieldEnumSchema,LinkedinResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LinkedinResultAggregateArgsSchema: z.ZodType<Prisma.LinkedinResultAggregateArgs> = z.object({
  where: LinkedinResultWhereInputSchema.optional(),
  orderBy: z.union([ LinkedinResultOrderByWithRelationInputSchema.array(),LinkedinResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LinkedinResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LinkedinResultGroupByArgsSchema: z.ZodType<Prisma.LinkedinResultGroupByArgs> = z.object({
  where: LinkedinResultWhereInputSchema.optional(),
  orderBy: z.union([ LinkedinResultOrderByWithAggregationInputSchema.array(),LinkedinResultOrderByWithAggregationInputSchema ]).optional(),
  by: LinkedinResultScalarFieldEnumSchema.array(),
  having: LinkedinResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LinkedinResultFindUniqueArgsSchema: z.ZodType<Prisma.LinkedinResultFindUniqueArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereUniqueInputSchema,
}).strict() ;

export const LinkedinResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LinkedinResultFindUniqueOrThrowArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereUniqueInputSchema,
}).strict() ;

export const TinderResultFindFirstArgsSchema: z.ZodType<Prisma.TinderResultFindFirstArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereInputSchema.optional(),
  orderBy: z.union([ TinderResultOrderByWithRelationInputSchema.array(),TinderResultOrderByWithRelationInputSchema ]).optional(),
  cursor: TinderResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TinderResultScalarFieldEnumSchema,TinderResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TinderResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TinderResultFindFirstOrThrowArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereInputSchema.optional(),
  orderBy: z.union([ TinderResultOrderByWithRelationInputSchema.array(),TinderResultOrderByWithRelationInputSchema ]).optional(),
  cursor: TinderResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TinderResultScalarFieldEnumSchema,TinderResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TinderResultFindManyArgsSchema: z.ZodType<Prisma.TinderResultFindManyArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereInputSchema.optional(),
  orderBy: z.union([ TinderResultOrderByWithRelationInputSchema.array(),TinderResultOrderByWithRelationInputSchema ]).optional(),
  cursor: TinderResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TinderResultScalarFieldEnumSchema,TinderResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TinderResultAggregateArgsSchema: z.ZodType<Prisma.TinderResultAggregateArgs> = z.object({
  where: TinderResultWhereInputSchema.optional(),
  orderBy: z.union([ TinderResultOrderByWithRelationInputSchema.array(),TinderResultOrderByWithRelationInputSchema ]).optional(),
  cursor: TinderResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TinderResultGroupByArgsSchema: z.ZodType<Prisma.TinderResultGroupByArgs> = z.object({
  where: TinderResultWhereInputSchema.optional(),
  orderBy: z.union([ TinderResultOrderByWithAggregationInputSchema.array(),TinderResultOrderByWithAggregationInputSchema ]).optional(),
  by: TinderResultScalarFieldEnumSchema.array(),
  having: TinderResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TinderResultFindUniqueArgsSchema: z.ZodType<Prisma.TinderResultFindUniqueArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereUniqueInputSchema,
}).strict() ;

export const TinderResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TinderResultFindUniqueOrThrowArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultCreateArgsSchema: z.ZodType<Prisma.SpotifyResultCreateArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  data: z.union([ SpotifyResultCreateInputSchema,SpotifyResultUncheckedCreateInputSchema ]),
}).strict() ;

export const SpotifyResultUpsertArgsSchema: z.ZodType<Prisma.SpotifyResultUpsertArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
  create: z.union([ SpotifyResultCreateInputSchema,SpotifyResultUncheckedCreateInputSchema ]),
  update: z.union([ SpotifyResultUpdateInputSchema,SpotifyResultUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpotifyResultCreateManyArgsSchema: z.ZodType<Prisma.SpotifyResultCreateManyArgs> = z.object({
  data: z.union([ SpotifyResultCreateManyInputSchema,SpotifyResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyResultCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SpotifyResultCreateManyAndReturnArgs> = z.object({
  data: z.union([ SpotifyResultCreateManyInputSchema,SpotifyResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyResultDeleteArgsSchema: z.ZodType<Prisma.SpotifyResultDeleteArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultUpdateArgsSchema: z.ZodType<Prisma.SpotifyResultUpdateArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  data: z.union([ SpotifyResultUpdateInputSchema,SpotifyResultUncheckedUpdateInputSchema ]),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultUpdateManyArgsSchema: z.ZodType<Prisma.SpotifyResultUpdateManyArgs> = z.object({
  data: z.union([ SpotifyResultUpdateManyMutationInputSchema,SpotifyResultUncheckedUpdateManyInputSchema ]),
  where: SpotifyResultWhereInputSchema.optional(),
}).strict() ;

export const SpotifyResultDeleteManyArgsSchema: z.ZodType<Prisma.SpotifyResultDeleteManyArgs> = z.object({
  where: SpotifyResultWhereInputSchema.optional(),
}).strict() ;

export const LinkedinResultCreateArgsSchema: z.ZodType<Prisma.LinkedinResultCreateArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  data: z.union([ LinkedinResultCreateInputSchema,LinkedinResultUncheckedCreateInputSchema ]),
}).strict() ;

export const LinkedinResultUpsertArgsSchema: z.ZodType<Prisma.LinkedinResultUpsertArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereUniqueInputSchema,
  create: z.union([ LinkedinResultCreateInputSchema,LinkedinResultUncheckedCreateInputSchema ]),
  update: z.union([ LinkedinResultUpdateInputSchema,LinkedinResultUncheckedUpdateInputSchema ]),
}).strict() ;

export const LinkedinResultCreateManyArgsSchema: z.ZodType<Prisma.LinkedinResultCreateManyArgs> = z.object({
  data: z.union([ LinkedinResultCreateManyInputSchema,LinkedinResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LinkedinResultCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LinkedinResultCreateManyAndReturnArgs> = z.object({
  data: z.union([ LinkedinResultCreateManyInputSchema,LinkedinResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LinkedinResultDeleteArgsSchema: z.ZodType<Prisma.LinkedinResultDeleteArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  where: LinkedinResultWhereUniqueInputSchema,
}).strict() ;

export const LinkedinResultUpdateArgsSchema: z.ZodType<Prisma.LinkedinResultUpdateArgs> = z.object({
  select: LinkedinResultSelectSchema.optional(),
  data: z.union([ LinkedinResultUpdateInputSchema,LinkedinResultUncheckedUpdateInputSchema ]),
  where: LinkedinResultWhereUniqueInputSchema,
}).strict() ;

export const LinkedinResultUpdateManyArgsSchema: z.ZodType<Prisma.LinkedinResultUpdateManyArgs> = z.object({
  data: z.union([ LinkedinResultUpdateManyMutationInputSchema,LinkedinResultUncheckedUpdateManyInputSchema ]),
  where: LinkedinResultWhereInputSchema.optional(),
}).strict() ;

export const LinkedinResultDeleteManyArgsSchema: z.ZodType<Prisma.LinkedinResultDeleteManyArgs> = z.object({
  where: LinkedinResultWhereInputSchema.optional(),
}).strict() ;

export const TinderResultCreateArgsSchema: z.ZodType<Prisma.TinderResultCreateArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  data: z.union([ TinderResultCreateInputSchema,TinderResultUncheckedCreateInputSchema ]),
}).strict() ;

export const TinderResultUpsertArgsSchema: z.ZodType<Prisma.TinderResultUpsertArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereUniqueInputSchema,
  create: z.union([ TinderResultCreateInputSchema,TinderResultUncheckedCreateInputSchema ]),
  update: z.union([ TinderResultUpdateInputSchema,TinderResultUncheckedUpdateInputSchema ]),
}).strict() ;

export const TinderResultCreateManyArgsSchema: z.ZodType<Prisma.TinderResultCreateManyArgs> = z.object({
  data: z.union([ TinderResultCreateManyInputSchema,TinderResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TinderResultCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TinderResultCreateManyAndReturnArgs> = z.object({
  data: z.union([ TinderResultCreateManyInputSchema,TinderResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TinderResultDeleteArgsSchema: z.ZodType<Prisma.TinderResultDeleteArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  where: TinderResultWhereUniqueInputSchema,
}).strict() ;

export const TinderResultUpdateArgsSchema: z.ZodType<Prisma.TinderResultUpdateArgs> = z.object({
  select: TinderResultSelectSchema.optional(),
  data: z.union([ TinderResultUpdateInputSchema,TinderResultUncheckedUpdateInputSchema ]),
  where: TinderResultWhereUniqueInputSchema,
}).strict() ;

export const TinderResultUpdateManyArgsSchema: z.ZodType<Prisma.TinderResultUpdateManyArgs> = z.object({
  data: z.union([ TinderResultUpdateManyMutationInputSchema,TinderResultUncheckedUpdateManyInputSchema ]),
  where: TinderResultWhereInputSchema.optional(),
}).strict() ;

export const TinderResultDeleteManyArgsSchema: z.ZodType<Prisma.TinderResultDeleteManyArgs> = z.object({
  where: TinderResultWhereInputSchema.optional(),
}).strict() ;