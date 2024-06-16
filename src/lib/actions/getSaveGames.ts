"use server"

import { Session } from "next-auth"
import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { SaveGame } from "../database/models"
import { isLogged } from "../middlewares/ServerAction-Middlewares"
import { toSerializableObject } from "../assets/general"
import { Mongoose_SaveGame_Serializable } from "../database/types"

interface Request {
    session: Session
}

const SA_GetSaveGames = createServerAction(isLogged, async ({ session }: Request) => {
    await dbConnect()
    const res = await SaveGame.find({ userid: session.user._id }).sort({ _id: -1 })
    return createServerActionResponse({ payload: toSerializableObject<Mongoose_SaveGame_Serializable[]>(res) })
})



export default SA_GetSaveGames
