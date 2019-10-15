import { createSchema, Type, typedModel } from '../../src';

const schema = createSchema({
  a: Type.mixed(),
  b: Type.mixed({ required: true }),
});

typedModel('', schema)
  .findOne()
  .then(val => {
    if (val) {
      val.a && onlyMixed(val.a);
      onlyMixed(val.b);
    }
  });

export type NotAny =
  | string
  | number
  | boolean
  | Date
  | Array<any>
  | {}
  | object
  | Function;
function onlyMixed<T extends any>(_: Exclude<T, NotAny>) {}
