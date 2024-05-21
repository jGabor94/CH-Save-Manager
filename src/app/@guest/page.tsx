import { Alert, AlertTitle, Box, Link, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Page: FC<{}> = () => {
    return (
        <Fragment>
            <Stack sx={{ width: "100%", height: "80vh", position: "relative" }} alignItems="center" justifyContent="center" gap={3}>
                <Stack alignItems="center">
                    <Box component="img" src="/ch_logo.png" sx={{ height: 120 }} />
                    <Typography sx={{ fontWeight: 800, fontSize: 25 }}>Clicker Heroes Save Manager</Typography>
                </Stack>
                <Typography sx={{ textAlign: "center" }}>
                    Store your saves in the cloud to access them from any device. You can later download the game files to any platform.
                </Typography>
                <GoogleSignInButton />
                <Alert severity="warning">
                    <AlertTitle>Attention</AlertTitle>
                    Using the website is technically considered cheating.
                </Alert>
                <Stack direction="row" sx={{ position: "absolute", bottom: "20px", right: "20px" }} gap={1}>
                    <GitHubIcon />
                    <Typography>Source code: <Link href="https://github.com/jGabor94/PuzzleGallery">PuzzleGallery repository</Link></Typography>
                </Stack>
            </Stack>
        </Fragment>
    )
}

export default Page