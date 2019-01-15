// example from https://github.com/BetterCallSky/ts-mongoose/issues/2

import { createSchema, Type, typedModel } from '../src';
import '../src/plugin';

const PropSchema = createSchema({ myprop: Type.string() });
const ExtSchema = createSchema({
  myotherprop: Type.string(),
});

const UserSchema = createSchema({
  email: Type.string({ unique: true, required: true }),
  username: Type.string({ unique: true, required: true }),
  password: Type.string(),
  extern: Type.ref(Type.objectId()).to('Extern', ExtSchema),
  comments: Type.array().of(
    Type.ref(Type.objectId()).to('Comments', PropSchema)
  ),
  created_at: Date,
});

export async function test() {
  const User = typedModel('User', UserSchema);
  let user = await User.findById('123')
    .populateTs('extern')
    .populateTs('comments');
  if (user) {
    let ooo = user.comments; // { myprop: string;}[] OK
    let eee = user.extern; // mongoose.Types.ObjectId | {myotherprop: string;} NOK
  }
}
