import { decode, encode } from "./coder";

export interface SaveGame {
    rubies: number,
    saveOrigin: "pc" | "mobile",
    readPatchNumber: string
}

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

export const convert = (str: string) => {
    const data = decode(str);
    let outLabel = data.saveOrigin;
    const temp2 = converter[outLabel](data);

    return {
        data: encode(temp2),
        from: outLabel,
        to: temp2.saveOrigin
    }
}