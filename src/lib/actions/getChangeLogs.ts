"use server"

import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { ChangeLog } from "../database/models"
import { Mongoose_ChangeLog_Serializable } from "../database/mongooseSchema"
import { toSerializableObject } from "../assets/assets"

const SA_GetChangeLogs = createServerAction(async () => {
    await dbConnect()
    const res = await ChangeLog.find().sort({ _id: -1 })
    return createServerActionResponse({ payload: toSerializableObject<Mongoose_ChangeLog_Serializable[]>(res) })
})

export default SA_GetChangeLogs
