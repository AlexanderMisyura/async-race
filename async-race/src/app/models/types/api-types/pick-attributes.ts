export type PickAttributes<T, K extends keyof T> = { [P in K]: T[P] };
