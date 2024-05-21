import mongoose, { Model } from 'mongoose';
import { Mongoose_Account, Mongoose_ChangeLog, Mongoose_SaveGame, Mongoose_User, accountSchema, changeLogSchema, saveGameSchema, userSchema } from './mongooseSchema';


export const User: Model<Mongoose_User> = mongoose.models.User || mongoose.model<Mongoose_User>('User', userSchema)
export const Account: Model<Mongoose_Account> = mongoose.models.Account || mongoose.model<Mongoose_Account>('Account', accountSchema)
export const SaveGame: Model<Mongoose_SaveGame> = mongoose.models.SaveGame || mongoose.model('SaveGame', saveGameSchema)
export const ChangeLog: Model<Mongoose_ChangeLog> = mongoose.models.ChangeLog || mongoose.model('ChangeLog', changeLogSchema)


