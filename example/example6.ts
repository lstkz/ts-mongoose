import { createSchema, Type, typedModel } from '../src';
import '../src/plugin';

const UserSchema = createSchema({
  name: Type.string(),
  age: Type.number(),
});

const User = typedModel('User', UserSchema, undefined, undefined, {
  findByName: function(name: string) {
    return this.find({ name });
  },
  findOneByName: function(name: string) {
    return this.findOne({ name });
  },
  countLetters: function(name: string, bonus?: number) {
    return name.length + (bonus ? bonus : 0);
  },
});

async function test() {
  const u = await User.findOne({});
  if (u) u.name;
  const users = await User.findByName('John');
  users[0].age;
  const user = await User.findOneByName('Michael');
  if (user) {
    user.age;
  }

  const nameLength = User.countLetters('123', 3);
  nameLength.toFixed();
}
