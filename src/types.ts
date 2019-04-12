import { Types, Document } from 'mongoose';

export type Extract<T> = T extends { definition: infer U } ? U : never;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
