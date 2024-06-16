import pako from "pako";
import { SaveGame } from "./types";

const hash = "7e8bb5a89f2842ac4af01b3b7e228592";

/*
    Mentés dekódolása kliens oldalon
*/
export const decode_Client = async (data: string): Promise<SaveGame> => {
    const body = data.slice(hash.length);
    const compressed = Buffer.from(body, "base64");
    const json = pako.inflateRaw(compressed, { to: "string" });
    return JSON.parse(json);
}