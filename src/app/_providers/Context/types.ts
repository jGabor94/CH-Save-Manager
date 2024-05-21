import { ThemeMode } from "@/lib/types/types";

export interface IColorModeContext {
    toggleColorMode: () => void,
}

export interface IConfigContext {
    theme: ThemeMode,
}