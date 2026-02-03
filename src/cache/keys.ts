const CACHE_KEYS = {
  user: (id: string) => `user:${id}` as const,
  log: (key: string) => `logs:${key}` as const,
} as const;

export { CACHE_KEYS };
