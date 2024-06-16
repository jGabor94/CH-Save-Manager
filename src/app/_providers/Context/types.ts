import { ThemeMode } from "@/lib/database/types";

export interface IColorModeContext {
    toggleColorMode: () => void,
}

export interface IConfigContext {
    theme: ThemeMode,
}