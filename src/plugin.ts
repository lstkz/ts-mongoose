import { Query } from 'mongoose';
import { Populate, MaybeItem } from './types';

Query.prototype.populateTs = function populateTs(prop) {
  return this.populate(prop);
};

declare module 'mongoose' {
  interface DocumentQuery<T, DocType extends Document, QueryHelpers = {}>
    extends mquery {
    populateTs<P extends keyof MaybeItem<NonNullable<T>>>(
      prop: P
    ): DocumentQuery<Populate<T, P>, T & Document> & QueryHelpers;
  }
}
