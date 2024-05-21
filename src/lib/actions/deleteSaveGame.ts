"use server"

import { Session } from "next-auth"
import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { SaveGame } from "../database/models"
import { isLogged } from "../middlewares/ServerAction-Middlewares"
import { aclMiddlewareServerAction } from "../services/authorization/aclAuthorization"
import { AclCB } from "../services/authorization/types"

interface Request {
    params: [_id: string],
    session: Session
}

const getAcl: AclCB = async ({ params }: Request) => {
    const [_id] = params
    const res = await SaveGame.findOne({ _id })

    if (res?.acl) {
        return res.acl
    }

    return null
}

const SA_DeleteSaveGame = createServerAction(isLogged, aclMiddlewareServerAction(getAcl, "delete"), async ({ params }: Request) => {
    const [_id] = params
    await dbConnect()
    await SaveGame.deleteOne({ _id })
    return createServerActionResponse()
})



export default SA_DeleteSaveGame