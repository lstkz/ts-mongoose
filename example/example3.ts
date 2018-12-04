import { createSchema, Type, typedModel } from '../src';

const UserSchema = createSchema({
  title: Type.string(),
  author: Type.string(),
  ...({} as {
    generatedField: string;
    customFunction: () => number;
  }),
});

const User = typedModel('User', UserSchema);
