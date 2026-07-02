import type { RulesetDefinition } from '@stoplight/spectral-core';
import { Document, Spectral } from '@stoplight/spectral-core';
import Parsers from '@stoplight/spectral-parsers';
import { oas } from '@stoplight/spectral-rulesets';

const spectral = new Spectral();

const myRuleset: RulesetDefinition = {
  extends: [oas as unknown as RulesetDefinition],
  rules: {},
};

spectral.setRuleset(myRuleset);

export async function validateSchema(text: string) {
  if (!text.trim()) return [];

  const document = new Document(text, Parsers.Yaml, 'openapi.yaml');

  const results = await spectral.run(document);

  return results;
}
