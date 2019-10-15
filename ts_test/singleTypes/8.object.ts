import { createSchema, Type, typedModel } from '../../src';
import { Types } from 'mongoose';
import { NotAny } from './5.mixed';

const str = { a1: Type.string({ required: true }) };
const num = { a1: Type.number({ required: true }) };
const bool = { a1: Type.boolean({ required: true }) };
const date = { a1: Type.date({ required: true }) };
const objId = { a1: Type.objectId({ required: true }) };
const mix = { a1: Type.mixed({ required: true }) };
const obj = {
  a1: Type.object({ required: true }).of({
    b1: Type.string({ required: true }),
  }),
};
const arr = { a1: Type.array({ required: true }).of(Type.string()) };
const subSchema = createSchema({ a1: Type.string() });

const schema = createSchema({
  // of string
  a: Type.object().of(str),
  b: Type.object({ required: true }).of(str),

  // of number
  c: Type.object().of(num),
  d: Type.object({ required: true }).of(num),

  // of boolean
  e: Type.object().of(bool),
  f: Type.object({ required: true }).of(bool),

  // of date
  g: Type.object().of(date),
  h: Type.object({ required: true }).of(date),

  // of objectId
  i: Type.object().of(objId),
  j: Type.object({ required: true }).of(objId),

  // of mixed
  k: Type.object().of(mix),
  l: Type.object({ required: true }).of(mix),

  // of object
  m: Type.object().of(obj),
  n: Type.object({ required: true }).of(obj),

  // of array
  o: Type.object().of(arr),
  p: Type.object({ required: true }).of(arr),

  // of schema
  q: Type.object().of(subSchema),
  r: Type.object({ required: true }).of(subSchema),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyA1String(val.a);
      onlyA1String(val.b);

      val.c && onlyA1Number(val.c);
      onlyA1Number(val.d);

      val.e && onlyA1Boolean(val.e);
      onlyA1Boolean(val.f);

      val.g && onlyA1Date(val.g);
      onlyA1Date(val.h);

      val.i && onlyA1ObjectId(val.i);
      onlyA1ObjectId(val.j);

      val.k && onlyA1Mix(val.k);
      onlyA1Mix(val.l);

      val.m && onlyA1Obj(val.m);
      onlyA1Obj(val.n);

      val.o && onlyA1Arr(val.o);
      onlyA1Arr(val.p);
    }
  });

function onlyA1String(_: { a1: string }) {}
function onlyA1Number(_: { a1: number }) {}
function onlyA1Boolean(_: { a1: boolean }) {}
function onlyA1Date(_: { a1: Date }) {}
function onlyA1ObjectId(_: { a1: Types.ObjectId }) {}
function onlyA1Mix<T extends any>(_: { a1: Exclude<T, NotAny> }) {}
function onlyA1Obj(_: { a1: { b1: string } }) {}
function onlyA1Arr(_: { a1: string[] }) {}
