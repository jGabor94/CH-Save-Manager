"use server"

import { Session } from "next-auth"
import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { SaveGame } from "../database/models"
import { isLogged } from "../middlewares/ServerAction-Middlewares"
import { convert } from "../assets/saveGame/converter"
import { saveGameAcl } from "../services/authorization/acl"

interface Request {
    params: [data: { saveGame: string, name: string }],
    session: Session
}


const SA_CreateSaveGame = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [data] = params
    const convertResult = convert(data.saveGame)
    await dbConnect()

    await SaveGame.create({
        pc: convertResult.from === "pc" ? data.saveGame : convertResult.data,
        mobile: convertResult.from === "mobile" ? data.saveGame : convertResult.data,
        name: data.name,
        userid: session.user._id,
        acl: { ...saveGameAcl, [session.user.username]: true }
    })

    return createServerActionResponse({ payload: convertResult })
})



export default SA_CreateSaveGame