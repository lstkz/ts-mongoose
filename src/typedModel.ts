import { Schema, Document, Model, model } from 'mongoose';
import { Extract, ExtractStatics } from './types';

export function typedModel<T extends Schema>(
  name: string,
  schema?: T,
  collection?: string,
  skipInit?: boolean
): ExtractStatics<T, Model<Document & Extract<T>>, Document & Extract<T>> {
  return model(name, schema, collection, skipInit) as any;
}
