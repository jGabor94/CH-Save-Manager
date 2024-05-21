export type AnyObject = Record<string, any>

export type Email = `${string}@${string}`

export type ThemeMode = "light" | "dark"

export type ExpandObject<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

