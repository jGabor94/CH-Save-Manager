"use server"

import { auth } from "@/lib/services/authentication/auth";
import Provider from "./Provider";
import { User } from "@/lib/database/models";
import { dbConnect } from "@/lib/database/dbConnect";
import React, { FC, ReactNode } from "react";
import { UserConfig } from "@/lib/database/mongooseSchema";
import { toSerializableObject } from "@/lib/assets/assets";



const ConfigProvider: FC<{ children: ReactNode }> = async ({ children }) => {

    const session = await auth()

    let config: UserConfig = { theme: "light" }

    if (session) {

        await dbConnect()
        const user = await User.findOne({ _id: session.user._id }).populate("config")
        if (user) config = user.config
    }

    return (
        <Provider config={toSerializableObject(config)} >
            {children}
        </Provider>
    )
}

export default ConfigProvider

