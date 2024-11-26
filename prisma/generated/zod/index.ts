import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','createdAt','updatedAt']);

export const SpotifyRoastScalarFieldEnumSchema = z.enum(['id','musicTasteAnalysis','identityCrisisLevel','emotionalStability','danceFloorCredibility','timeMachineStatus','achievementUnlocked','geographicConfusion','guiltyPleasureSong','songsYouThinkAreAboutYou','lyricTherapistNeeded','finalDiagnosis','recommendation','createdAt','updatedAt','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPOTIFY ROAST SCHEMA
/////////////////////////////////////////

export const SpotifyRoastSchema = z.object({
  id: z.string().cuid(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type SpotifyRoast = z.infer<typeof SpotifyRoastSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  spotifyRoast: z.union([z.boolean(),z.lazy(() => SpotifyRoastArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  spotifyRoast: z.union([z.boolean(),z.lazy(() => SpotifyRoastArgsSchema)]).optional(),
}).strict()

// SPOTIFY ROAST
//------------------------------------------------------

export const SpotifyRoastIncludeSchema: z.ZodType<Prisma.SpotifyRoastInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SpotifyRoastArgsSchema: z.ZodType<Prisma.SpotifyRoastDefaultArgs> = z.object({
  select: z.lazy(() => SpotifyRoastSelectSchema).optional(),
  include: z.lazy(() => SpotifyRoastIncludeSchema).optional(),
}).strict();

export const SpotifyRoastSelectSchema: z.ZodType<Prisma.SpotifyRoastSelect> = z.object({
  id: z.boolean().optional(),
  musicTasteAnalysis: z.boolean().optional(),
  identityCrisisLevel: z.boolean().optional(),
  emotionalStability: z.boolean().optional(),
  danceFloorCredibility: z.boolean().optional(),
  timeMachineStatus: z.boolean().optional(),
  achievementUnlocked: z.boolean().optional(),
  geographicConfusion: z.boolean().optional(),
  guiltyPleasureSong: z.boolean().optional(),
  songsYouThinkAreAboutYou: z.boolean().optional(),
  lyricTherapistNeeded: z.boolean().optional(),
  finalDiagnosis: z.boolean().optional(),
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
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  spotifyRoast: z.union([ z.lazy(() => SpotifyRoastNullableRelationFilterSchema),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  spotifyRoast: z.lazy(() => SpotifyRoastOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  spotifyRoast: z.union([ z.lazy(() => SpotifyRoastNullableRelationFilterSchema),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SpotifyRoastWhereInputSchema: z.ZodType<Prisma.SpotifyRoastWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyRoastWhereInputSchema),z.lazy(() => SpotifyRoastWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyRoastWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyRoastWhereInputSchema),z.lazy(() => SpotifyRoastWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  musicTasteAnalysis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identityCrisisLevel: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emotionalStability: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  danceFloorCredibility: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timeMachineStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievementUnlocked: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  geographicConfusion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guiltyPleasureSong: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyricTherapistNeeded: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  finalDiagnosis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastOrderByWithRelationInputSchema: z.ZodType<Prisma.SpotifyRoastOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  musicTasteAnalysis: z.lazy(() => SortOrderSchema).optional(),
  identityCrisisLevel: z.lazy(() => SortOrderSchema).optional(),
  emotionalStability: z.lazy(() => SortOrderSchema).optional(),
  danceFloorCredibility: z.lazy(() => SortOrderSchema).optional(),
  timeMachineStatus: z.lazy(() => SortOrderSchema).optional(),
  achievementUnlocked: z.lazy(() => SortOrderSchema).optional(),
  geographicConfusion: z.lazy(() => SortOrderSchema).optional(),
  guiltyPleasureSong: z.lazy(() => SortOrderSchema).optional(),
  songsYouThinkAreAboutYou: z.lazy(() => SortOrderSchema).optional(),
  lyricTherapistNeeded: z.lazy(() => SortOrderSchema).optional(),
  finalDiagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SpotifyRoastWhereUniqueInputSchema: z.ZodType<Prisma.SpotifyRoastWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => SpotifyRoastWhereInputSchema),z.lazy(() => SpotifyRoastWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyRoastWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyRoastWhereInputSchema),z.lazy(() => SpotifyRoastWhereInputSchema).array() ]).optional(),
  musicTasteAnalysis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identityCrisisLevel: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emotionalStability: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  danceFloorCredibility: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timeMachineStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievementUnlocked: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  geographicConfusion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guiltyPleasureSong: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lyricTherapistNeeded: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  finalDiagnosis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SpotifyRoastOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpotifyRoastOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  musicTasteAnalysis: z.lazy(() => SortOrderSchema).optional(),
  identityCrisisLevel: z.lazy(() => SortOrderSchema).optional(),
  emotionalStability: z.lazy(() => SortOrderSchema).optional(),
  danceFloorCredibility: z.lazy(() => SortOrderSchema).optional(),
  timeMachineStatus: z.lazy(() => SortOrderSchema).optional(),
  achievementUnlocked: z.lazy(() => SortOrderSchema).optional(),
  geographicConfusion: z.lazy(() => SortOrderSchema).optional(),
  guiltyPleasureSong: z.lazy(() => SortOrderSchema).optional(),
  songsYouThinkAreAboutYou: z.lazy(() => SortOrderSchema).optional(),
  lyricTherapistNeeded: z.lazy(() => SortOrderSchema).optional(),
  finalDiagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpotifyRoastCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpotifyRoastMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpotifyRoastMinOrderByAggregateInputSchema).optional()
}).strict();

export const SpotifyRoastScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpotifyRoastScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyRoastScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyRoastScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyRoastScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyRoastScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyRoastScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  musicTasteAnalysis: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identityCrisisLevel: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emotionalStability: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  danceFloorCredibility: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timeMachineStatus: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  achievementUnlocked: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  geographicConfusion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  guiltyPleasureSong: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lyricTherapistNeeded: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  finalDiagnosis: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyRoast: z.lazy(() => SpotifyRoastCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyRoast: z.lazy(() => SpotifyRoastUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyRoast: z.lazy(() => SpotifyRoastUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyRoast: z.lazy(() => SpotifyRoastUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastCreateInputSchema: z.ZodType<Prisma.SpotifyRoastCreateInput> = z.object({
  id: z.string().cuid().optional(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpotifyRoastInputSchema)
}).strict();

export const SpotifyRoastUncheckedCreateInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpotifyRoastUpdateInputSchema: z.ZodType<Prisma.SpotifyRoastUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpotifyRoastNestedInputSchema).optional()
}).strict();

export const SpotifyRoastUncheckedUpdateInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastCreateManyInputSchema: z.ZodType<Prisma.SpotifyRoastCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpotifyRoastUpdateManyMutationInputSchema: z.ZodType<Prisma.SpotifyRoastUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SpotifyRoastNullableRelationFilterSchema: z.ZodType<Prisma.SpotifyRoastNullableRelationFilter> = z.object({
  is: z.lazy(() => SpotifyRoastWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SpotifyRoastWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SpotifyRoastCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyRoastCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  musicTasteAnalysis: z.lazy(() => SortOrderSchema).optional(),
  identityCrisisLevel: z.lazy(() => SortOrderSchema).optional(),
  emotionalStability: z.lazy(() => SortOrderSchema).optional(),
  danceFloorCredibility: z.lazy(() => SortOrderSchema).optional(),
  timeMachineStatus: z.lazy(() => SortOrderSchema).optional(),
  achievementUnlocked: z.lazy(() => SortOrderSchema).optional(),
  geographicConfusion: z.lazy(() => SortOrderSchema).optional(),
  guiltyPleasureSong: z.lazy(() => SortOrderSchema).optional(),
  songsYouThinkAreAboutYou: z.lazy(() => SortOrderSchema).optional(),
  lyricTherapistNeeded: z.lazy(() => SortOrderSchema).optional(),
  finalDiagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyRoastMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyRoastMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  musicTasteAnalysis: z.lazy(() => SortOrderSchema).optional(),
  identityCrisisLevel: z.lazy(() => SortOrderSchema).optional(),
  emotionalStability: z.lazy(() => SortOrderSchema).optional(),
  danceFloorCredibility: z.lazy(() => SortOrderSchema).optional(),
  timeMachineStatus: z.lazy(() => SortOrderSchema).optional(),
  achievementUnlocked: z.lazy(() => SortOrderSchema).optional(),
  geographicConfusion: z.lazy(() => SortOrderSchema).optional(),
  guiltyPleasureSong: z.lazy(() => SortOrderSchema).optional(),
  songsYouThinkAreAboutYou: z.lazy(() => SortOrderSchema).optional(),
  lyricTherapistNeeded: z.lazy(() => SortOrderSchema).optional(),
  finalDiagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyRoastMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyRoastMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  musicTasteAnalysis: z.lazy(() => SortOrderSchema).optional(),
  identityCrisisLevel: z.lazy(() => SortOrderSchema).optional(),
  emotionalStability: z.lazy(() => SortOrderSchema).optional(),
  danceFloorCredibility: z.lazy(() => SortOrderSchema).optional(),
  timeMachineStatus: z.lazy(() => SortOrderSchema).optional(),
  achievementUnlocked: z.lazy(() => SortOrderSchema).optional(),
  geographicConfusion: z.lazy(() => SortOrderSchema).optional(),
  guiltyPleasureSong: z.lazy(() => SortOrderSchema).optional(),
  songsYouThinkAreAboutYou: z.lazy(() => SortOrderSchema).optional(),
  lyricTherapistNeeded: z.lazy(() => SortOrderSchema).optional(),
  finalDiagnosis: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyRoastCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyRoastCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyRoastWhereUniqueInputSchema).optional()
}).strict();

export const SpotifyRoastUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyRoastCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyRoastWhereUniqueInputSchema).optional()
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

export const SpotifyRoastUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyRoastUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyRoastCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyRoastUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyRoastWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyRoastUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyRoastUpdateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyRoastCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyRoastUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyRoastWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyRoastWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyRoastUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyRoastUpdateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpotifyRoastInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyRoastInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyRoastInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSpotifyRoastNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpotifyRoastNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyRoastInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyRoastInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpotifyRoastInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpotifyRoastInputSchema),z.lazy(() => UserUpdateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyRoastInputSchema) ]).optional(),
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

export const SpotifyRoastCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyRoastUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  musicTasteAnalysis: z.string(),
  identityCrisisLevel: z.string(),
  emotionalStability: z.string(),
  danceFloorCredibility: z.string(),
  timeMachineStatus: z.string(),
  achievementUnlocked: z.string(),
  geographicConfusion: z.string(),
  guiltyPleasureSong: z.string(),
  songsYouThinkAreAboutYou: z.string(),
  lyricTherapistNeeded: z.string(),
  finalDiagnosis: z.string(),
  recommendation: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyRoastCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyRoastWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyRoastUpsertWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SpotifyRoastUpdateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SpotifyRoastCreateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SpotifyRoastWhereInputSchema).optional()
}).strict();

export const SpotifyRoastUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyRoastWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpotifyRoastUpdateWithoutUserInputSchema),z.lazy(() => SpotifyRoastUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyRoastUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyRoastUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyRoastUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  musicTasteAnalysis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityCrisisLevel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotionalStability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  danceFloorCredibility: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timeMachineStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementUnlocked: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  geographicConfusion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guiltyPleasureSong: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  songsYouThinkAreAboutYou: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lyricTherapistNeeded: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  finalDiagnosis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserCreateWithoutSpotifyRoastInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpotifyRoastInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpotifyRoastInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyRoastInputSchema) ]),
}).strict();

export const UserUpsertWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpotifyRoastInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyRoastInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyRoastInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpotifyRoastInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpotifyRoastInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyRoastInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpotifyRoastInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSpotifyRoastInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpotifyRoastInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const SpotifyRoastFindFirstArgsSchema: z.ZodType<Prisma.SpotifyRoastFindFirstArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyRoastOrderByWithRelationInputSchema.array(),SpotifyRoastOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyRoastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyRoastScalarFieldEnumSchema,SpotifyRoastScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyRoastFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpotifyRoastFindFirstOrThrowArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyRoastOrderByWithRelationInputSchema.array(),SpotifyRoastOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyRoastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyRoastScalarFieldEnumSchema,SpotifyRoastScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyRoastFindManyArgsSchema: z.ZodType<Prisma.SpotifyRoastFindManyArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyRoastOrderByWithRelationInputSchema.array(),SpotifyRoastOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyRoastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyRoastScalarFieldEnumSchema,SpotifyRoastScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyRoastAggregateArgsSchema: z.ZodType<Prisma.SpotifyRoastAggregateArgs> = z.object({
  where: SpotifyRoastWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyRoastOrderByWithRelationInputSchema.array(),SpotifyRoastOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyRoastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyRoastGroupByArgsSchema: z.ZodType<Prisma.SpotifyRoastGroupByArgs> = z.object({
  where: SpotifyRoastWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyRoastOrderByWithAggregationInputSchema.array(),SpotifyRoastOrderByWithAggregationInputSchema ]).optional(),
  by: SpotifyRoastScalarFieldEnumSchema.array(),
  having: SpotifyRoastScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyRoastFindUniqueArgsSchema: z.ZodType<Prisma.SpotifyRoastFindUniqueArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereUniqueInputSchema,
}).strict() ;

export const SpotifyRoastFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpotifyRoastFindUniqueOrThrowArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereUniqueInputSchema,
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

export const SpotifyRoastCreateArgsSchema: z.ZodType<Prisma.SpotifyRoastCreateArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  data: z.union([ SpotifyRoastCreateInputSchema,SpotifyRoastUncheckedCreateInputSchema ]),
}).strict() ;

export const SpotifyRoastUpsertArgsSchema: z.ZodType<Prisma.SpotifyRoastUpsertArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereUniqueInputSchema,
  create: z.union([ SpotifyRoastCreateInputSchema,SpotifyRoastUncheckedCreateInputSchema ]),
  update: z.union([ SpotifyRoastUpdateInputSchema,SpotifyRoastUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpotifyRoastCreateManyArgsSchema: z.ZodType<Prisma.SpotifyRoastCreateManyArgs> = z.object({
  data: z.union([ SpotifyRoastCreateManyInputSchema,SpotifyRoastCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyRoastCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SpotifyRoastCreateManyAndReturnArgs> = z.object({
  data: z.union([ SpotifyRoastCreateManyInputSchema,SpotifyRoastCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyRoastDeleteArgsSchema: z.ZodType<Prisma.SpotifyRoastDeleteArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  where: SpotifyRoastWhereUniqueInputSchema,
}).strict() ;

export const SpotifyRoastUpdateArgsSchema: z.ZodType<Prisma.SpotifyRoastUpdateArgs> = z.object({
  select: SpotifyRoastSelectSchema.optional(),
  include: SpotifyRoastIncludeSchema.optional(),
  data: z.union([ SpotifyRoastUpdateInputSchema,SpotifyRoastUncheckedUpdateInputSchema ]),
  where: SpotifyRoastWhereUniqueInputSchema,
}).strict() ;

export const SpotifyRoastUpdateManyArgsSchema: z.ZodType<Prisma.SpotifyRoastUpdateManyArgs> = z.object({
  data: z.union([ SpotifyRoastUpdateManyMutationInputSchema,SpotifyRoastUncheckedUpdateManyInputSchema ]),
  where: SpotifyRoastWhereInputSchema.optional(),
}).strict() ;

export const SpotifyRoastDeleteManyArgsSchema: z.ZodType<Prisma.SpotifyRoastDeleteManyArgs> = z.object({
  where: SpotifyRoastWhereInputSchema.optional(),
}).strict() ;