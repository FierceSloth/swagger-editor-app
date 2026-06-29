import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('invalidEmail'),
  password: z
    .string()
    .min(8, 'passwordMinLength')
    .regex(/[a-zA-Z]/, 'passwordNeedLetter')
    .regex(/\d/, 'passwordNeedNumber')
    .regex(/[@$!%*#?&]/, 'passwordNeedSpecial')
    .regex(/^[A-Za-z\d@$!%*#?&]+$/, 'passwordInvalidCharacters'),
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
