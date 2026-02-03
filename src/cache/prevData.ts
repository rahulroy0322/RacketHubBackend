import type { RedisLogType } from '../@types/logger';

type PrevLogsType = {
  key: string;
  data: RedisLogType;
};

let prevLogs: PrevLogsType[] = [];

const setPrevLogs = (logs: PrevLogsType[]) => {
  prevLogs = logs;
};

const getPrevLogs = () => prevLogs;

export { getPrevLogs, setPrevLogs };
