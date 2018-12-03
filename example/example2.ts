import { Schema, model, Model, Document } from 'mongoose';
import { Type } from '../src';

const AddressSchema = new Schema({
  city: { type: String, required: true },
  country: String,
  zip: String,
});

const UserSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [
    {
      body: { type: String, required: true },
      date: Type.date(),
    },
  ],
  date: { type: Date, default: Date.now, required: true },
  hidden: { type: Boolean, required: true },
  meta: {
    votes: { type: Schema.Types.Number },
    favs: { type: Schema.Types.Number },
  },
  m: {
    type: Schema.Types.Mixed,
    required: true,
  },
  otherId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
});

interface UserProps extends Document {
  title: string;
  author: string;
  body: string;
  // Duplicate all props from the above schema :(
}

const User: Model<UserProps> = model('User', UserSchema);
