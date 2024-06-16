"use client"

import SA_ConfigUpdate from "@/lib/actions/user/configUpdate";
import { toggleColorMode } from "@/lib/assets/general";
import { UserConfig } from "@/lib/database/types";
import useConfig from "@/lib/hooks/useConfig";
import { ColorModeSwitch } from "@/lib/mui/styled"
import { FC } from "react"


const DarkModeSwitch: FC<{}> = () => {

    const { userConfig, mutate } = useConfig();


    const handleChange = async () => {

        const newConfig: UserConfig = {
            ...userConfig,
            theme: toggleColorMode(userConfig.theme)
        }

        mutate({ ...newConfig }, {
            revalidate: false
        })

        await SA_ConfigUpdate(newConfig)
    }


    return <ColorModeSwitch
        checked={userConfig.theme === "dark" ? true : false}
        onChange={handleChange}
    />

}

export default DarkModeSwitch