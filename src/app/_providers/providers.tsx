"use client";


import useConfig from "@/lib/hooks/useConfig";
import { RootTheme } from "@/lib/mui/themes";
import { ThemeMode } from "@/lib/types/types";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode, useMemo, useState } from "react";
import { SWRConfig, SWRConfiguration } from "swr";
import { ColorModeContext } from "./Context/context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


interface SWRProviderProps {
    value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration) | undefined;
    children: ReactNode
}

export const NextAuthProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <SessionProvider>{children}</SessionProvider>
)

export const SWRProvider: FC<SWRProviderProps> = ({ children, ...SWRConfigProps }) => (
    <SWRConfig {...SWRConfigProps}>{children}</SWRConfig>
)

export const DateTimePickerProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>
)

export const RootThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const userConfig = useConfig()

    const [mode, setMode] = useState<ThemeMode>(userConfig.theme)

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={RootTheme(mode)}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>

    )
}



