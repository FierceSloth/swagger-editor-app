import type { HttpMethod } from '../types/http-types';
import type { IEndpointGroup, IEndpointItem, IOpenApiPathItem } from '../types/openapi-types';

export function groupEndpoints(paths: Record<string, IOpenApiPathItem>): IEndpointGroup[] {
  if (!paths) return [];
  const groupMap: Record<string, IEndpointItem[]> = {};

  for (const [path, methodsObj] of Object.entries(paths)) {
    const httpMethods: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

    for (const method of httpMethods) {
      const details = methodsObj[method];
      if (!details) continue;

      const tag = details.tags?.[0] || path.split('/').filter(Boolean)[0] || 'default';

      if (!groupMap[tag]) {
        groupMap[tag] = [];
      }

      groupMap[tag].push({
        id: `${method}-${path}`,
        method,
        path,
        summary: details.summary || '',
        details,
      });
    }
  }

  return Object.entries(groupMap).map(([tag, endpoints]) => ({
    tag,
    endpoints,
  }));
}
