import { createSchema, Type, typedModel } from '../../src';
import { Types } from 'mongoose';

const schema = createSchema({
  a: Type.decimal128(),
  b: Type.decimal128({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyDecimal128(val.a);
      onlyDecimal128(val.b);
    }
  });

function onlyDecimal128(_: Types.Decimal128) {}
