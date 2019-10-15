import { createSchema, Type, typedModel } from '../../src';
import { Types } from 'mongoose';

const SubSchema = createSchema({
  a: Type.number({ required: true }),
});
const SubSchemaNoId = createSchema(
  {
    a: Type.boolean({ required: true }),
  },
  { _id: false }
);

const schema = createSchema({
  a: Type.schema().of(SubSchema),
  b: Type.schema({ required: true }).of(SubSchema),
  c: Type.schema().of(SubSchemaNoId),
  d: Type.schema({ required: true }).of(SubSchemaNoId),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlySchema(val.a);
      onlySchema(val.b);
      val.c && onlySchemaNoId(val.c);
      onlySchemaNoId(val.d);
    }
  });

function onlySchema(_: { _id: Types.ObjectId; __v: number; a: number }) {}
function onlySchemaNoId(_: { __v: number; a: boolean }) {}
