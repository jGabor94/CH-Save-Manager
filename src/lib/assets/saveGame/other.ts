import { NumFormatter } from "../general";
import BigNumber from "bignumber.js";
import { Ascension, FormattedStats, SaveGame } from "./types";

/*
    Szám formázása tagolással, 1e3 felett utótaggal,  1e68 felett tudományos jelöléssel
*/
export const numFormatter1: NumFormatter = (input) => {

    const number = Number(input)

    const suffixes = [
        { value: 1e63, symbol: "*" },
        { value: 1e60, symbol: "&" },
        { value: 1e57, symbol: "^" },
        { value: 1e54, symbol: "%" },
        { value: 1e51, symbol: "$" },
        { value: 1e48, symbol: "#" },
        { value: 1e45, symbol: "@" },
        { value: 1e42, symbol: "!" },
        { value: 1e39, symbol: "D" },
        { value: 1e36, symbol: "U" },
        { value: 1e33, symbol: "d" },
        { value: 1e30, symbol: "N" },
        { value: 1e27, symbol: "O" },
        { value: 1e24, symbol: "S" },
        { value: 1e21, symbol: "s" },
        { value: 1e18, symbol: "Q" },
        { value: 1e15, symbol: "q" },
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" }
    ];

    if (number >= 1e68) {
        const bigInt = new BigNumber(input)
        return bigInt.toExponential(3).replace("+", "")
    }

    const finded = suffixes.find((suffix, index) => {
        if (((number / suffix.value) >= 100) && ((number / suffix.value) < 100000)) {
            return true
        }
        if ((index === suffixes.length - 1) && number > 99999) {
            return true
        }

        return false
    })

    if (!finded) {
        return number.toLocaleString("en-us")
    }

    return Math.floor(number / Number(finded?.value)).toLocaleString("en-us") + finded?.symbol
}

/*
    Szám formázása mindig tudományos jelöléssel
*/
export const numFormatter2: NumFormatter = (input) => {
    const bigInt = new BigNumber(input)
    return bigInt.toExponential(3).replace("+", "")
}


export const durationCalc = (startTime: number, endTime: number) => {

    //differenc in milisec
    const difference = endTime - startTime;

    // differenc in sec, min, hour
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor(difference / 1000 / 60 / 60);

    // format result
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime
}


export const getStats = (saveGame: SaveGame): FormattedStats => {

    const currentAscensionId = saveGame.stats.currentAscension.id
    const currentTranscensionId = saveGame.stats.currentTranscension.id

    const currentAscension: Ascension = {
        ...saveGame.stats.currentAscension,
        heroSoulsEnd: saveGame.primalSouls,
        highestZoneEver: saveGame.highestFinishedZone,
        endTime: saveGame.unixTimestamp
    }

    saveGame.stats.currentAscension = currentAscension
    saveGame.stats.currentTranscension.ascensions[currentAscensionId] = currentAscension
    saveGame.stats.transcensions[currentTranscensionId].ascensions[currentAscensionId] = currentAscension

    const transcensions = Object.values(saveGame.stats.transcensions).map((transcension) => {
        return {
            ...transcension,
            ascensions: Object.values(transcension.ascensions).filter((ascension) => transcension.id === currentTranscensionId || ascension.highestZoneEver !== 0)
        }
    })

    return {
        currentAscension: saveGame.stats.currentAscension,
        currentTranscension: {
            ...saveGame.stats.currentTranscension,
            ascensions: Object.values(saveGame.stats.currentTranscension.ascensions),
        },
        transcensions: transcensions
    }

}