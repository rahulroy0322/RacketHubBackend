//? Romeving required for runtime validation
import { model, Schema } from 'mongoose';
import type { ContextType } from '../@types/context';
import type { _RedisLogType } from '../@types/logger';

const RedisErrorSchema = new Schema<_RedisLogType['err']>(
  {
    type: { type: String },
    message: { type: String },
    stack: { type: String },
    name: { type: String },
    custom: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const TracesSchema = new Schema<ContextType['traces'][number]>(
  {
    type: { type: String, enum: ['cache'] },
    msg: { type: String },
  },
  { _id: false }
);

const RedisLogSchema = new Schema<_RedisLogType>(
  {
    level: {
      type: String,
      index: true,
    },
    time: { type: String, index: true },
    processId: { type: Number },
    appName: { type: String },
    msg: { type: String },

    path: { type: String },
    err: { type: RedisErrorSchema },

    reqId: { type: String },
    method: {
      type: String,
    },
    url: { type: String },
    headers: { type: Schema.Types.Mixed },
    ua: { type: String },
    host: { type: String },
    remoteAddress: { type: String },
    query: { type: Schema.Types.Mixed },
    params: { type: Schema.Types.Mixed },
    statusCode: { type: Number, index: true },
    resHeaders: { type: Schema.Types.Mixed },
    responseTime: { type: Number },
    traces: [TracesSchema],
    start: { type: Number },
    end: { type: Number },
    duration: { type: Number, index: true },
  },
  {
    timestamps: false,
  }
);

const Logger = model<_RedisLogType>('log', RedisLogSchema);

export { Logger };
