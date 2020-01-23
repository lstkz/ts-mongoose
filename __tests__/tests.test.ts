import { createSchema, Type, typedModel } from '../src';
import mongoose, { Schema, Connection } from 'mongoose';

describe('string', () => {
  test('required', () => {
    expect(Type.string({ required: true })).toEqual({
      type: String,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.string({ required: true, unique: true })).toEqual({
      type: String,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.string()).toEqual({
      type: String,
    });
  });
  test('optional with options', () => {
    expect(Type.string({ unique: true })).toEqual({
      type: String,
      unique: true,
    });
  });
});

const genders = ['female', 'male'] as const;
describe('string enum', () => {
  test('required', () => {
    expect(Type.string({ required: true, enum: genders })).toEqual({
      type: String,
      enum: ['female', 'male'],
      required: true,
    });
  });
  test('required with options', () => {
    expect(
      Type.string({ required: true, enum: genders, unique: true })
    ).toEqual({
      type: String,
      enum: ['female', 'male'],
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.string({ enum: genders })).toEqual({
      type: String,
      enum: ['female', 'male'],
    });
  });
  test('optional with options', () => {
    expect(Type.string({ enum: genders, unique: true })).toEqual({
      type: String,
      enum: ['female', 'male'],
      unique: true,
    });
  });
});

describe('number', () => {
  test('required', () => {
    expect(Type.number({ required: true })).toEqual({
      type: Number,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.number({ required: true, unique: true })).toEqual({
      type: Number,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.number()).toEqual({
      type: Number,
    });
  });
  test('optional with options', () => {
    expect(Type.number({ unique: true })).toEqual({
      type: Number,
      unique: true,
    });
  });
});

describe('boolean', () => {
  test('required', () => {
    expect(Type.boolean({ required: true })).toEqual({
      type: Boolean,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.boolean({ required: true, unique: true })).toEqual({
      type: Boolean,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.boolean()).toEqual({
      type: Boolean,
    });
  });
  test('optional with options', () => {
    expect(Type.boolean({ unique: true })).toEqual({
      type: Boolean,
      unique: true,
    });
  });
});

describe('date', () => {
  test('required', () => {
    expect(Type.date({ required: true })).toEqual({
      type: Date,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.date({ required: true, unique: true })).toEqual({
      type: Date,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.date()).toEqual({
      type: Date,
    });
  });
  test('optional with options', () => {
    expect(Type.date({ unique: true })).toEqual({
      type: Date,
      unique: true,
    });
  });
});

describe('mixed', () => {
  test('required', () => {
    expect(Type.mixed({ required: true })).toEqual({
      type: Schema.Types.Mixed,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.mixed({ required: true, unique: true })).toEqual({
      type: Schema.Types.Mixed,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.mixed()).toEqual({
      type: Schema.Types.Mixed,
    });
  });
  test('optional with options', () => {
    expect(Type.mixed({ unique: true })).toEqual({
      type: Schema.Types.Mixed,
      unique: true,
    });
  });
});

describe('objectId', () => {
  test('required', () => {
    expect(Type.objectId({ required: true })).toEqual({
      type: Schema.Types.ObjectId,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.objectId({ required: true, unique: true })).toEqual({
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.objectId()).toEqual({
      type: Schema.Types.ObjectId,
    });
  });
  test('optional with options', () => {
    expect(Type.objectId({ unique: true })).toEqual({
      type: Schema.Types.ObjectId,
      unique: true,
    });
  });
});

describe('decimal128', () => {
  test('required', () => {
    expect(Type.decimal128({ required: true })).toEqual({
      type: Schema.Types.Decimal128,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.decimal128({ required: true, unique: true })).toEqual({
      type: Schema.Types.Decimal128,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.decimal128()).toEqual({
      type: Schema.Types.Decimal128,
    });
  });
  test('optional with options', () => {
    expect(Type.decimal128({ unique: true })).toEqual({
      type: Schema.Types.Decimal128,
      unique: true,
    });
  });
});

describe('object', () => {
  test('required', () => {
    expect(
      Type.object({ required: true }).of({
        foo: Type.string({ required: true }),
      })
    ).toEqual({
      type: {
        foo: {
          type: String,
          required: true,
        },
      },
      required: true,
    });
  });
  test('required with options', () => {
    expect(
      Type.object({ required: true, unique: true }).of({
        foo: Type.string({ required: true }),
      })
    ).toEqual({
      type: {
        foo: {
          type: String,
          required: true,
        },
      },
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(
      Type.object().of({
        foo: Type.string({ required: true }),
      })
    ).toEqual({
      type: {
        foo: {
          type: String,
          required: true,
        },
      },
    });
  });
  test('optional with options', () => {
    expect(
      Type.object({ unique: true }).of({
        foo: Type.string({ required: true }),
      })
    ).toEqual({
      type: {
        foo: {
          type: String,
          required: true,
        },
      },
      unique: true,
    });
  });
});

describe('array', () => {
  test('required', () => {
    expect(
      Type.array({ required: true }).of(Type.string({ required: true }))
    ).toEqual({
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
    });
  });
  test('required with options', () => {
    expect(
      Type.array({ required: true, unique: true }).of(
        Type.string({ required: true })
      )
    ).toEqual({
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.array().of(Type.string({ required: true }))).toEqual({
      type: [
        {
          type: String,
          required: true,
        },
      ],
    });
  });
  test('optional with options', () => {
    expect(
      Type.array({ unique: true }).of(Type.string({ required: true }))
    ).toEqual({
      type: [
        {
          type: String,
          required: true,
        },
      ],
      unique: true,
    });
  });
});

describe('schema', () => {
  const schema = createSchema({
    foo: Type.string(),
  });
  test('required', () => {
    expect(Type.schema({ required: true }).of(schema)).toEqual({
      type: schema,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.schema({ required: true, unique: true }).of(schema)).toEqual({
      type: schema,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.schema().of(schema)).toEqual({
      type: schema,
    });
  });
  test('optional with options', () => {
    expect(Type.schema({ unique: true }).of(schema)).toEqual({
      type: schema,
      unique: true,
    });
  });
});

describe('ref', () => {
  test('required', () => {
    const CommentSchema = createSchema({
      content: Type.string(),
      date: Type.date(),
    });
    const schema = {
      comments: Type.array({ required: true }).of(
        Type.ref(Type.string({ required: true })).to('Comment', CommentSchema)
      ),
    };
    expect(schema).toEqual({
      comments: {
        required: true,
        type: [
          {
            ref: 'Comment',
            required: true,
            type: String,
          },
        ],
      },
    });
  });
});

describe('typedModel - statics', () => {
  test('should return Model with static function', () => {
    const CommentSchema = createSchema({
      content: Type.string(),
      date: Type.date(),
    });
    const CommentModel = typedModel('cm', CommentSchema, undefined, undefined, {
      countLetters: function(name: string, bonus?: number): number {
        return name.length + (bonus ? bonus : 0);
      },
    });
    expect(typeof CommentModel.countLetters).toBe('function');
  });
  test('should return Model without a static function', () => {
    const CommentSchemaNoStatic = createSchema({
      content: Type.string(),
      date: Type.date(),
    });
    const CommentModelNoStatic = typedModel('cmns', CommentSchemaNoStatic);
    expect(typeof CommentModelNoStatic.countLetters).toBe('undefined');
  });
});

describe('typedModel - mongoose.createConnection', () => {
  const connection = new mongoose.Connection(mongoose) // Created like this for offline use
  const CommentSchema = createSchema({
    content: Type.string(),
    date: Type.date(),
  });
  const CommentModel = typedModel('cm', CommentSchema, undefined, undefined, {}, connection);

  test('returns correct modelName', () => {
    expect(CommentModel.modelName).toBe('cm');
  });
  test('connection contains correct model', () => {
    expect(connection.modelNames()).toContain('cm');
  });
});
