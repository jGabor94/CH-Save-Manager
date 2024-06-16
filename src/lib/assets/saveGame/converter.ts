import { SaveGame } from "./types";
import { deflateRawSync, inflateRawSync } from "node:zlib";


const hash = "7e8bb5a89f2842ac4af01b3b7e228592";


/*
    Mentés dekódolása szerver oldalon
*/
export const decode = (str: string): SaveGame => {
    const body = str.toString().slice(32);
    const compressed = Buffer.from(body, "base64");
    const json = inflateRawSync(compressed).toString();
    return JSON.parse(json);
}


/*
   Mentés enkódölása szerver oldalon
*/
export const encode = (data: SaveGame) => {
    const json = JSON.stringify(data);
    const compressed = deflateRawSync(json);
    return hash + compressed.toString("base64");
}


/*
    Dekódolt mentés objektum módosítása paltrform szerint.
*/

const converter = {
    "pc": (data: SaveGame): SaveGame => ({
        ...data,
        rubies: Math.round(data.rubies * 10),
        saveOrigin: "mobile",
        readPatchNumber: data.readPatchNumber.length > 6 ? ("2.7." + data.readPatchNumber.slice(-4)) : "2.5.0"
    }),
    "mobile": (data: SaveGame): SaveGame => ({
        ...data,
        rubies: Math.round(data.rubies / 10),
        saveOrigin: "pc",
        readPatchNumber: data.readPatchNumber.length > 5 ? "1.0e12-" + data.readPatchNumber.slice(-4) : "1.0e12"
    }),
}


/*
    Dekódolás -> konvertálás -> enkódolás
*/

export const convert = (str: string) => {
    const data = decode(str);
    let outLabel = data.saveOrigin;
    const temp2 = converter[outLabel](data);

    return {
        data: encode(temp2),
        from: outLabel,
        to: temp2.saveOrigin,
    }
}