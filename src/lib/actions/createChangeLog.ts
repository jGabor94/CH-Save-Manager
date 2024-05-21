"use server"

import { Session } from "next-auth"
import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { ChangeLog } from "../database/models"
import { isLogged } from "../middlewares/ServerAction-Middlewares"
import { aclMiddlewareServerAction } from "../services/authorization/aclAuthorization"

interface Request {
    params: [data: { description: string, date: Date | string | null }],
    session: Session
}

const SA_CreateChangeLog = createServerAction(isLogged, aclMiddlewareServerAction({ admin: true }, "create"), async ({ params, session }: Request) => {
    const [data] = params
    await dbConnect()
    await ChangeLog.create(data)
    return createServerActionResponse()
})

export default SA_CreateChangeLog