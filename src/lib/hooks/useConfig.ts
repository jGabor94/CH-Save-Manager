"use client"

import useSWR from "swr"
import SA_GetUserConfig from "../actions/user/getUserConfig"
import { useEffect, useState } from "react"
import { numFormatter1, numFormatter2 } from "../assets/saveGame/other"
import { UserConfig } from "../database/types"

const useConfig = () => {

    const { data, mutate, isLoading, error } = useSWR("userConfig", async () => {
        const res = await SA_GetUserConfig()
        return res.payload
    }, { revalidateOnFocus: false, revalidateOnMount: false })

    const [userConfig, setUserConfig] = useState<UserConfig>(data ? data : {
        theme: "light",
        numberFormat: "symbol"
    }
    )

    useEffect(() => {
        if (data) setUserConfig(data)
    })

    return {
        userConfig,
        numFormatter: userConfig.numberFormat === "symbol" ? numFormatter1 : numFormatter2,
        mutate,
        error,
        isLoading
    }
}
export default useConfig
