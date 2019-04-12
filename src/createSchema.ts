import { SchemaOptions, Schema } from 'mongoose';
import { ConvertObject } from './types';

type CreateSchema = <T extends { [x: string]: any }>(
  definition?: T,
  options?: SchemaOptions
) => Schema & { definition: ConvertObject<T> };

export const createSchema: CreateSchema = (definition?, options?) => {
  return new Schema(definition, options) as any;
};
