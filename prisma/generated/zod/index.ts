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

export const UserScalarFieldEnumSchema = z.enum(['id','email','username','createdAt','updatedAt']);

export const SpotifyResultScalarFieldEnumSchema = z.enum(['id','short_summary','music_taste_analysis_1','music_taste_analysis_2','music_taste_analysis_3','lyric_therapy_needed','identity_crisis_level','emotional_stability_ranking','achievement','dance_floor_credibility','song_you_would_hit_the_dance_floor','songs_you_secretly_think_are_about_you','guilty_pleasure_song','least_popular_artist','most_popular_artist','time_machine_status','titles_that_need_therapy','final_diagnosis','recommendation','createdAt','updatedAt','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPOTIFY RESULT SCHEMA
/////////////////////////////////////////

export const SpotifyResultSchema = z.object({
  id: z.string().cuid(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: JsonValueSchema,
  emotional_stability_ranking: JsonValueSchema,
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
  userId: z.string(),
})

export type SpotifyResult = z.infer<typeof SpotifyResultSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  spotifyResult: z.union([z.boolean(),z.lazy(() => SpotifyResultArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  spotifyResult: z.union([z.boolean(),z.lazy(() => SpotifyResultArgsSchema)]).optional(),
}).strict()

// SPOTIFY RESULT
//------------------------------------------------------

export const SpotifyResultIncludeSchema: z.ZodType<Prisma.SpotifyResultInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SpotifyResultArgsSchema: z.ZodType<Prisma.SpotifyResultDefaultArgs> = z.object({
  select: z.lazy(() => SpotifyResultSelectSchema).optional(),
  include: z.lazy(() => SpotifyResultIncludeSchema).optional(),
}).strict();

export const SpotifyResultSelectSchema: z.ZodType<Prisma.SpotifyResultSelect> = z.object({
  id: z.boolean().optional(),
  short_summary: z.boolean().optional(),
  music_taste_analysis_1: z.boolean().optional(),
  music_taste_analysis_2: z.boolean().optional(),
  music_taste_analysis_3: z.boolean().optional(),
  lyric_therapy_needed: z.boolean().optional(),
  identity_crisis_level: z.boolean().optional(),
  emotional_stability_ranking: z.boolean().optional(),
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
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  spotifyResult: z.union([ z.lazy(() => SpotifyResultNullableRelationFilterSchema),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  spotifyResult: z.lazy(() => SpotifyResultOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    username: z.string()
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string(),
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
  id: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  spotifyResult: z.union([ z.lazy(() => SpotifyResultNullableRelationFilterSchema),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SpotifyResultWhereInputSchema: z.ZodType<Prisma.SpotifyResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonFilterSchema).optional(),
  emotional_stability_ranking: z.lazy(() => JsonFilterSchema).optional(),
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
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SpotifyResultOrderByWithRelationInputSchema: z.ZodType<Prisma.SpotifyResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_ranking: z.lazy(() => SortOrderSchema).optional(),
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
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SpotifyResultWhereUniqueInputSchema: z.ZodType<Prisma.SpotifyResultWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultWhereInputSchema),z.lazy(() => SpotifyResultWhereInputSchema).array() ]).optional(),
  short_summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonFilterSchema).optional(),
  emotional_stability_ranking: z.lazy(() => JsonFilterSchema).optional(),
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
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SpotifyResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpotifyResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_ranking: z.lazy(() => SortOrderSchema).optional(),
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
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpotifyResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpotifyResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpotifyResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const SpotifyResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpotifyResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  short_summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_1: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_2: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_taste_analysis_3: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lyric_therapy_needed: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identity_crisis_level: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  emotional_stability_ranking: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
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
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyResult: z.lazy(() => SpotifyResultCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyResult: z.lazy(() => SpotifyResultUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyResult: z.lazy(() => SpotifyResultUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyResult: z.lazy(() => SpotifyResultUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyResultCreateInputSchema: z.ZodType<Prisma.SpotifyResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
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
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpotifyResultInputSchema)
}).strict();

export const SpotifyResultUncheckedCreateInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
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
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpotifyResultUpdateInputSchema: z.ZodType<Prisma.SpotifyResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpotifyResultNestedInputSchema).optional()
}).strict();

export const SpotifyResultUncheckedUpdateInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyResultCreateManyInputSchema: z.ZodType<Prisma.SpotifyResultCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
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
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpotifyResultUpdateManyMutationInputSchema: z.ZodType<Prisma.SpotifyResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SpotifyResultNullableRelationFilterSchema: z.ZodType<Prisma.SpotifyResultNullableRelationFilter> = z.object({
  is: z.lazy(() => SpotifyResultWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SpotifyResultWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
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

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SpotifyResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  short_summary: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_1: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_2: z.lazy(() => SortOrderSchema).optional(),
  music_taste_analysis_3: z.lazy(() => SortOrderSchema).optional(),
  lyric_therapy_needed: z.lazy(() => SortOrderSchema).optional(),
  identity_crisis_level: z.lazy(() => SortOrderSchema).optional(),
  emotional_stability_ranking: z.lazy(() => SortOrderSchema).optional(),
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
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
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

export const SpotifyResultCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyResultCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyResultWhereUniqueInputSchema).optional()
}).strict();

export const SpotifyResultUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyResultCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyResultWhereUniqueInputSchema).optional()
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

export const SpotifyResultUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyResultUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyResultCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyResultUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyResultUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyResultUpdateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SpotifyResultUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyResultCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyResultUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyResultWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyResultUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyResultUpdateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpotifyResultInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyResultInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSpotifyResultNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpotifyResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyResultInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpotifyResultInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpotifyResultInputSchema),z.lazy(() => UserUpdateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyResultInputSchema) ]).optional(),
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

export const SpotifyResultCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
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

export const SpotifyResultUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
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

export const SpotifyResultCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyResultUpsertWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SpotifyResultUpdateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SpotifyResultCreateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SpotifyResultWhereInputSchema).optional()
}).strict();

export const SpotifyResultUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyResultWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpotifyResultUpdateWithoutUserInputSchema),z.lazy(() => SpotifyResultUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyResultUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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

export const SpotifyResultUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyResultUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_1: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_2: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_taste_analysis_3: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyric_therapy_needed: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identity_crisis_level: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emotional_stability_ranking: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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

export const UserCreateWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserCreateWithoutSpotifyResultInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpotifyResultInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpotifyResultInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyResultInputSchema) ]),
}).strict();

export const UserUpsertWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpotifyResultInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyResultInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyResultInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpotifyResultInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpotifyResultInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyResultInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpotifyResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSpotifyResultInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpotifyResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultFindFirstArgsSchema: z.ZodType<Prisma.SpotifyResultFindFirstArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyResultScalarFieldEnumSchema,SpotifyResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpotifyResultFindFirstOrThrowArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
  where: SpotifyResultWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyResultOrderByWithRelationInputSchema.array(),SpotifyResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyResultScalarFieldEnumSchema,SpotifyResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyResultFindManyArgsSchema: z.ZodType<Prisma.SpotifyResultFindManyArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
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
  include: SpotifyResultIncludeSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpotifyResultFindUniqueOrThrowArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SpotifyResultCreateArgsSchema: z.ZodType<Prisma.SpotifyResultCreateArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
  data: z.union([ SpotifyResultCreateInputSchema,SpotifyResultUncheckedCreateInputSchema ]),
}).strict() ;

export const SpotifyResultUpsertArgsSchema: z.ZodType<Prisma.SpotifyResultUpsertArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
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
  include: SpotifyResultIncludeSchema.optional(),
  where: SpotifyResultWhereUniqueInputSchema,
}).strict() ;

export const SpotifyResultUpdateArgsSchema: z.ZodType<Prisma.SpotifyResultUpdateArgs> = z.object({
  select: SpotifyResultSelectSchema.optional(),
  include: SpotifyResultIncludeSchema.optional(),
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