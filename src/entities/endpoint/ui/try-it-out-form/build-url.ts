import type { IOpenApiParameter } from '../../types/openapi-types';
import { getFormStringValue } from './get-form-string-value';
import { getParameterFieldName } from './get-parameter-field-name';

interface IBuildUrlParams {
  serverUrl: string;
  path: string;
  parameters: IOpenApiParameter[];
  formData: FormData;
}

export function buildUrl({ serverUrl, path, parameters, formData }: IBuildUrlParams): string {
  if (!serverUrl) {
    throw new Error('Server URL is missing');
  }

  let requestPath = path;

  parameters
    .filter((param) => param.in === 'path')
    .forEach((param) => {
      const value = getFormStringValue(formData, getParameterFieldName(param));

      requestPath = requestPath.replace(`{${param.name}}`, encodeURIComponent(value));
    });

  const normalizedServerUrl = serverUrl.replace(/\/$/, '');
  const normalizedPath = requestPath.startsWith('/') ? requestPath : `/${requestPath}`;

  const url = new URL(`${normalizedServerUrl}${normalizedPath}`);

  parameters
    .filter((param) => param.in === 'query')
    .forEach((param) => {
      const value = getFormStringValue(formData, getParameterFieldName(param));

      if (value) {
        url.searchParams.set(param.name, value);
      }
    });

  return url.toString();
}
