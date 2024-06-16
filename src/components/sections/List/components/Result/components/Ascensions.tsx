"use client"

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, duration } from "@mui/material";
import { FC, Fragment, useState } from "react";
import useConfig from "@/lib/hooks/useConfig";
import { FormattedStats } from "@/lib/assets/saveGame/types";
import { durationCalc } from "@/lib/assets/saveGame/other";

const Ascensions: FC<{ stats: FormattedStats }> = ({ stats }) => {

    const [selectedTranscension, setSelectedTranscension] = useState(stats.currentTranscension)
    const { numFormatter } = useConfig()

    const handleChange = (e: SelectChangeEvent) => {
        const transcension = stats.transcensions.find(transcension => transcension.id === Number(e.target.value))
        setSelectedTranscension(transcension ? transcension : stats.currentTranscension);
    };

    return (
        <Fragment>
            <FormControl size="small">
                <InputLabel>Transcensions</InputLabel>
                <Select
                    value={selectedTranscension.id.toString()}
                    label="Transcensions"
                    onChange={handleChange}
                >
                    {stats.transcensions.map((transcension) => (
                        <MenuItem key={transcension.id} value={transcension.id}>{transcension.id} | HZE: {transcension.highestZoneEver}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer sx={{ width: "100%", }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>HZE</TableCell>
                            <TableCell>HS Gained</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedTranscension.ascensions.map((ascension) => (
                            <TableRow key={ascension.id}>
                                <TableCell>
                                    {ascension.id}
                                </TableCell>
                                <TableCell>
                                    {durationCalc(ascension.startTime, ascension.endTime)}
                                </TableCell>
                                <TableCell>
                                    {ascension.highestZoneEver}
                                </TableCell>
                                <TableCell>
                                    {numFormatter(ascension.heroSoulsEnd)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default Ascensions