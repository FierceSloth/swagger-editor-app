'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/shared/api/supabase/server';

function getFormValue(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

export async function signInWithPassword(formData: FormData) {
  const email = getFormValue(formData, 'email');
  const password = getFormValue(formData, 'password');

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
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
    return { error: error.message };
  }

  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  redirect('/login');
}
