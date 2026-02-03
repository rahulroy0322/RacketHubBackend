// TODO!
type TracesType = {
  type: 'cache' | (string & {});
  msg: 'cache hit in auth' | 'cache mis in auth' | (string & {});
};

type ContextType = {
  readonly reqId: string;
  readonly method:
    | 'GET'
    | 'POST'
    | 'PATCH'
    | 'PUT'
    | 'DELETE'
    | 'OPTION'
    | 'HEAD';
  readonly url: string;
  readonly headers: Record<string, unknown>;
  readonly ua: string;
  readonly host: string;
  readonly remoteAddress: string;

  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  statusCode?: number;
  resHeaders?: Record<string, unknown>;
  responseTime?: number;
  readonly traces: TracesType[];
  readonly start: number;
  end: number;
  duration: number;
};

export type { ContextType };
