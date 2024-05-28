import { deflateRawSync, inflateRawSync } from "node:zlib";
import { SaveGame } from "./converter";


const hash = "7e8bb5a89f2842ac4af01b3b7e228592";


/*
    Mentés dekódolása
*/
export const decode = (str: string): SaveGame => {
    const body = str.toString().slice(32);
    const compressed = Buffer.from(body, "base64");
    const json = inflateRawSync(compressed).toString();
    return JSON.parse(json);
}


/*
   Mentés enkódölása
*/
export const encode = (data: SaveGame) => {
    const json = JSON.stringify(data);
    const compressed = deflateRawSync(json);
    return hash + compressed.toString("base64");
}