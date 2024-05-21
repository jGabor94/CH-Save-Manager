"use client"

import SA_ConfigUpdate from "@/lib/actions/user/configUpdate";
import useColorMode from "@/lib/hooks/useColorMode";
import { ColorModeSwitch } from "@/lib/mui/styled"
import { useTheme } from "@mui/material";
import { FC, useEffect } from "react"


const DarkMode: FC<{}> = () => {

    const { palette } = useTheme();
    const { toggleColorMode } = useColorMode()

    const onChange = () => {
        toggleColorMode()
    }

    useEffect(() => {
        SA_ConfigUpdate({ theme: palette.mode })
    }, [palette])

    return <ColorModeSwitch checked={palette.mode === "dark" ? true : false} onChange={onChange} />

}

export default DarkMode