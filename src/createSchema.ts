import { SchemaOptions, Schema } from 'mongoose';

type CreateSchema = <T extends { [x: string]: any }>(
  definition?: T,
  options?: SchemaOptions
) => Schema & { definition: T };

export const createSchema: CreateSchema = (definition?, options?) => {
  try {
    return new Schema(definition, options) as any;
  } catch (e) {
    console.error(e.stack);
    console.log(definition.comments);
    console.log(definition.comments.type[0]);
  }
};

// type Extract<T> = T extends { definition: infer U } ? U : never;
// type A = Extract<typeof UserSchema>;

// let a: A;

// function typedModel<T extends Schema>(
//   name: string,
//   schema?: T,
//   collection?: string,
//   skipInit?: boolean
// ): Model<Document & Extract<T>> {
//   return model(name, schema, collection, skipInit) as any;
// }

// const User = typedModel('user', UserSchema);
// async function start() {
//   const user = await User.findById('a');
//   if (user) {
//     await user.populate('a');
//   }
// }

// const schema = {
//   name: String,
//   binary: Buffer,
//   living: Boolean,
//   updated: { type: Date, default: Date.now },
//   age: { type: Number, min: 18, max: 65 },
//   mixed: Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   decimal: Schema.Types.Decimal128,
//   array: [],
//   ofString: [String],
//   ofNumber: [Number],
//   ofDates: [Date],
//   ofBuffer: [Buffer],
//   ofBoolean: [Boolean],
//   ofMixed: [Schema.Types.Mixed],
//   ofObjectId: [Schema.Types.ObjectId],
//   ofArrays: [[]],
//   ofArrayOfNumbers: [[Number]],
//   nested: {
//     stuff: { type: String, lowercase: true, trim: true },
//   },
//   map: Map,
//   mapOfString: {
//     type: Map,
//     of: String,
//   },
// };

// type ConvertSingle2<T> = T extends StringConstructor
//   ? string
//   : T extends { type: infer K }
//   ? K
//   : T;

// type ConvertSingle<T> = T extends StringConstructor
//   ? string
//   : T extends BooleanConstructor
//   ? boolean
//   : T extends Buffer
//   ? Buffer
//   : T extends { type: infer K }
//   ? ConvertSingle2<K>
//   : T;

// type ConvertObject<T> = { [P in keyof T]: ConvertSingle<T[P]> };

// type A = ConvertObject<typeof schema>;
