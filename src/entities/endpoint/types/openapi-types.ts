import type { HttpMethod } from './http-types';

export interface IOpenApiParameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  schema?: { type?: string; [key: string]: unknown };
  type?: string;
}

export interface IOpenApiOperation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: IOpenApiParameter[];
  [key: string]: unknown;
}

export type IOpenApiPathItem = {
  [K in HttpMethod]?: IOpenApiOperation;
} & {
  parameters?: IOpenApiParameter[];
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
