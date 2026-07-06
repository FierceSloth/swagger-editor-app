import type { RulesetDefinition } from '@stoplight/spectral-core';
import { Document, Spectral } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { oas } from '@stoplight/spectral-rulesets';

const spectral = new Spectral();

const myRuleset: RulesetDefinition = {
  extends: [oas as unknown as RulesetDefinition],
  rules: {
    'info-contact': 'off',
    'info-description': 'off',
    'info-license': 'off',
    'license-url': 'off',
    'openapi-tags': 'off',
    'operation-description': 'off',
    'operation-tags': 'off',
    'operation-tag-defined': 'off',
    'operation-operationId': 'off',
    'operation-operationId-valid-in-url': 'off',
    'tag-description': 'off',
    'oas3-api-servers': 'off',
  },
};

spectral.setRuleset(myRuleset);

export async function validateSchema(text: string) {
  if (!text.trim()) return [];

  const document = new Document(text, Yaml, 'openapi.yaml');

  const results = await spectral.run(document);

  return results;
}
