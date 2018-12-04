import { plugin } from 'mongoose';
import { Populate, MaybeItem } from './types';

plugin((schema: any) => {
  schema.statics.populateTs = function(prop: string) {
    return this.populate(prop);
  };
});

declare module 'mongoose' {
  interface DocumentQuery<T, DocType extends Document, QueryHelpers = {}>
    extends mquery {
    populateTs<P extends keyof MaybeItem<NonNullable<T>>>(
      prop: P
    ): DocumentQuery<Populate<T, P>, T & Document> & QueryHelpers;
  }
}
