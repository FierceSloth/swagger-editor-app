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
  requestBody?: IOpenApiRequestBody;
  [key: string]: unknown;
}

export type IOpenApiPathItem = {
  [K in HttpMethod]?: IOpenApiOperation;
} & {
  parameters?: IOpenApiParameter[];
  $ref?: string;
  [key: string]: unknown;
};

export interface IOpenApiSchema {
  type?: string;
  properties?: Record<string, unknown>;
  required?: string[];
  [key: string]: unknown;
}

export interface IOpenApiMediaType {
  schema?: IOpenApiSchema;
  example?: unknown;
  examples?: Record<string, unknown>;
}

export interface IOpenApiRequestBody {
  description?: string;
  required?: boolean;
  content: {
    'application/json'?: IOpenApiMediaType;
    [mediaType: string]: IOpenApiMediaType | undefined;
  };
}

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
