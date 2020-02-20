import { Schema, Document, Model, model, Connection } from 'mongoose';
import { Extract } from './types';

export function typedModel<
  T extends Schema,
  S extends { [name: string]: Function }
>(
  name: string,
  schema?: T,
  collection?: string,
  skipInit?: boolean,
  statics?: S & ThisType<Model<Document & Extract<T>>>,
  connection?: Connection
): Model<Document & Extract<T>> & S {
  if (schema && statics) schema.statics = statics;
  if (connection) return connection.model(name, schema, collection) as any;
  return model(name, schema, collection, skipInit) as any;
}
