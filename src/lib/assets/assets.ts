import { Email } from "../types/types";

export const toSerializableObject = <R>(data: any): R => JSON.parse(JSON.stringify(data))
export const extractUsername = (email: Email): string => email.split('@')[0]


































