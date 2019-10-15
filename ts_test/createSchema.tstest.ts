import { createSchema, typedModel, Type } from '../src';
import { Types, Document } from 'mongoose';
import { UpdatedAt, CreatedAt, VerKey, Id } from '../src/types/_shared';

type NotPresent<T, V> = T & Partial<Record<keyof V, never>>;

const TimestampsTests = () => {
  type CreatedAtObj = Record<CreatedAt, Date>;
  type UpdatedAtObj = Record<UpdatedAt, Date>;
  type CreatedAtCustomObj = Record<'customCreatedAt', Date>;
  type UpdatedAtCustomObj = Record<'customUpdatedAt', Date>;
  function createdAtNotPresent(_: NotPresent<Document, CreatedAtObj>) {}
  function updatedAtNotPresent(_: NotPresent<Document, UpdatedAtObj>) {}
  function createdAtPresent(_: CreatedAtObj) {}
  function updatedAtPresent(_: UpdatedAtObj) {}
  function createdAtCustomPresent(_: CreatedAtCustomObj) {}
  function updatedAtCustomPresent(_: UpdatedAtCustomObj) {}

  // Timestamps should not be present by default
  typedModel('', createSchema({}))
    .findOne()
    .then(val => val && createdAtNotPresent(val) && updatedAtNotPresent(val));

  // Timestamps should not be present if set false
  typedModel('', createSchema({}, { timestamps: false }))
    .findOne()
    .then(val => val && createdAtNotPresent(val) && updatedAtNotPresent(val));

  // Timestamps should be present if timestamps set true
  typedModel('', createSchema({}, { timestamps: true }))
    .findOne()
    .then(val => val && createdAtPresent(val) && updatedAtPresent(val));

  // Timestamps should be present if both set true
  typedModel(
    '',
    createSchema({}, { timestamps: { createdAt: true, updatedAt: true } })
  )
    .findOne()
    .then(val => val && createdAtPresent(val) && updatedAtPresent(val));

  // CreatedAt should be present if createdAt set true, updatedAt should not be present by default
  typedModel('', createSchema({}, { timestamps: { createdAt: true } }))
    .findOne()
    .then(val => val && createdAtPresent(val) && updatedAtNotPresent(val));

  // CreatedAt should be present if createdAt set true, updatedAt should not be present if set false
  typedModel(
    '',
    createSchema({}, { timestamps: { createdAt: true, updatedAt: false } })
  )
    .findOne()
    .then(val => val && createdAtPresent(val) && updatedAtNotPresent(val));

  // CreatedAt should not be present if createdAt set false, updatedAt should not be present by default
  typedModel('', createSchema({}, { timestamps: { createdAt: false } }))
    .findOne()
    .then(val => val && createdAtNotPresent(val) && updatedAtNotPresent(val));

  // CreatedAt should not be present by default, updateAt should be present if updatedAt set true
  typedModel('', createSchema({}, { timestamps: { updatedAt: true } }))
    .findOne()
    .then(val => val && createdAtNotPresent(val) && updatedAtPresent(val));

  // CreatedAt should not be present by default, updateAt should not be present if updatedAt set false
  typedModel('', createSchema({}, { timestamps: { updatedAt: false } }))
    .findOne()
    .then(val => val && createdAtNotPresent(val) && updatedAtNotPresent(val));

  // Custom createAt present
  typedModel(
    '',
    createSchema({}, { timestamps: { createdAt: 'customCreatedAt' as const } })
  )
    .findOne()
    .then(
      val => val && createdAtCustomPresent(val) && updatedAtNotPresent(val)
    );

  // Custom updatedAt present
  typedModel(
    '',
    createSchema({}, { timestamps: { updatedAt: 'customUpdatedAt' as const } })
  )
    .findOne()
    .then(
      val => val && createdAtNotPresent(val) && updatedAtCustomPresent(val)
    );

  // Custom createdAt and custom updatedAt present
  typedModel(
    '',
    createSchema(
      {},
      {
        timestamps: {
          createdAt: 'customCreatedAt' as const,
          updatedAt: 'customUpdatedAt' as const,
        },
      }
    )
  )
    .findOne()
    .then(
      val => val && createdAtCustomPresent(val) && updatedAtCustomPresent(val)
    );
};

const VersionTests = () => {
  type VersionObj = Record<VerKey, number>;
  type VersionAtCustomObj = Record<'customVer', number>;
  function VersionNotPresent(_: NotPresent<Document, VersionObj>) {}
  function VersionPresent(_: VersionObj) {}
  function VersionCustomPresent(_: VersionAtCustomObj) {}

  // __v should be present by default
  typedModel('', createSchema({}))
    .findOne()
    .then(val => val && VersionPresent(val));

  // __v should be present if set true
  typedModel('', createSchema({}, { versionKey: true }))
    .findOne()
    .then(val => val && VersionPresent(val));

  // __v should not be present if set false
  typedModel('', createSchema({}, { versionKey: false }))
    .findOne()
    .then(val => val && VersionNotPresent(val));

  // __v should be present with 'customVer' key if set 'customVer'
  typedModel('', createSchema({}, { versionKey: 'customVer' as const }))
    .findOne()
    .then(val => val && VersionCustomPresent(val));
};

const IdTest = () => {
  type IdObj = Record<Id, Types.ObjectId>;
  function IdPresent(_: IdObj) {}

  // _id should be present by default
  typedModel('', createSchema({}))
    .findOne()
    .then(val => val && IdPresent(val));

  // _id should be present if set true
  typedModel('', createSchema({}, { id: true }))
    .findOne()
    .then(val => val && IdPresent(val));

  // _id should be present if set false
  typedModel('', createSchema({}, { id: false }))
    .findOne()
    .then(val => val && IdPresent(val));
};
