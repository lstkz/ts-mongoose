import { SchemaOptions, Schema } from 'mongoose';
import { GetSchemaType } from './types';

type CreateSchema = <T extends { [x: string]: any }, O extends SchemaOptions>(
  definition?: T,
  options?: O // TODO: to be fixed
) => Schema & {
  definition: { [P in keyof GetSchemaType<O, T>]: GetSchemaType<O, T>[P] };
  options: O;
};

export const createSchema: CreateSchema = (definition?, options?) => {
  return new Schema(definition, options) as any;
};
