import { freemem, totalmem, uptime } from 'node:os';
import { cpuUsage, memoryUsage } from 'node:process';

const getHealthData = () => ({
  pid: process.pid,
  timestamp: new Date().toISOString(),
  uptime: uptime(),
  memoryUsage,
  cpuUsage: cpuUsage(),
  totalMemory: totalmem(),
  freeMemory: freemem(),
});
export { getHealthData };
