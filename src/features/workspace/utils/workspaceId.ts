export function slugifyWorkspaceName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48);
}

export function createWorkspaceId(name: string): string {
  const slug = slugifyWorkspaceName(name);
  const suffix = crypto.randomUUID().slice(0, 8);
  return slug ? `ws-${slug}-${suffix}` : `ws-${suffix}`;
}
