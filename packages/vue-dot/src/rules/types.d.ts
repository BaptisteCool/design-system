// We can't predict the type of the value, so it's type is any
export type ValidationRule = (value: any) => string | boolean;

export interface ValidationRules {
	[key: string]: ValidationRule;
}

// Generic function types (for error messages)
/** Function that takes optional args and returns a string */
export type GenericFnOpt<T> = (arg?: T) => string;

/** Function that takes args and returns a string */
type GenericFn<T> = (arg: T) => string;

export interface ErrorMessages<T = string> {
	[key: string]: GenericFn<T> | GenericFnOpt<T> | string;
}
