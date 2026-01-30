type _ServerType = {
  requests: number;
  activeRequests: number;
  avgResTime: number;
  id: number;
  url: string;
};

const weights = {
  active: 0.5,
  time: 0.3,
  total: 0.2,
};

const calcScore = (
  server: _ServerType,
  {
    maxActive,
    maxAvgTime,
    avgTotal,
  }: { maxActive: number; maxAvgTime: number; avgTotal: number }
): number => {
  if (maxActive === 0 || maxAvgTime === 0) {
    return 0;
  }

  const activeFactor = server.activeRequests / maxActive;
  const timeFactor = server.avgResTime / maxAvgTime;
  const totalFactor =
    Math.abs(server.requests - avgTotal) / Math.max(avgTotal, 1);

  const score =
    activeFactor * weights.active +
    timeFactor * weights.time +
    totalFactor * weights.total;

  return Math.round(score * 1000) / 1000;
};

const selectServer = (servers: _ServerType[]): null | _ServerType => {
  if (!servers || !servers.length) {
    return null;
  }

  const maxActive = Math.max(...servers.map((s) => s.activeRequests));

  const maxAvgTime = Math.max(...servers.map((s) => s.avgResTime));

  const avgTotal =
    servers.reduce((acc, s) => acc + s.requests, 0) / servers.length;

  const scores = servers
    .map((server) => ({
      server,
      score: calcScore(server, {
        maxActive,
        maxAvgTime,
        avgTotal,
      }),
    }))
    .sort((a, b) => a.score - b.score);

  return scores[0]?.server ?? null;
};

export type { _ServerType };

export { selectServer };
