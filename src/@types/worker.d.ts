type ServerType = 'ADMIN' | 'SERVER';

type ServerWithUrlType = {
  url: string;
  port: number;
  type: ServerType;
};

export type { ServerType, ServerWithUrlType };
