import { Email } from "../types/types";
import { ThemeMode } from "../database/types";


export type NumFormatter = (input: number | string) => string

/*
    Json szerializáható objektum előállítása.
*/
export const toSerializableObject = <R>(data: any): R => JSON.parse(JSON.stringify(data))


/*
    Felhasználónév kivontolás az email címből.
*/
export const extractUsername = (email: Email): string => email.split('@')[0]




export const toggleColorMode = (mode: ThemeMode) => mode === "dark" ? "light" : "dark"
































