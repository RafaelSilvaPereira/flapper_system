export type Or<X, Y> = X | Y;
export type RequiredAllOrOmitId<T> = Required<Or<T, Omit<T, 'id'>>>;
export type RequiredAllOrOmitKeys<T, K extends keyof T> = Required<Or<T, Omit<T, K>>>;
