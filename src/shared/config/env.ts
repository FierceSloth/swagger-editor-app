function getPublicEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  supabaseUrl: getPublicEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL'),
  supabasePublishableKey: getPublicEnv(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  ),
};
