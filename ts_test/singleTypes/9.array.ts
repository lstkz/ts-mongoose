import { createSchema, Type, typedModel } from '../../src';
import { Types } from 'mongoose';
import { NotAny } from './5.mixed';
import {
  SubDocumentArray,
  SubDocumentArrayNoId,
  SubDocument,
  SubDocumentNoId,
} from '../../src/types/_shared';

const str = Type.string({ required: true });
const num = Type.number({ required: true });
const bool = Type.boolean({ required: true });
const date = Type.date({ required: true });
const objId = Type.objectId({ required: true });
const mix = Type.mixed({ required: true });
const obj = { b1: Type.string({ required: true }) };
const arr = Type.array({ required: true }).of(Type.string());
const subSchema = createSchema({ a1: Type.string({ required: true }) });
const subSchemaNoId = createSchema(
  { a1: Type.string({ required: true }) },
  { _id: false }
);

const schema = createSchema({
  // of string
  a: Type.array().of(str),
  b: Type.array({ required: true }).of(str),

  // of number
  c: Type.array().of(num),
  d: Type.array({ required: true }).of(num),

  // of boolean
  e: Type.array().of(bool),
  f: Type.array({ required: true }).of(bool),

  // of date
  g: Type.array().of(date),
  h: Type.array({ required: true }).of(date),

  // of arrayId
  i: Type.array().of(objId),
  j: Type.array({ required: true }).of(objId),

  // of mixed
  k: Type.array().of(mix),
  l: Type.array({ required: true }).of(mix),

  // of array
  m: Type.array().of(obj),
  n: Type.array({ required: true }).of(obj),

  // of array
  o: Type.array().of(arr),
  p: Type.array({ required: true }).of(arr),

  // of schema with id
  q: Type.array().of(subSchema),
  r: Type.array({ required: true }).of(subSchema),

  // of schema with id
  s: Type.array().of(subSchemaNoId),
  t: Type.array({ required: true }).of(subSchemaNoId),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyArrOfString(val.a);
      onlyArrOfString(val.b);

      val.c && onlyArrOfNumber(val.c);
      onlyArrOfNumber(val.d);

      val.e && onlyArrOfBoolean(val.e);
      onlyArrOfBoolean(val.f);

      val.g && onlyArrOfDate(val.g);
      onlyArrOfDate(val.h);

      val.i && onlyArrOfObjectId(val.i);
      onlyArrOfObjectId(val.j);

      val.k && onlyArrOfMix(val.k);
      onlyArrOfMix(val.l);

      val.m && onlyArrOfObj(val.m);
      onlyArrOfObj(val.n);

      val.o && onlyArrOfArr(val.o);
      onlyArrOfArr(val.p);

      val.q && onlyArrOfSchema(val.q);
      onlyArrOfSchema(val.r);

      val.s && onlyArrOfSchemaNoId(val.s);
      onlyArrOfSchemaNoId(val.t);
    }
  });

function onlyArrOfString(_: string[]) {}
function onlyArrOfNumber(_: number[]) {}
function onlyArrOfBoolean(_: boolean[]) {}
function onlyArrOfDate(_: Date[]) {}
function onlyArrOfObjectId(_: Types.ObjectId[]) {}
function onlyArrOfMix<T extends any>(_: Exclude<T, NotAny>[]) {}
function onlyArrOfObj(_: { b1: string }[]) {}
function onlyArrOfArr(_: Array<Array<string>>) {}
function onlyArrOfSchema(
  _: SubDocumentArray<
    { _id: Types.ObjectId; __v: number; a1: string } & SubDocument
  >
) {}
function onlyArrOfSchemaNoId(
  _: SubDocumentArrayNoId<{ __v: number; a1: string } & SubDocumentNoId>
) {}
