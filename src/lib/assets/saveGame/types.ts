import { ExpandObject } from "@/lib/types/types"

export interface Ascension {
    endTime: number,
    heroSoulsEnd: string,
    heroSoulsStart: string,
    highestZoneEver: number,
    id: number,
    startTime: number,
    transcensionId: number
}

export interface Transcension {
    ascensions: Ascensions,
    endTime: number,
    heroSoulsGained: string,
    highestZoneEver: number,
    id: number,
    numAscensions: number,
    startTime: number
}

export type Ascensions = { [key: string]: Ascension }
export type Transcensions = { [key: string]: Transcension }

export interface Stats {
    currentAscension: Ascension,
    currentTranscension: Transcension,
    transcensions: Transcensions
}

export interface SaveGame {
    currentZoneHeight: number,
    primalSouls: string,
    rubies: number,
    saveOrigin: "pc" | "mobile",
    readPatchNumber: string,
    stats: Stats,
    highestFinishedZone: number,
    unixTimestamp: number,
    heroSoulsSacrificed: string,
    highestGold: string,
    highestHistoricAncients: number,
    highestMercenaryLevelEver: number,
    maxDps: string,
    numUniqueDaysPlayed: number,
    numWorldResets: number,
    numberOfTranscensions: number,
    totalHeroLevels: number,
    totalHeroSouls: string,
    totalKills: number,
    totalBossKills: number,
    totalClicks: number,
    totalGold: number,
    totalRelicsReceived: number,
    email: string,
    treasureChestsKilled: number
}
export interface FormattedStats {
    currentAscension: Ascension,
    currentTranscension: Omit<Transcension, "ascensions"> & { ascensions: Array<Ascension> },
    transcensions: Array<ExpandObject<Omit<Transcension, "ascensions"> & { ascensions: Array<Ascension> }>>
}