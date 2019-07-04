import {
  createSchema,
  Type,
  typedModel,
  ModelInstanceType,
  ModelInstancesType,
} from '../src';
import '../src/plugin';

const UserSchema = createSchema(
  {
    name: Type.string(),
    age: Type.number(),
  },
  {
    statics: {
      findByName: function(name: string): ModelInstancesType {
        return this.find({ name: name });
      },
      findOneByName: function(name: string): ModelInstanceType {
        return this.findOne({ name: name });
      },
      countLetters: function(name: string, bonus?: number): number {
        return name.length + (bonus ? bonus : 0);
      },
    },
  }
);

const User = typedModel('User', UserSchema);

async function test() {
  const users = await User.findByName('John');
  users[0].age;
  const user = await User.findOneByName('Michael');
  if (user) {
    user.age;
  }

  const nameLength = User.countLetters('123', 3);
}
