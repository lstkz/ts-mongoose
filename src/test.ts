import { Schema, model, Model, Document } from 'mongoose';

interface UserProps extends Document {
  username: string;
}

const UserSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const User: Model<UserProps> = model('User', UserSchema);

User.create({});

async function test() {
  const user = await User.findOne();
  if (!user) {
    throw new Error('not found');
  }
  user.username = 'a';
}
