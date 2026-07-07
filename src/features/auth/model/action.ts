'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/shared/api/supabase/server';
import getFormValue from '@/shared/api/utils/form';
import { ROUTES } from '@/shared/config/routes';

export type AuthError = 'invalidCredentials' | 'userAlreadyExists' | 'tooManyRequests' | 'unknownError';

export interface AuthActionResult {
  error: AuthError;
}

function mapAuthError(code: string | undefined, message: string): AuthError {
  switch (code) {
    case 'invalid_credentials':
      return 'invalidCredentials';
    case 'user_already_exists':
      return 'userAlreadyExists';
    case 'over_request_rate_limit':
      return 'tooManyRequests';
    default:
      if (message.toLowerCase().includes('already registered')) {
        return 'userAlreadyExists';
      }
      return 'unknownError';
  }
}

export async function signInWithPassword(formData: FormData): Promise<AuthActionResult | void> {
  const email = getFormValue(formData, 'email');
  const password = getFormValue(formData, 'password');

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapAuthError(error.code, error.message) };
  }

  redirect(ROUTES.HOME);
}

export async function signUp(formData: FormData) {
  const email = getFormValue(formData, 'email');
  const password = getFormValue(formData, 'password');

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: mapAuthError(error.code, error.message) };
  }

  redirect(ROUTES.HOME);
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect(ROUTES.LOGIN);
}
