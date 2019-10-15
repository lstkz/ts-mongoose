import { createSchema, Type, typedModel } from '../../src';

const schema = createSchema({
  a: Type.number(),
  b: Type.number({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyNumber(val.a);
      onlyNumber(val.b);
    }
  });

function onlyNumber(_: number) {}
