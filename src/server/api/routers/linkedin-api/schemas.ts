import { z } from "zod";

// Define nested schemas
const CompanySchema = z
  .object({
    name: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
  })
  .optional();

const ExperienceSchema = z
  .object({
    title: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    start_date: z.string().nullable().optional(),
    end_date: z.string().nullable().optional(),
    duration_short: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    company_logo_url: z.string().nullable().optional(),
  })
  .optional();

export type Experience = z.infer<typeof ExperienceSchema>;

const EducationSchema = z
  .object({
    title: z.string().nullable().optional(),
    degree: z.string().nullable().optional(),
    field: z.string().nullable().optional(),
    start_year: z.string().nullable().optional(),
    end_year: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  })
  .optional();

export const LinkedInProfileSchema = z.object({
  name: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  about: z.string().nullable().optional(),
  current_company: CompanySchema,
  experience: z.array(ExperienceSchema).nullable().optional(),

  educations_details: z.string().nullable().optional(),
  education: z.array(EducationSchema).nullable().optional(),
  followers: z.number().nullable().optional(),
  connections: z.number().nullable().optional(),
  current_company_name: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),

  honors_and_awards: z.unknown().nullable().optional(),
});

export type LinkedInProfile = z.infer<typeof LinkedInProfileSchema>;
