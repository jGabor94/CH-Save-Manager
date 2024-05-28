import mongoose, { Schema, SchemaTimestampsConfig, Types } from 'mongoose';
import { ExpandObject, ThemeMode } from '../types/types';
import { Acl } from '../services/authorization/types';

export interface UserConfig {
    theme: ThemeMode,
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


export const userSchema: Schema = new mongoose.Schema<Mongoose_User>({
    username: String,
    password: { type: String, default: "" },
    email: String,
    name: { type: String, default: "" },
    emailVerified: { type: Date, default: null },
    roles: [],
    config: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
    },
}, { timestamps: true })



export const accountSchema = new mongoose.Schema<Mongoose_Account>({
    userId: String,
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
})

export const saveGameSchema = new mongoose.Schema<Mongoose_SaveGame>({
    pc: String,
    mobile: String,
    name: String,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    acl: {}
}, { timestamps: true })

export const changeLogSchema = new mongoose.Schema<Mongoose_ChangeLog>({
    date: {
        type: Date,
        default: () => new Date(Date.now())
    },
    description: String,
}, { timestamps: true })

