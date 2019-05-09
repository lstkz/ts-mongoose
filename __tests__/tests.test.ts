import { createSchema, Type } from '../src';
import { Schema } from 'mongoose';

describe('string', () => {
  test('required', () => {
    expect(Type.string()).toEqual({
      type: String,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.string({ unique: true })).toEqual({
      type: String,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalString()).toEqual({
      type: String,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalString({ unique: true })).toEqual({
      type: String,
      unique: true,
    });
  });
});

describe('number', () => {
  test('required', () => {
    expect(Type.number()).toEqual({
      type: Number,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.number({ unique: true })).toEqual({
      type: Number,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalNumber()).toEqual({
      type: Number,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalNumber({ unique: true })).toEqual({
      type: Number,
      unique: true,
    });
  });
});

describe('boolean', () => {
  test('required', () => {
    expect(Type.boolean()).toEqual({
      type: Boolean,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.boolean({ unique: true })).toEqual({
      type: Boolean,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalBoolean()).toEqual({
      type: Boolean,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalBoolean({ unique: true })).toEqual({
      type: Boolean,
      unique: true,
    });
  });
});

describe('date', () => {
  test('required', () => {
    expect(Type.date()).toEqual({
      type: Date,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.date({ unique: true })).toEqual({
      type: Date,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalDate()).toEqual({
      type: Date,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalDate({ unique: true })).toEqual({
      type: Date,
      unique: true,
    });
  });
});

describe('mixed', () => {
  test('required', () => {
    expect(Type.mixed()).toEqual({
      type: Schema.Types.Mixed,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.mixed({ unique: true })).toEqual({
      type: Schema.Types.Mixed,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalMixed()).toEqual({
      type: Schema.Types.Mixed,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalMixed({ unique: true })).toEqual({
      type: Schema.Types.Mixed,
      unique: true,
    });
  });
});

describe('objectId', () => {
  test('required', () => {
    expect(Type.objectId()).toEqual({
      type: Schema.Types.ObjectId,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.objectId({ unique: true })).toEqual({
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalObjectId()).toEqual({
      type: Schema.Types.ObjectId,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalObjectId({ unique: true })).toEqual({
      type: Schema.Types.ObjectId,
      unique: true,
    });
  });
});

describe('object', () => {
  test('required', () => {
    expect(
      Type.object().of({
        foo: Type.string(),
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
      Type.object({ unique: true }).of({
        foo: Type.string(),
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
      Type.optionalObject().of({
        foo: Type.string(),
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
      Type.optionalObject({ unique: true }).of({
        foo: Type.string(),
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
    expect(Type.array().of(Type.string())).toEqual({
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
    expect(Type.array({ unique: true }).of(Type.string())).toEqual({
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
    expect(Type.optionalArray().of(Type.string())).toEqual({
      type: [
        {
          type: String,
          required: true,
        },
      ],
    });
  });
  test('optional with options', () => {
    expect(Type.optionalArray({ unique: true }).of(Type.string())).toEqual({
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

describe('documentsArray', () => {
  const CommentSchema = createSchema({
    content: Type.string(),
    date: Type.date(),
  });
  test('required', () => {
    expect(Type.documentsArray().of(CommentSchema)).toEqual({
      type: [CommentSchema],
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.documentsArray({ unique: true }).of(CommentSchema)).toEqual({
      type: [CommentSchema],
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalDocumentsArray().of(CommentSchema)).toEqual({
      type: [CommentSchema],
    });
  });
  test('optional with options', () => {
    expect(
      Type.optionalDocumentsArray({ unique: true }).of(CommentSchema)
    ).toEqual({
      type: [CommentSchema],
      unique: true,
    });
  });
});

describe('schema', () => {
  const schema = createSchema({
    foo: Type.string(),
  });
  test('required', () => {
    expect(Type.schema().of(schema)).toEqual({
      type: schema,
      required: true,
    });
  });
  test('required with options', () => {
    expect(Type.schema({ unique: true }).of(schema)).toEqual({
      type: schema,
      required: true,
      unique: true,
    });
  });
  test('optional', () => {
    expect(Type.optionalSchema().of(schema)).toEqual({
      type: schema,
    });
  });
  test('optional with options', () => {
    expect(Type.optionalSchema({ unique: true }).of(schema)).toEqual({
      type: schema,
      unique: true,
    });
  });
});

describe('ref', () => {
  test('ref', () => {
    const CommentSchema = createSchema({
      content: Type.string(),
      date: Type.date(),
    });
    const schema = {
      comments: Type.array().of(
        Type.ref(Type.string()).to('Comment', CommentSchema)
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
