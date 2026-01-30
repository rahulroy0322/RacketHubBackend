const CACHE_KEYS = {
  user: (id: string) => `user:${id}` as const,
} as const;

export { CACHE_KEYS };
