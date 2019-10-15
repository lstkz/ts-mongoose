import { SchemaTypeOpts, Types } from 'mongoose';
import {
  SubDocument,
  SubDocumentArray,
  SubDocumentArrayNoId,
  SubDocumentNoId,
  Required,
  Select,
} from './_shared';
import {
  OptionIdDisabled,
  Optional,
  Convert,
  OptionalField,
  Definition,
} from './schema';
import { Extract } from './extract';

type Primitives = number | string | boolean | Date | Types.ObjectId;

type ExtractOptions<T> = T extends { options: infer U } ? U : never;

type RequiredOpt = Record<Required, true>;
type NoSelectOpt = Record<Select, false>;
type SharedTypeOptions = Partial<
  Record<Required, boolean> & Record<Select, boolean>
>;
type SharedTypeOptionsWithEnum = SharedTypeOptions & {
  enum?: ReadonlyArray<string>;
};

export type TypeOptions<T> = (T extends string
  ? Omit<SchemaTypeOpts<T>, keyof SharedTypeOptionsWithEnum> &
      SharedTypeOptionsWithEnum
  : Omit<SchemaTypeOpts<T>, keyof SharedTypeOptions>) &
  SharedTypeOptions;

// type: string
export type EnumOrString<
  T extends { enum?: ReadonlyArray<string> } | undefined
> = T extends { enum?: infer U }
  ? U extends ReadonlyArray<string>
    ? U[number]
    : string
  : string;

// type: array
type IsSchemaType<T, IS, NOT> = 0 extends (1 & T)
  ? NOT
  : T extends Definition
  ? IS
  : NOT;
export type ArrayOfElements<T> = IsSchemaType<
  T,
  ExtractOptions<T> extends OptionIdDisabled
    ? SubDocumentArrayNoId<Extract<T> & SubDocumentNoId>
    : SubDocumentArray<Extract<T> & SubDocument>,
  Array<T>
>;

export type ArrElement<T> = T extends Record<OptionalField, infer R>
  ? R extends (Primitives | Array<any>)
    ? R
    : { [P in keyof Convert<R>]: Convert<R>[P] }
  : T extends (Primitives | Array<any>)
  ? T
  : { [P in keyof Convert<T>]: Convert<T>[P] };

// type: schema
export type GetSubDocument<T> = ExtractOptions<T> extends OptionIdDisabled
  ? SubDocumentNoId
  : SubDocument;

// get type
export type GetType<Opts, T> =
  // Opts extends NoSelectOpt
  // ? Optional<T> :
  Opts extends RequiredOpt ? T : Optional<T>;
