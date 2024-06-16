import mongoose, { Schema } from 'mongoose';
import { Mongoose_Account, Mongoose_ChangeLog, Mongoose_SaveGame, Mongoose_User } from './types';

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
        numberFormat: {
            type: String,
            enum: ['symbol', 'scientific'],
            default: 'symbol'
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

