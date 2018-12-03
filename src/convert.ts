// export type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// export type PrimitiveSchema =
//   | StringSchema
//   | NumberSchema
//   | BooleanSchema
//   | DateSchema
//   | EnumSchema;

// export type Flatten<T> = { [K in keyof T]: T[K] };

// /* Auto generated */

// export type ExtractPrimitive<T> = T extends StringSchema<
//   infer TReq,
//   infer TNull
// >
//   ? CheckREQ<TReq, TNull, string>
//   : T extends NumberSchema<infer TReq, infer TNull>
//     ? CheckREQ<TReq, TNull, number>
//     : T extends BooleanSchema<infer TReq, infer TNull>
//       ? CheckREQ<TReq, TNull, boolean>
//       : T extends DateSchema<infer TReq, infer TNull>
//         ? CheckREQ<TReq, TNull, Date>
//         : T extends EnumSchema<infer TReq, infer TNull, infer TType>
//           ? CheckREQ<TReq, TNull, TType>
//           : T;

// export type ExtractObject<T> = { [K in keyof T]: ConvertType<T[K]> };

// export type ConvertType<T> = T extends PrimitiveSchema
//   ? ExtractPrimitive<T>
//   : T extends ArraySchema<infer TReq, infer TNull, infer K>
//     ? CheckREQ<
//         TReq,
//         TNull,
//         Array<
//           K extends ObjectSchema<infer TReq, infer TNull, infer P>
//             ? CheckREQ<TReq, TNull, ExtractObject2<P>>
//             : ConvertType2<K>
//         >
//       >
//     : T extends ObjectSchema<infer TReq, infer TNull, infer K>
//       ? CheckREQ<TReq, TNull, ExtractObject2<K>>
//       : T;

// export type ExtractObject2<T> = ConvertObject<
//   { [K in keyof T]: ConvertType2<T[K]> }
// >;

// export type ConvertType2<T> = T extends PrimitiveSchema
//   ? ExtractPrimitive<T>
//   : T extends ArraySchema<infer TReq, infer TNull, infer K>
//     ? CheckREQ<
//         TReq,
//         TNull,
//         Array<
//           K extends ObjectSchema<infer TReq, infer TNull, infer P>
//             ? CheckREQ<TReq, TNull, ExtractObject3<P>>
//             : ConvertType3<K>
//         >
//       >
//     : T extends ObjectSchema<infer TReq, infer TNull, infer K>
//       ? CheckREQ<TReq, TNull, ExtractObject3<K>>
//       : T;

// export type ExtractObject3<T> = { [K in keyof T]: ConvertType3<T[K]> };

// export type ConvertType3<T> = T extends PrimitiveSchema
//   ? ExtractPrimitive<T>
//   : T extends ArraySchema<infer TReq, infer TNull, infer K>
//     ? CheckREQ<
//         TReq,
//         TNull,
//         Array<
//           K extends ObjectSchema<infer TReq, infer TNull, infer P>
//             ? CheckREQ<TReq, TNull, ExtractObject4<P>>
//             : ConvertType4<K>
//         >
//       >
//     : T extends ObjectSchema<infer TReq, infer TNull, infer K>
//       ? CheckREQ<TReq, TNull, ExtractObject4<K>>
//       : T;

// export type ExtractObject4<T> = { [K in keyof T]: ConvertType4<T[K]> };

// export type ConvertType4<T> = T extends PrimitiveSchema
//   ? ExtractPrimitive<T>
//   : T;

// /* Auto generated END */

// // DEEP Convert

// export type Convert<T> = ConvertType<T>;

// export type NonFunctionProp<T> = T extends Function ? never : T;

// export type OptionalPropNames<T> = {
//   [P in keyof T]: undefined extends T[P] ? P : never
// }[keyof T];

// export type RequiredPropNames<T> = {
//   [P in keyof T]: undefined extends T[P] ? never : P
// }[keyof T];

// export type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
// export type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };

// export type MakeOptional<T> = { [P in keyof T]?: T[P] };

// export type ConvertObject<T> = Flatten<
//   MakeOptional<OptionalProps<T>> & RequiredProps<T>
// >;

// export type DeepConvertObject<T> = T extends Array<any>
//   ? T
//   : ConvertObject<{ [P in keyof T]: DeepConvert<T[P]> }>;

// export type DeepConvert<T> = T extends object ? DeepConvertObject<T> : T;
