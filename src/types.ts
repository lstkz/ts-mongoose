export type Extract<T> = T extends { definition: infer U } ? U : never;
