"use client"

import { Box, CircularProgress, Divider, IconButton, Modal, Paper, Stack, Tab, Tabs, Tooltip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { decode_Client } from "@/lib/assets/saveGame/clientDecode";
import Ascensions from "./components/Ascensions";
import General from "./components/General";
import Transcensions from "./components/Transcensions";
import { SaveGame } from "@/lib/assets/saveGame/types";
import { getStats } from "@/lib/assets/saveGame/other";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Fragment>
            {value === index && children}
        </Fragment>
    );
}

const Statistics: FC<{ rawSaveGame: string, saveName: string }> = ({ rawSaveGame, saveName }) => {


    const [saveGame, setSaveGame] = useState<null | SaveGame>(null)
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const handleOpen = async () => {
        setOpen(true)
        const saveGame = await decode_Client(rawSaveGame)
        setSaveGame(saveGame)
    };
    const handleClose = () => {
        setTabValue(0)
        setOpen(false)
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const stats = saveGame && getStats(saveGame)

    return (
        <Fragment>
            <Tooltip title="Statistics">
                <IconButton size="small" onClick={handleOpen}>
                    <SignalCellularAltIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    maxWidth: "95%",
                    outline: "none",
                }}>

                    <Stack gap={2} p={2} height={600}>
                        {!stats ? (
                            <CircularProgress />
                        ) : (
                            <Fragment>
                                <Tabs value={tabValue} onChange={handleTabChange}>
                                    <Tab label="General" />
                                    <Tab label="Ascensions" />
                                    <Tab label="Transcensions" />
                                </Tabs>
                                <Divider flexItem />
                                <CustomTabPanel value={tabValue} index={0}>
                                    <General saveGame={saveGame} saveName={saveName} />
                                </CustomTabPanel>
                                <CustomTabPanel value={tabValue} index={1}>
                                    <Ascensions stats={stats} />
                                </CustomTabPanel>
                                <CustomTabPanel value={tabValue} index={2}>
                                    <Transcensions stats={stats} />
                                </CustomTabPanel>
                            </Fragment>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </Fragment>

    )
}

export default Statistics