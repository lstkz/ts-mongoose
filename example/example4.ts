import { createSchema, Type, typedModel } from '../src';
import '../src/plugin';

const CommentSchema = createSchema({
  content: Type.string(),
  date: Type.date(),
});

const UserSchema = createSchema({
  title: Type.string(),
  author: Type.string(),
  comments: Type.array().of(
    Type.ref(Type.objectId()).to('Comment', CommentSchema)
  ),
});

const User = typedModel('User', UserSchema);

async function test() {
  const populated = await User.findById('123').populateTs('comments');
  if (populated) {
    populated.comments;
  }
  const notPopulated = await User.findById('123');
  if (notPopulated) {
    notPopulated.comments;
  }
  const users = await User.find({ a: '123' }).populateTs('comments');
  users.forEach(user => {
    user.comments;
  });
}
