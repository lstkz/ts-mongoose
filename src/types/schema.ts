import { Types } from 'mongoose';
import {
  CreatedAt,
  Id,
  Timestamps,
  UpdatedAt,
  VerKey,
  VerOption,
} from './_shared';

type IsNever<T, IS, NOT> = 0 extends (1 & T) ? NOT : T extends never ? IS : NOT;

// convert optional/required fields
export type OptionalField = 'notRequired';
export type Optional<T> = Record<OptionalField, T>;

type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends Record<OptionalField, any>
    ? Record<OptionalField, any> extends T[K]
      ? K
      : never
    : never;
}[keyof T];
type RequiredKeys<T> = {
  [K in keyof T]: IsNever<
    T[K],
    never,
    T[K] extends Record<OptionalField, any>
      ? Record<OptionalField, any> extends T[K]
        ? never
        : K
      : K
  >;
}[keyof T];

export type Convert<T> = { [P in RequiredKeys<T>]: T[P] } &
  {
    [P in OptionalKeys<T>]?: T[P] extends Record<OptionalField, infer O>
      ? Record<OptionalField, any> extends T[P]
        ? (O | undefined)
        : never
      : never;
  };

// id option
export type OptionIdDisabled = Record<Id, false>;
export type OptionIdAsDefault = Record<Id, Types.ObjectId>;

// version option
type OptionVerDisabled = Record<VerOption, false>;
type OptionVerString = Record<VerOption, Readonly<string>>;

type OptionVerAsDefault = Record<VerKey, number>;
/**
 * Add numbers!
 */
type OptionVerAsCustom<Opts extends OptionVerString> = Record<
  Opts[VerOption],
  number
>;

// timestamp option
type TimestampsEnabled = Record<Timestamps, true>;
type TimestampsEnabledEach = TimestampEnabled<CreatedAt> &
  TimestampEnabled<UpdatedAt>;

type TimestampEnabled<U extends string> = Record<Timestamps, Record<U, true>>;
type TimestampString<U extends string> = Record<
  Timestamps,
  Record<U, Readonly<string>>
>;

type TimestampAsDefault<U extends string> = Record<U, Date>;
type TimestampAsCustom<
  U extends string,
  Opts extends TimestampString<U>
> = Record<Opts[Timestamps][U], Date>;

// get schema by each option
type GetSchemaId<Opts> = Opts extends OptionIdDisabled ? {} : OptionIdAsDefault;
type GetSchemaVer<Opts> = Opts extends OptionVerDisabled
  ? {}
  : Opts extends OptionVerString
  ? OptionVerAsCustom<Opts>
  : OptionVerAsDefault;

type GetSchemaTimestamp<U extends string, Opts> = Opts extends (
  | TimestampsEnabled
  | TimestampsEnabledEach
  | TimestampEnabled<U>)
  ? TimestampAsDefault<U>
  : Opts extends TimestampString<U>
  ? TimestampAsCustom<U, Opts>
  : {};

// definition
export type DefinitionField = 'definition';
export type Definition = Record<DefinitionField, any>;

// combine options into T
export type GetSchemaType<Opts, T> = GetSchemaId<Opts> &
  Convert<T> &
  GetSchemaTimestamp<CreatedAt, Opts> &
  GetSchemaTimestamp<UpdatedAt, Opts> &
  GetSchemaVer<Opts>;
