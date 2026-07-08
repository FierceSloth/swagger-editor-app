import type { HttpMethod } from '../types/http-types';
import type { IEndpointGroup, IEndpointItem, IOpenApiParameter, IOpenApiPathItem } from '../types/openapi-types';

function mergeParameters(
  pathParams?: IOpenApiParameter[],
  operationParams?: IOpenApiParameter[]
): IOpenApiParameter[] | undefined {
  if (!pathParams?.length && !operationParams?.length) return undefined;
  if (!pathParams?.length) return operationParams;
  if (!operationParams?.length) return pathParams;

  const merged = new Map<string, IOpenApiParameter>();

  for (const param of pathParams) {
    merged.set(`${param.in}:${param.name}`, param);
  }

  for (const param of operationParams) {
    merged.set(`${param.in}:${param.name}`, param);
  }

  return Array.from(merged.values());
}

export function groupEndpoints(paths: Record<string, IOpenApiPathItem>): IEndpointGroup[] {
  if (!paths) return [];
  const groupMap: Record<string, IEndpointItem[]> = {};

  for (const [path, methodsObj] of Object.entries(paths)) {
    const httpMethods: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
    const pathParams = methodsObj.parameters;

    for (const method of httpMethods) {
      const details = methodsObj[method];
      if (!details) continue;

      const tag = details.tags?.[0] || path.split('/').filter(Boolean)[0] || 'default';

      if (!groupMap[tag]) {
        groupMap[tag] = [];
      }

      const mergedParams = mergeParameters(pathParams, details.parameters);

      groupMap[tag].push({
        id: `${method}-${path}`,
        method,
        path,
        summary: details.summary || '',
        details: mergedParams ? { ...details, parameters: mergedParams } : details,
      });
    }
  }

  return Object.entries(groupMap).map(([tag, endpoints]) => ({
    tag,
    endpoints,
  }));
}
