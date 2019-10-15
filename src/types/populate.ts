import { Types } from 'mongoose';

type ExcludeBaseType<T> = Exclude<T, string | number | Types.ObjectId>;

type ExcludeFromArray<T> = T extends Array<infer U>
  ? Array<ExcludeBaseType<U>>
  : ExcludeBaseType<T>;

type PopulateItem<T, P extends keyof T> = Omit<T, P> &
  { [x in P]: ExcludeFromArray<T[x]> };

export type MaybeItem<T> = T extends Array<infer U> ? U : T;

export type Populate<T, P> = T extends Array<infer U>
  ? P extends keyof U
    ? Array<PopulateItem<U, P>>
    : T
  : P extends keyof T
  ? PopulateItem<T, P>
  : T;
