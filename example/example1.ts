import { createSchema, Type, typedModel, ExtractDoc } from '../src';

const genders = ['male', 'female'] as const;

const AddressSchema = createSchema({
  city: Type.string(),
  country: Type.optionalString(),
  zip: Type.optionalString(),
}, { _id: false, timestamps: true });

const PhoneSchema = createSchema({
  phone: Type.number(),
  name: Type.optionalString(),
});

const UserSchema = createSchema({
  title: Type.string(),
  author: Type.string(),
  body: Type.string(),
  comments: Type.array().of({
    body: Type.string(),
    date: Type.date(),
  }),
  date: Type.date({ default: Date.now as any }),
  hidden: Type.boolean(),
  meta: Type.object().of({
    votes: Type.number(),
    favs: Type.number(),
  }),
  m: Type.mixed(),
  gender: Type.string({ enum: genders }),
  otherId: Type.objectId(),
  address: Type.schema().of(AddressSchema),
  phones: Type.array().of(PhoneSchema),
}, { timestamps: { createdAt: true } });

const User = typedModel('User', UserSchema);
User.findById('123').then(user => {
  if (user) {
    // user.
  }
});

type UserDoc = ExtractDoc<typeof UserSchema>;

function blockUser(user: UserDoc) {}
