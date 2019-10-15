import { createSchema, Type, typedModel } from '../../src';

const schema = createSchema({
  a: Type.date(),
  b: Type.date({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyDate(val.a);
      onlyDate(val.b);
    }
  });

function onlyDate(_: Date) {}
