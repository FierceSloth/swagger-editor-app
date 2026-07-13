import type { IOpenApiParameter } from '../../types/openapi-types';

export function getParameterFieldName(param: IOpenApiParameter): string {
  return `${param.in}:${param.name}`;
}
