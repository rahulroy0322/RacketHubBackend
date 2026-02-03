import { model, Schema } from 'mongoose';
import type { ContextType } from '../@types/context';
import type { _RedisLogType } from '../@types/logger';

const RedisErrorSchema = new Schema<_RedisLogType['err']>(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    stack: { type: String },
    name: { type: String, required: true },
    custom: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const TracesSchema = new Schema<ContextType['traces'][number]>(
  {
    type: { type: String, required: true, enum: ['cache'] },
    msg: { type: String, required: true },
  },
  { _id: false }
);

const RedisLogSchema = new Schema<_RedisLogType>(
  {
    level: {
      type: String,
      required: true,
      index: true,
    },
    time: { type: String, required: true, index: true },
    processId: { type: Number, required: true },
    appName: { type: String, required: true },
    msg: { type: String, required: true },

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
