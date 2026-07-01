export default function getFormValue(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}
