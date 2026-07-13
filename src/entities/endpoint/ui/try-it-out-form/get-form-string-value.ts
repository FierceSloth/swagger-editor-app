export function getFormStringValue(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return '';
  }

  return value;
}
