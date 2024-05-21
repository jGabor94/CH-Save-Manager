"use client"

import useSaveGames from "@/lib/hooks/useSaveGames";
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, } from "@mui/material";
import { FC, useState } from "react";
import SnackbarAlert, { SnackbarAlertData } from "../SnackbarAlert";
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ClearIcon from '@mui/icons-material/Clear';
import SA_DeleteSaveGame from "@/lib/actions/deleteSaveGame";
import Card from "../Card";


const List: FC<{}> = () => {

    const { saveGames, mutate } = useSaveGames()

    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)
    const [progress, setProgress] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setAlert({ severity: "info", content: "Mentés vágólapra másolva" })
    }

    const handleDelete = async (_id: string) => {
        setProgress(true)
        const res = await SA_DeleteSaveGame(_id)


        if (res.statusCode === 200) {
            mutate()
            setAlert({
                severity: "success", content: "Deletion successful"
            })
        } else {
            setAlert({ severity: "error", content: res.error })
        }

        setProgress(false)

    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Card title="List" >
            <TableContainer sx={{ width: "100%", height: "fit-content", maxHeight: 700 }}>
                <SnackbarAlert {...{ alert, setAlert }} />
                <Table aria-label="save game list" size="small" sx={{ borderSpacing: "0 0 !important" }}   >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Device</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {saveGames?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((save, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ padding: 1 }} align="center">
                                    {new Date(save.createdAt as string).toLocaleString(undefined, {
                                        dateStyle: "short",
                                        timeStyle: "short"
                                    })}
                                </TableCell>
                                <TableCell sx={{ padding: 1 }} align="center">{save.name}</TableCell>
                                <TableCell sx={{ padding: 1 }} align="center">
                                    <Stack direction="row" justifyContent="center" >
                                        <Tooltip title="Copy PC save">
                                            <IconButton size="small" onClick={() => handleCopy(save.pc)} sx={{ gap: 0.5 }}>
                                                <ComputerIcon fontSize="small" />
                                            </IconButton>
                                        </ Tooltip>
                                        <Tooltip title="Copy mobile save">
                                            <IconButton size="small" onClick={() => handleCopy(save.mobile)} sx={{ gap: 0.5 }}>
                                                <PhoneAndroidIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>

                                </TableCell>
                                <TableCell sx={{ padding: 1 }} >
                                    <Tooltip title="Delete">
                                        <IconButton size="small" onClick={() => handleDelete(save._id)} sx={{ gap: 0.5 }} disabled={progress}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={saveGames ? saveGames.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}

                />
            </TableContainer>

        </Card>

    )
}

export default List