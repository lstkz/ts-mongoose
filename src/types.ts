import { Types, Document } from 'mongoose';

export type Extract<T> = T extends { definition: infer U } ? U : never;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type EnumOrString<
  T extends ReadonlyArray<string> | undefined
> = T extends ReadonlyArray<string> ? T[number] : undefined;

type ExtractOptions<T> = T extends { options: infer U } ? U : never;
type DisabledIdOption = { _id: false };
type IsSchemaType<T, IS, NOT> = 0 extends (1 & T)
  ? NOT
  : T extends { definition: any }
  ? IS
  : NOT;
type SubdocumentsArrayWithoutId<T extends Types.Subdocument> = {
  [P in keyof Types.DocumentArray<T>]: Omit<T, '_id'>
};

export type ExtractSchema<T> = Extract<T> &
  (ExtractOptions<T> extends DisabledIdOption
    ? Omit<Types.Subdocument, '_id'>
    : Types.Subdocument);
export type ArrayOfElements<T> = IsSchemaType<
  T,
  ExtractOptions<T> extends DisabledIdOption
    ? SubdocumentsArrayWithoutId<Extract<T> & Types.Subdocument>
    : Types.DocumentArray<Extract<T> & Types.Subdocument>,
  Array<T>
>;

type ExcludeBaseType<T> = Exclude<T, string | number | Types.ObjectId>;

export type ExcludeFromArray<T> = T extends Array<infer U>
  ? Array<ExcludeBaseType<U>>
  : ExcludeBaseType<T>;

export type PopulateItem<T, P extends keyof T> = Omit<T, P> &
  { [x in P]: ExcludeFromArray<T[x]> };

export type GetArrayItem<T> = T extends Array<infer U> ? U : never;

export type PopulateArray<T, P extends keyof GetArrayItem<T>> = Array<
  PopulateItem<GetArrayItem<T>, P>
>;

export type MaybeItem<T> = T extends Array<infer U> ? U : T;

export type Populate<T, P> = T extends Array<infer U>
  ? P extends keyof U
    ? Array<PopulateItem<U, P>>
    : T
  : P extends keyof T
  ? PopulateItem<T, P>
  : T;

export type ExtractProps<T> = T extends { definition: infer D } ? D : never;
export type ExtractDoc<T> = T extends { definition: infer D }
  ? D & Document
  : never;

export type OptionalPropNames<T> = {
  [P in keyof T]: null extends T[P] ? P : never
}[keyof T];

export type RequiredPropNames<T> = {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T];

export type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
export type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };

export type MakeOptional<T> = { [P in keyof T]?: T[P] };

export type ConvertObject<T> = { [P in RequiredPropNames<T>]: T[P] } &
  { [P in OptionalPropNames<T>]?: T[P] };

// timestamp types
type CreatedAtType = { createdAt: Date };
type UpdatedAtType = { updatedAt: Date };
type TimestampsPresent = {
  timestamps: true;
};
type TimestampsEachPresent = {
  timestamps: {
    createdAt: true;
    updatedAt: true;
  };
};
type TimestampCreatedByPresent = {
  timestamps: {
    createdAt: true;
  };
};
type TimestampUpdatedByPresent = {
  timestamps: {
    updatedAt: true;
  };
};

export type TypeWithTimestamps<Opts, T> = Opts extends (
  | TimestampsPresent
  | TimestampsEachPresent)
  ? T & CreatedAtType & UpdatedAtType
  : Opts extends TimestampCreatedByPresent
  ? T & CreatedAtType
  : Opts extends TimestampUpdatedByPresent
  ? T & UpdatedAtType
  : T;
