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
  a: Type.ref(Type.objectId()).to('ref', SubSchema),
  b: Type.ref(Type.objectId({ required: true })).to('ref', SubSchema),
  c: Type.ref(Type.objectId()).to('ref', SubSchemaNoId),
  d: Type.ref(Type.objectId({ required: true })).to('ref', SubSchemaNoId),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && objectIdOrSchema(val.a);
      objectIdOrSchema(val.b);
      val.c && objectIdOrSchemaNoId(val.c);
      objectIdOrSchemaNoId(val.d);
    }
  });

function objectIdOrSchema(
  _: Types.ObjectId | { _id: Types.ObjectId; __v: number; a: number }
) {}
function objectIdOrSchemaNoId(
  _: Types.ObjectId | { __v: number; a: boolean }
) {}
