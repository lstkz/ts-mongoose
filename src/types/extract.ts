import { Document, Types } from 'mongoose';
import {
  SubDocument,
  SubDocumentNoId,
  SubDocumentArray,
  SubDocumentArrayNoId,
} from './_shared';
import { Convert, Definition, DefinitionField } from './schema';

export type Extract<T> = T extends Record<DefinitionField, infer R>
  ? Convert<R>
  : never;
export type ExtractProps<T extends Definition> = DeepExtractObjProps<
  T[DefinitionField]
>;
export type ExtractFromReq<T> = { [P in keyof T]: DeepExtractFromReq<T[P]> };
export type ExtractDoc<T extends Definition> = T[DefinitionField] & Document;

type DeepExtractProps<T> = T extends (
  | (infer R & SubDocument)
  | (infer R & SubDocumentNoId))
  ? R
  : T extends (
      | SubDocumentArray<infer R & SubDocument>
      | SubDocumentArrayNoId<infer R & SubDocumentNoId>)
  ? Array<{ [P in keyof DeepExtractObjProps<R>]: DeepExtractObjProps<R>[P] }>
  : T extends Date
  ? Date
  : T extends Types.ObjectId
  ? Types.ObjectId
  : T extends Types.Decimal128
  ? Types.Decimal128
  : T extends {}
  ? { [P in keyof DeepExtractObjProps<T>]: DeepExtractObjProps<T>[P] }
  : T;

type DeepExtractObjProps<T> = { [P in keyof T]: DeepExtractProps<T[P]> };

type DeepExtractFromReq<T> = 0 extends (1 & T) // any
  ? any
  : T extends (Date | Types.ObjectId | Types.Decimal128) // date or objectId
  ? string
  : T extends Array<infer R>
  ? Array<
      0 extends (1 & R) // any
        ? any
        : R extends (Date | Types.ObjectId) // date or objectId
        ? string
        : { [P in keyof ExtractFromReq<R>]: ExtractFromReq<R>[P] }
    >
  : T extends {}
  ? { [P in keyof ExtractFromReq<T>]: ExtractFromReq<T>[P] }
  : T;
