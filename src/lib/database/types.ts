import { SchemaTimestampsConfig, Types } from "mongoose"
import { ExpandObject } from "../types/types";
import { Acl } from "../services/authorization/types";

export type ThemeMode = "light" | "dark"
export type NumberFormat = "symbol" | "scientific"

export interface UserConfig {
    theme: ThemeMode,
    numberFormat: NumberFormat
}

export type Mongoose_User = {
    _id: Types.ObjectId,
    username: string,
    password: string,
    email: string,
    name: string,
    roles: any[],
    config: UserConfig,
    emailVerified: Date | null
} & SchemaTimestampsConfig

export type Mongoose_Account = {
    _id: Types.ObjectId,
    userId: string,
    type: string,
    provider: string,
    providerAccountId: string,
    refresh_token: string,
    access_token: string,
    expires_at: number,
    token_type: string,
    scope: string,
    id_token: string,
    session_state: string,
} & SchemaTimestampsConfig

export type Mongoose_SaveGame = {
    _id: Types.ObjectId,
    pc: string,
    mobile: string,
    userid: Types.ObjectId,
    name: string,
    acl: Acl
} & SchemaTimestampsConfig

export type Mongoose_ChangeLog = {
    _id: Types.ObjectId,
    date: Date,
    description: string
} & SchemaTimestampsConfig

export type Mongoose_User_Serializable = ExpandObject<Omit<Mongoose_User, "_id"> & {
    _id: string,
}>

export type Mongoose_SaveGame_Serializable = ExpandObject<Omit<Mongoose_SaveGame, "userid" | "_id"> & {
    _id: string,
    userid: string,
}>

export type Mongoose_ChangeLog_Serializable = ExpandObject<Omit<Mongoose_ChangeLog, "_id"> & {
    _id: string,
}>