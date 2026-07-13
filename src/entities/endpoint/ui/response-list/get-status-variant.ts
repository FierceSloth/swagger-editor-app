export function getStatusVariant(statusCode: string): 'success' | 'error' | 'default' {
  if (statusCode.startsWith('2')) {
    return 'success';
  }

  if (statusCode.startsWith('4') || statusCode.startsWith('5')) {
    return 'error';
  }

  return 'default';
}
