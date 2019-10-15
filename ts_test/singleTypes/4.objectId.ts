import { createSchema, Type, typedModel } from '../../src';
import { Types } from 'mongoose';

const schema = createSchema({
  a: Type.objectId(),
  b: Type.objectId({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyObjectId(val.a);
      onlyObjectId(val.b);
    }
  });

function onlyObjectId(_: Types.ObjectId) {}
