import type { IOpenApiParameter } from '../../types/openapi-types';
import { getFormStringValue } from './get-form-string-value';
import { getParameterFieldName } from './get-parameter-field-name';

interface IBuildHeadersParams {
  parameters: IOpenApiParameter[];
  formData: FormData;
  contentType?: string;
}

export function buildHeaders({ parameters, formData, contentType }: IBuildHeadersParams): Headers {
  const headers = new Headers();

  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  parameters
    .filter((param) => param.in === 'header')
    .forEach((param) => {
      const value = getFormStringValue(formData, getParameterFieldName(param));

      if (value) {
        headers.set(param.name, value);
      }
    });

  return headers;
}
