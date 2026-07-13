import type { IOpenApiSchema } from '../types/openapi-types';

export function generateExample(schema?: IOpenApiSchema): unknown {
  if (!schema) {
    return null;
  }

  if (schema.example !== undefined) {
    return schema.example;
  }

  if (schema.default !== undefined) {
    return schema.default;
  }

  if (schema.enum?.length) {
    return schema.enum[0];
  }

  if (schema.$ref) {
    return '[Reference]';
  }

  if (schema.type === 'object' || schema.properties) {
    const result: Record<string, unknown> = {};

    Object.entries(schema.properties ?? {}).forEach(([propertyName, propertySchema]) => {
      result[propertyName] = generateExample(propertySchema);
    });

    return result;
  }

  if (schema.type === 'array') {
    if (!schema.items) {
      return [];
    }

    return [generateExample(schema.items)];
  }

  switch (schema.type) {
    case 'string':
      return 'string';

    case 'integer':
    case 'number':
      return 0;

    case 'boolean':
      return true;

    default:
      return null;
  }
}
