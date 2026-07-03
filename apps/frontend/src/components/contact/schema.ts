import * as z from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  postcode: z.string().optional(),
  newsletter: z.boolean().optional(),
  join: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
