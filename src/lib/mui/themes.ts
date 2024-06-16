'use client'

import { Theme, createTheme } from "@mui/material/styles"
import { NotoSans } from "./fonts"
import { ThemeMode } from "../database/types";

export const RootTheme = (mode: ThemeMode) => createTheme({
    typography: {
        fontFamily: NotoSans.style.fontFamily,
    },
    palette: {
        mode,
        ...(mode === "light" ? {
            primary: {
                main: "#fda502",
                light: "#a094ee",
                dark: "#2f2750",
                contrastText: '#F3F3F3'
            },
            background: {
                paper: "#FFFFFF",
                default: "#f7f7f7"
            }
        } : {
            primary: {
                main: "#fda502",
                light: "#7a6dcf",
                dark: "#483a81",
                contrastText: '#F3F3F3'
            },
            background: {
                paper: "#2c2c2c",
                default: "#262626"
            },
        })

    },
    components: {
        MuiLink: {
            defaultProps: {
                target: "blank",
                color: "inherit"
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.spacing(1),
                    fontSize: 12,
                    fontFamily: NotoSans.style.fontFamily,
                    fontWeight: 600
                })
            },
            variants: [
                {
                    props: { variant: "outlined" },
                    style: ({ theme }) => ({
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.text.primary,
                        '&:hover': {
                            color: theme.palette.text.primary,
                            borderColor: theme.palette.text.primary
                        },
                    })
                },
            ]
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& label.Mui-focused': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                    }
                })
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                })
            }
        },

    },

});


export const FooterTheme = (theme: Theme) => createTheme({
    ...theme,
    components: {
        MuiTypography: {
            styleOverrides: {
                root: () => ({
                    fontSize: 14,
                    color: theme.palette.text.secondary
                })
            }
        },
        MuiLink: {
            styleOverrides: {
                root: () => ({
                    color: theme.palette.text.secondary,
                    textDecorationColor: theme.palette.text.secondary
                })
            },
            defaultProps: {
                target: "blank",
            },
        },
    }


})
