import { NumFormatter } from '@/lib/assets/general'
import { SaveGame } from '@/lib/assets/saveGame/types'
import useConfig from '@/lib/hooks/useConfig'
import { Divider, Stack, Typography } from '@mui/material'
import { FC } from 'react'

const getGeneralStats = (saveGame: SaveGame, saveName: string, numFormatter: NumFormatter) => {
    return {
        summary: [
            {
                key: "Mentés neve",
                value: saveName
            },
            {
                key: "Email",
                value: saveGame["email"]
            },
            {
                key: "Transcensions",
                value: saveGame["numberOfTranscensions"]
            },
            {
                key: "World resets",
                value: saveGame["numWorldResets"]
            },
            {
                key: "Days played",
                value: saveGame["numUniqueDaysPlayed"]
            },
            {
                key: "Rubies",
                value: saveGame["rubies"]
            },
        ],
        records: [
            {
                key: "HZE",
                value: saveGame["highestFinishedZone"]
            },
            {
                key: "Highest DPS",
                value: numFormatter(saveGame["maxDps"])
            },
            {
                key: "Highest gold",
                value: numFormatter(saveGame["highestGold"])
            },
            {
                key: "Highest mercenary level",
                value: saveGame["highestMercenaryLevelEver"]
            },

        ],
        other: [
            {
                key: "Total hero levels",
                value: saveGame["totalHeroLevels"]
            },
            {
                key: "Total herosouls",
                value: numFormatter(saveGame["totalHeroSouls"])
            },
            {
                key: "Total kills",
                value: saveGame["totalKills"]
            },
            {
                key: "Total boss kills",
                value: saveGame["totalBossKills"]
            },
            {
                key: "Total clicks",
                value: saveGame["totalClicks"]
            },
            {
                key: "Total gold",
                value: numFormatter(saveGame["totalGold"])
            },
            {
                key: "Total relics recieved",
                value: saveGame["totalRelicsReceived"]
            },
            {
                key: "Treasure chest killed",
                value: saveGame["treasureChestsKilled"]
            },
        ]
    }
}

const General: FC<{ saveGame: SaveGame, saveName: string }> = ({ saveGame, saveName }) => {

    const { numFormatter } = useConfig()
    const stats = getGeneralStats(saveGame, saveName, numFormatter)

    return (
        <Stack gap={1} sx={{ overflowY: "scroll", pr: 2 }}>
            <Typography fontWeight={600} fontSize={24}>
                Summary
            </Typography>
            {stats.summary.map(({ key, value }) => (
                <Stack key={key} direction="row" justifyContent="space-between" gap={2}>
                    <Typography fontWeight={600}>
                        {key}:
                    </Typography>
                    <Typography>
                        {value}
                    </Typography>
                </Stack>
            ))}

            <Divider flexItem />
            <Typography fontWeight={600} fontSize={24}>
                Records
            </Typography>
            {stats.records.map(({ key, value }) => (
                <Stack key={key} direction="row" justifyContent="space-between" gap={2}>
                    <Typography fontWeight={600}>
                        {key}
                    </Typography>
                    <Typography>
                        {value}
                    </Typography>
                </Stack>
            ))}
            <Divider flexItem />

            <Typography fontWeight={600} fontSize={24}>
                Other
            </Typography>
            {stats.other.map(({ key, value }) => (
                <Stack key={key} direction="row" justifyContent="space-between" gap={2}>
                    <Typography fontWeight={600}>
                        {key}
                    </Typography>
                    <Typography>
                        {value}
                    </Typography>
                </Stack>
            ))}

        </Stack>
    )
}

export default General