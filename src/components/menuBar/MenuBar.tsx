import { Box, Stack, Typography } from "@mui/material"
import { FC } from "react";
import Settings from "./components/Settings";

interface MenuBarProps {
    height: number
}

const MenuBar: FC<MenuBarProps> = async ({ height }) => {
    return (
        <Box sx={{ height, zIndex: 10 }}>
            <Box sx={{
                zIndex: 10,
                height,
                borderBottomStyle: "solid",
                borderBottomWidth: "2px",
                borderBottomColor: "text.secondary",
                backgroundColor: "background.default",
                width: "100%",
                position: "fixed",
                pr: 3,
                pl: 3
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height, width: 1000, maxWidth: "100%", margin: "0 auto" }}>
                    <Stack direction="row" gap={1} alignItems="center">
                        <Box component="img" src="/favicon.png" sx={{ height: 60 }} />
                        <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                            CH Save Manager
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={1}>
                        <Settings />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default MenuBar