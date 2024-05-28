import { Box, Divider, Link, Stack, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { FooterTheme } from "@/lib/mui/themes";
import PrivacyPolicy from "./components/PrivacyPolicy";
import GitHubIcon from '@mui/icons-material/GitHub';
import ChangeLog from "./components/changeLog/ChangeLog";

const Footer: FC<{}> = () => {
    return (
        <ThemeProvider theme={FooterTheme}>
            <Divider sx={{ width: "100%" }} />
            <Stack direction="row" gap={2} justifyContent="center" p={4} flexWrap="wrap">
                <PrivacyPolicy />
                <Divider flexItem orientation="vertical" />
                <ChangeLog />
                <Divider flexItem orientation="vertical" />
                <Stack direction="row" gap={0.5} alignItems="center">
                    <Box component="img" src="/game_favicon.png" sx={{ width: 15 }} />
                    <Link href="https://clickerheroes.com/">Game</Link>
                </Stack>
                <Divider flexItem orientation="vertical" />
                <Stack direction="row" gap={0.5} alignItems="center">
                    <GitHubIcon sx={{ width: 20 }} />
                    <Link href="https://github.com/jGabor94/CH-Save-Manager">Source code</Link>
                </Stack>
            </Stack>
        </ThemeProvider >
    )
}

export default Footer