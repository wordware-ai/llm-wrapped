import { z } from "zod";

// Define nested schemas
const CompanySchema = z
  .object({
    name: z.string().optional(),
    title: z.string().optional(),
  })
  .optional();

const ExperienceSchema = z
  .object({
    title: z.string().optional(),
    location: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    duration_short: z.string().optional(),
    company: z.string().optional(),
  })
  .optional();

const EducationSchema = z
  .object({
    title: z.string().optional(),
    degree: z.string().optional(),
    field: z.string().optional(),
    start_year: z.string().optional(),
    end_year: z.string().optional(),
    description: z.string().nullable().optional(),
  })
  .optional();

const ActivitySchema = z
  .object({
    interaction: z.string().optional(),
    title: z.string().optional(),
  })
  .optional();

export const LinkedInProfileSchema = z.object({
  name: z.string().optional(),
  city: z.string().optional(),
  position: z.string().optional(),
  about: z.string().optional(),
  current_company: CompanySchema,
  experience: z.array(ExperienceSchema).optional(),

  educations_details: z.string().optional(),
  education: z.array(EducationSchema).optional(),
  followers: z.number().optional(),
  connections: z.number().optional(),
  current_company_name: z.string().optional(),
  location: z.string().optional(),
  avatar: z.string().optional(),

  activity: z.array(ActivitySchema).optional(),

  honors_and_awards: z.unknown().optional(),
});

export type LinkedInProfile = z.infer<typeof LinkedInProfileSchema>;
