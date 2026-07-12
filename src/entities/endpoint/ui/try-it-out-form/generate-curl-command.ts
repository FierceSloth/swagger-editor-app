interface IGenerateCurlCommandParams {
  method: string;
  url: string;
  headers: Headers;
  body?: string;
}

function quoteShellValue(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

export function generateCurlCommand({ method, url, headers, body }: IGenerateCurlCommandParams): string {
  const parts = ['curl', '-X', method, quoteShellValue(url)];

  headers.forEach((value, key) => {
    parts.push('-H', quoteShellValue(`${key}: ${value}`));
  });

  if (body) {
    parts.push('--data-raw', quoteShellValue(body));
  }

  return parts.join(' ');
}
