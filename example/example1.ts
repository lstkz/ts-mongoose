import { createSchema, Type, typedModel, ExtractDoc } from '../src';

const genders = ['male', 'female'] as const;

const AddressSchema = createSchema(
  {
    city: Type.string({ required: true }),
    country: Type.string(),
    zip: Type.string(),
  },
  { _id: false, timestamps: true }
);

const PhoneSchema = createSchema({
  phoneNumber: Type.number({ required: true }),
  name: Type.string(),
});

const UserSchema = createSchema(
  {
    title: Type.string({ required: true }),
    author: Type.string({ required: true }),
    body: Type.string({ required: true }),
    comments: Type.array().of({
      body: Type.string({ required: true }),
      date: Type.date({ required: true }),
    }),
    date: Type.date({ default: Date.now as any }),
    hidden: Type.boolean({ required: true }),
    meta: Type.object().of({
      votes: Type.number({ required: true }),
      favs: Type.number({ required: true }),
    }),
    m: Type.mixed({ required: true }),
    gender: Type.string({ required: true, enum: genders }),
    otherId: Type.objectId({ required: true }),
    address: Type.schema({ required: true }).of(AddressSchema),
    phones: Type.array({ required: true }).of(PhoneSchema),
  },
  { timestamps: { createdAt: true } }
);

const User = typedModel('User', UserSchema);
User.findById('123').then(user => {
  if (user) {
    // user.
  }
});

type UserDoc = ExtractDoc<typeof UserSchema>;

function blockUser(user: UserDoc) {
  // user.
}
