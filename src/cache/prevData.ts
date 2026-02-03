import type { _RedisLogType } from '../@types/logger';

type PrevLogsType = {
  key: string;
  data: _RedisLogType;
};

let prevLogs: PrevLogsType[] = [];

const setPrevLogs = (logs: PrevLogsType[]) => {
  prevLogs = logs;
};

const getPrevLogs = () => prevLogs;

export { getPrevLogs, setPrevLogs };
