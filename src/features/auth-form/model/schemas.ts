import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('invalidEmail'),
  password: z
    .string()
    .min(8, 'passwordMinLength')
    .regex(/\p{L}/u, 'passwordNeedLetter')
    .regex(/\d/, 'passwordNeedNumber')
    .regex(/[^\p{L}\d]/u, 'passwordNeedSpecial'),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passcodeMismatch',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
