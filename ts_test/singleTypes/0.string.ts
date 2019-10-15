import { createSchema, Type, typedModel } from '../../src';

const schema = createSchema({
  a: Type.string(),
  b: Type.string({ required: true }),
  c: Type.string({ enum: ['a', 'b'] as const }),
  d: Type.string({ required: true, enum: ['a', 'b'] as const }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyString(val.a);
      onlyString(val.b);
      val.c && onlyAB(val.c);
      onlyAB(val.d);
    }
  });

function onlyString(_: string) {}
function onlyAB(_: 'a' | 'b') {}
