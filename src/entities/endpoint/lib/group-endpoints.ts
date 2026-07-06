type Path = Record<string, unknown>;

export function groupEndpoints(paths: Record<string, Path>) {
  const groups: Partial<Record<string, Path>> = {};

  for (const [key, value] of Object.entries(paths)) {
    const segments = key.split('/').filter(Boolean);
    const tag = segments[0] || 'default';

    if (!groups[tag]) {
      groups[tag] = {};
    }

    groups[tag][key] = value;
  }

  return groups;
}
