"use client"

import SA_ConfigUpdate from "@/lib/actions/user/configUpdate";
import { UserConfig } from "@/lib/database/types";
import useConfig from "@/lib/hooks/useConfig";
import { Checkbox } from "@mui/material";
import { FC } from "react"


const NumberFormatSwitch: FC<{}> = () => {

    const { userConfig, mutate } = useConfig();


    const handleChange = async () => {

        const newConfig: UserConfig = {
            ...userConfig,
            numberFormat: userConfig.numberFormat === "symbol" ? "scientific" : "symbol"
        }

        mutate({ ...newConfig }, {
            revalidate: false
        })

        await SA_ConfigUpdate(newConfig)
    }


    return <Checkbox
        checked={userConfig.numberFormat === "symbol" ? false : true}
        onChange={handleChange}
    />

}

export default NumberFormatSwitch