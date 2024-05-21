"use client"

import SA_DeleteChangeLog from "@/lib/actions/deleteChangeLog"
import useChangeLogs from "@/lib/hooks/useChangeLogs"
import { CircularProgress, IconButton, Stack, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from "@mui/material"
import { FC, Fragment, useState } from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SnackbarAlert, { SnackbarAlertData } from "@/components/SnackbarAlert"
import { useSession } from "next-auth/react"
import { aclCheck } from "@/lib/services/authorization/aclAuthorization"

const ChangeLogList: FC<{}> = () => {

    const [isDelete, setIsDelete] = useState(false)
    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)

    const { changeLogs, mutate } = useChangeLogs()
    const { data: session } = useSession()


    const handleDelete = async (_id: string) => {

        setIsDelete(true)

        const res = await SA_DeleteChangeLog(_id)

        if (res.statusCode === 200) {
            mutate()
            setAlert({ severity: "success", content: "Deletion successful" })
        } else {
            setAlert({ severity: "error", content: res.error })
        }

        setIsDelete(false)

    }

    if (!changeLogs) return (
        <CircularProgress sx={{ margin: "auto auto" }} />
    )

    const isAdmin = session && aclCheck({ admin: true }, "create", session.user.roles)

    return (
        <Fragment>
            <SnackbarAlert {...{ alert, setAlert }} />
            <Table>
                <TableBody>
                    {changeLogs?.map(log => (
                        <TableRow key={log._id}>
                            <TableCell>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <Typography fontWeight={600}>
                                            {new Date(log.date).toLocaleDateString()}:
                                        </Typography>
                                        <Typography>
                                            {log.description}
                                        </Typography>
                                    </Stack>
                                    {isAdmin && (
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(log._id)} disabled={isDelete}>
                                                <HighlightOffIcon sx={{ cursor: "pointer", color: "text.secondary" }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

export default ChangeLogList