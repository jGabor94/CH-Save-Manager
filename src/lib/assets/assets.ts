import { Email } from "../types/types";

/*
    Json szerializáható objektum előállítása.
*/
export const toSerializableObject = <R>(data: any): R => JSON.parse(JSON.stringify(data))


/*
    Felhasználónév kivontolás az email címből.
*/
export const extractUsername = (email: Email): string => email.split('@')[0]


































