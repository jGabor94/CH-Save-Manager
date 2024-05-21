import { createContext } from "react";
import { IColorModeContext, IConfigContext } from "./types";

export const ColorModeContext = createContext<IColorModeContext>({} as IColorModeContext);
export const ConfigContext = createContext<IConfigContext>({} as IConfigContext);
