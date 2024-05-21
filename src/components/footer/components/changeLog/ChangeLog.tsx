"use client"

import { FC, Fragment, useState } from "react"
import { Box, Divider, Link, Modal, Paper, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { aclCheck } from "@/lib/services/authorization/aclAuthorization";
import ChangeLogForm from "./ChangeLogForm";
import ChangeLogList from "./ChangeLogList";

const ChangeLog: FC<{}> = () => {

    const { data: session } = useSession()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isAdmin = session && aclCheck({ admin: true }, "create", session.user.roles)

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content" }}>Change log</Link>
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
                    <Stack gap={2} sx={{
                        p: 2,
                        height: 600,
                        overflowY: "scroll",
                        boxSizing: "border-box"
                    }}>
                        <Typography fontWeight={600} fontSize={25}>Change log</Typography>
                        <Divider flexItem />
                        {isAdmin && (<ChangeLogForm />)}
                        <ChangeLogList />
                    </Stack>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default ChangeLog