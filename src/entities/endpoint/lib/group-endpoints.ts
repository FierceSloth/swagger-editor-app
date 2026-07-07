import type { HttpMethod } from '../types/http-types';

export interface IOpenApiOperation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  [key: string]: unknown;
}

export type IOpenApiPathItem = {
  [K in HttpMethod]?: IOpenApiOperation;
} & {
  parameters?: unknown[];
  $ref?: string;
  [key: string]: unknown;
};

export interface IEndpointItem {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
  details: IOpenApiOperation;
}

export interface IEndpointGroup {
  tag: string;
  endpoints: IEndpointItem[];
}

export function groupEndpoints(paths: Record<string, IOpenApiPathItem>): IEndpointGroup[] {
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
