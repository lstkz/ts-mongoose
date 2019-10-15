import { createSchema, Type, typedModel } from '../../src';

const schema = createSchema({
  a: Type.boolean(),
  b: Type.boolean({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyBoolean(val.a);
      onlyBoolean(val.b);
    }
  });

function onlyBoolean(_: boolean) {}
