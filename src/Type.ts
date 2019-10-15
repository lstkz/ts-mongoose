import { Schema, Types } from 'mongoose';
import {
  ArrayOfElements,
  Convert,
  EnumOrString,
  Extract,
  GetType,
  TypeOptions,
  GetSubDocument,
  OptionalField,
  Optional,
  ArrElement,
  Definition,
  DefinitionField,
} from './types';

const createType = <T>(type: any) => <O extends TypeOptions<T>>(options?: O) =>
  (({ ...(options ? options : {}), type } as unknown) as GetType<
    O,
    T extends string ? EnumOrString<O> : T
  >);

export const Type = {
  number: createType<number>(Number),
  boolean: createType<boolean>(Boolean),
  date: createType<Date>(Date),
  mixed: createType<any>(Schema.Types.Mixed),
  objectId: createType<Types.ObjectId>(Schema.Types.ObjectId),
  string: createType<string>(String),
  decimal128: createType<Types.Decimal128>(Schema.Types.Decimal128),
  object: <O extends TypeOptions<object>>(options?: O) => ({
    of<T extends object>(schema: T) {
      return ({
        ...(options ? options : {}),
        type: schema,
      } as unknown) as GetType<O, { [P in keyof Convert<T>]: Convert<T>[P] }>;
    },
  }),
  array: <O extends TypeOptions<Array<any>>>(options?: O) => ({
    of<T>(schema: T) {
      return ({
        ...(options ? options : {}),
        type: [schema],
      } as unknown) as GetType<O, ArrayOfElements<ArrElement<T>>>;
    },
  }),
  schema: <O extends TypeOptions<object>>(options?: O) => ({
    of<T extends Definition>(schema: T) {
      return ({
        ...(options ? options : {}),
        type: schema,
      } as unknown) as GetType<O, Extract<T> & GetSubDocument<T>>;
    },
  }),
  ref: <T>(schema: T) => ({
    to<TSchema extends Definition>(name: string, refSchema: TSchema) {
      return ({
        ...(schema as any),
        ref: name,
      } as unknown) as
        | T
        | (T extends Record<OptionalField, any>
            ? Optional<TSchema[DefinitionField]>
            : TSchema[DefinitionField]);
    },
  }),
};
