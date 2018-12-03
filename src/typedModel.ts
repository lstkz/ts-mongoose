import { Schema, Document, Model, model } from 'mongoose';
import { Extract } from './types';

export function typedModel<T extends Schema>(
  name: string,
  schema?: T,
  collection?: string,
  skipInit?: boolean
): Model<Document & Extract<T>> {
  return model(name, schema, collection, skipInit) as any;
}
