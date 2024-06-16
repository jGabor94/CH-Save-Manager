"use client"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";
import useConfig from "@/lib/hooks/useConfig";
import { FormattedStats } from "@/lib/assets/saveGame/types";
import { durationCalc } from "@/lib/assets/saveGame/other";

const Transcensions: FC<{ stats: FormattedStats }> = ({ stats }) => {

    const { numFormatter } = useConfig()

    return (
        <TableContainer sx={{ width: "100%", }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>HZE</TableCell>
                        <TableCell>HS Gained</TableCell>
                        <TableCell>Ascensions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.transcensions.map((transcension) => (
                        <TableRow key={transcension.id}>
                            <TableCell>
                                {transcension.id}
                            </TableCell>
                            <TableCell>
                                {durationCalc(transcension.startTime, transcension.endTime)}
                            </TableCell>
                            <TableCell>
                                {transcension.highestZoneEver}
                            </TableCell>
                            <TableCell>
                                {numFormatter(transcension.heroSoulsGained)}
                            </TableCell>
                            <TableCell>
                                {transcension.numAscensions}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Transcensions