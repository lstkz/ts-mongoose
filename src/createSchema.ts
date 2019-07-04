import { SchemaOptions, Schema } from 'mongoose';
import { ConvertObject, TypeWithTimestamps } from './types';

type SchemaOpts = SchemaOptions & { statics?: { [x: string]: any } };

type CreateSchema = <T extends { [x: string]: any }, O extends SchemaOpts>(
  definition?: T,
  options?: O
) => Schema & {
  definition: ConvertObject<TypeWithTimestamps<O, T>>;
  options: O;
};

export const createSchema: CreateSchema = (definition?, options?) => {
  if (!options) return new Schema(definition, options) as any;

  const { statics, ...opts } = options;
  const schema = new Schema(definition, opts) as any;
  if (statics) schema.statics = statics;
  return schema;
};
