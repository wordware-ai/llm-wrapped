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

export const SpotifyAuthScalarFieldEnumSchema = z.enum(['id','userId','accessToken','refreshToken','tokenType','expiresIn','scope','createdAt','updatedAt']);

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
  id: z.string().cuid(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPOTIFY AUTH SCHEMA
/////////////////////////////////////////

export const SpotifyAuthSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SpotifyAuth = z.infer<typeof SpotifyAuthSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  spotifyAuth: z.union([z.boolean(),z.lazy(() => SpotifyAuthArgsSchema)]).optional(),
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
  spotifyAuth: z.union([z.boolean(),z.lazy(() => SpotifyAuthArgsSchema)]).optional(),
}).strict()

// SPOTIFY AUTH
//------------------------------------------------------

export const SpotifyAuthIncludeSchema: z.ZodType<Prisma.SpotifyAuthInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SpotifyAuthArgsSchema: z.ZodType<Prisma.SpotifyAuthDefaultArgs> = z.object({
  select: z.lazy(() => SpotifyAuthSelectSchema).optional(),
  include: z.lazy(() => SpotifyAuthIncludeSchema).optional(),
}).strict();

export const SpotifyAuthSelectSchema: z.ZodType<Prisma.SpotifyAuthSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  tokenType: z.boolean().optional(),
  expiresIn: z.boolean().optional(),
  scope: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
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
  spotifyAuth: z.union([ z.lazy(() => SpotifyAuthNullableRelationFilterSchema),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  spotifyAuth: z.lazy(() => SpotifyAuthOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  spotifyAuth: z.union([ z.lazy(() => SpotifyAuthNullableRelationFilterSchema),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional().nullable(),
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

export const SpotifyAuthWhereInputSchema: z.ZodType<Prisma.SpotifyAuthWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyAuthWhereInputSchema),z.lazy(() => SpotifyAuthWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyAuthWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyAuthWhereInputSchema),z.lazy(() => SpotifyAuthWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  scope: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthOrderByWithRelationInputSchema: z.ZodType<Prisma.SpotifyAuthOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenType: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SpotifyAuthWhereUniqueInputSchema: z.ZodType<Prisma.SpotifyAuthWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => SpotifyAuthWhereInputSchema),z.lazy(() => SpotifyAuthWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyAuthWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyAuthWhereInputSchema),z.lazy(() => SpotifyAuthWhereInputSchema).array() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  scope: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SpotifyAuthOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpotifyAuthOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenType: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpotifyAuthCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpotifyAuthAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpotifyAuthMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpotifyAuthMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpotifyAuthSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpotifyAuthScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpotifyAuthScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpotifyAuthScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyAuthScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpotifyAuthScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpotifyAuthScalarWhereWithAggregatesInputSchema),z.lazy(() => SpotifyAuthScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tokenType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  scope: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyAuth: z.lazy(() => SpotifyAuthCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  spotifyAuth: z.lazy(() => SpotifyAuthUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyAuth: z.lazy(() => SpotifyAuthUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  spotifyAuth: z.lazy(() => SpotifyAuthUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthCreateInputSchema: z.ZodType<Prisma.SpotifyAuthCreateInput> = z.object({
  id: z.string().cuid().optional(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpotifyAuthInputSchema)
}).strict();

export const SpotifyAuthUncheckedCreateInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyAuthUpdateInputSchema: z.ZodType<Prisma.SpotifyAuthUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpotifyAuthNestedInputSchema).optional()
}).strict();

export const SpotifyAuthUncheckedUpdateInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthCreateManyInputSchema: z.ZodType<Prisma.SpotifyAuthCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyAuthUpdateManyMutationInputSchema: z.ZodType<Prisma.SpotifyAuthUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SpotifyAuthNullableRelationFilterSchema: z.ZodType<Prisma.SpotifyAuthNullableRelationFilter> = z.object({
  is: z.lazy(() => SpotifyAuthWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SpotifyAuthWhereInputSchema).optional().nullable()
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

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SpotifyAuthCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyAuthCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenType: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyAuthAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyAuthAvgOrderByAggregateInput> = z.object({
  expiresIn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyAuthMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyAuthMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenType: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyAuthMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyAuthMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenType: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpotifyAuthSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpotifyAuthSumOrderByAggregateInput> = z.object({
  expiresIn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const SpotifyAuthCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyAuthCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyAuthWhereUniqueInputSchema).optional()
}).strict();

export const SpotifyAuthUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyAuthCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SpotifyAuthWhereUniqueInputSchema).optional()
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

export const SpotifyAuthUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyAuthUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyAuthCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyAuthUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyAuthWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyAuthUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyAuthUpdateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpotifyAuthCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SpotifyAuthUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SpotifyAuthWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SpotifyAuthWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpotifyAuthUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SpotifyAuthUpdateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpotifyAuthInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyAuthInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyAuthInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSpotifyAuthNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpotifyAuthNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyAuthInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpotifyAuthInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpotifyAuthInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpotifyAuthInputSchema),z.lazy(() => UserUpdateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyAuthInputSchema) ]).optional(),
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

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const SpotifyAuthCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyAuthUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
  scope: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpotifyAuthCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyAuthWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyAuthUpsertWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SpotifyAuthUpdateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SpotifyAuthCreateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SpotifyAuthWhereInputSchema).optional()
}).strict();

export const SpotifyAuthUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SpotifyAuthWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpotifyAuthUpdateWithoutUserInputSchema),z.lazy(() => SpotifyAuthUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SpotifyAuthUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpotifyAuthUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpotifyAuthUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserCreateWithoutSpotifyAuthInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpotifyAuthInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpotifyAuthInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyAuthInputSchema) ]),
}).strict();

export const UserUpsertWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpotifyAuthInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyAuthInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpotifyAuthInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpotifyAuthInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpotifyAuthInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpotifyAuthInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpotifyAuthInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSpotifyAuthInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpotifyAuthInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SpotifyAuthFindFirstArgsSchema: z.ZodType<Prisma.SpotifyAuthFindFirstArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyAuthOrderByWithRelationInputSchema.array(),SpotifyAuthOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyAuthWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyAuthScalarFieldEnumSchema,SpotifyAuthScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyAuthFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpotifyAuthFindFirstOrThrowArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyAuthOrderByWithRelationInputSchema.array(),SpotifyAuthOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyAuthWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyAuthScalarFieldEnumSchema,SpotifyAuthScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyAuthFindManyArgsSchema: z.ZodType<Prisma.SpotifyAuthFindManyArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyAuthOrderByWithRelationInputSchema.array(),SpotifyAuthOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyAuthWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpotifyAuthScalarFieldEnumSchema,SpotifyAuthScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpotifyAuthAggregateArgsSchema: z.ZodType<Prisma.SpotifyAuthAggregateArgs> = z.object({
  where: SpotifyAuthWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyAuthOrderByWithRelationInputSchema.array(),SpotifyAuthOrderByWithRelationInputSchema ]).optional(),
  cursor: SpotifyAuthWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyAuthGroupByArgsSchema: z.ZodType<Prisma.SpotifyAuthGroupByArgs> = z.object({
  where: SpotifyAuthWhereInputSchema.optional(),
  orderBy: z.union([ SpotifyAuthOrderByWithAggregationInputSchema.array(),SpotifyAuthOrderByWithAggregationInputSchema ]).optional(),
  by: SpotifyAuthScalarFieldEnumSchema.array(),
  having: SpotifyAuthScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpotifyAuthFindUniqueArgsSchema: z.ZodType<Prisma.SpotifyAuthFindUniqueArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereUniqueInputSchema,
}).strict() ;

export const SpotifyAuthFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpotifyAuthFindUniqueOrThrowArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereUniqueInputSchema,
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

export const SpotifyAuthCreateArgsSchema: z.ZodType<Prisma.SpotifyAuthCreateArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  data: z.union([ SpotifyAuthCreateInputSchema,SpotifyAuthUncheckedCreateInputSchema ]),
}).strict() ;

export const SpotifyAuthUpsertArgsSchema: z.ZodType<Prisma.SpotifyAuthUpsertArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereUniqueInputSchema,
  create: z.union([ SpotifyAuthCreateInputSchema,SpotifyAuthUncheckedCreateInputSchema ]),
  update: z.union([ SpotifyAuthUpdateInputSchema,SpotifyAuthUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpotifyAuthCreateManyArgsSchema: z.ZodType<Prisma.SpotifyAuthCreateManyArgs> = z.object({
  data: z.union([ SpotifyAuthCreateManyInputSchema,SpotifyAuthCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyAuthCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SpotifyAuthCreateManyAndReturnArgs> = z.object({
  data: z.union([ SpotifyAuthCreateManyInputSchema,SpotifyAuthCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpotifyAuthDeleteArgsSchema: z.ZodType<Prisma.SpotifyAuthDeleteArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  where: SpotifyAuthWhereUniqueInputSchema,
}).strict() ;

export const SpotifyAuthUpdateArgsSchema: z.ZodType<Prisma.SpotifyAuthUpdateArgs> = z.object({
  select: SpotifyAuthSelectSchema.optional(),
  include: SpotifyAuthIncludeSchema.optional(),
  data: z.union([ SpotifyAuthUpdateInputSchema,SpotifyAuthUncheckedUpdateInputSchema ]),
  where: SpotifyAuthWhereUniqueInputSchema,
}).strict() ;

export const SpotifyAuthUpdateManyArgsSchema: z.ZodType<Prisma.SpotifyAuthUpdateManyArgs> = z.object({
  data: z.union([ SpotifyAuthUpdateManyMutationInputSchema,SpotifyAuthUncheckedUpdateManyInputSchema ]),
  where: SpotifyAuthWhereInputSchema.optional(),
}).strict() ;

export const SpotifyAuthDeleteManyArgsSchema: z.ZodType<Prisma.SpotifyAuthDeleteManyArgs> = z.object({
  where: SpotifyAuthWhereInputSchema.optional(),
}).strict() ;