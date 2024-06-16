"use client"

import { Divider, Link, Stack, Typography } from "@mui/material"
import { FC } from "react"
import Card from "../Card"

const Info: FC<{}> = () => {

    return (
        <Card title="Info">
            <Stack p={2} gap={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Outsider calculator:</Typography>
                    <Link href="https://driej.github.io/Clicker-Heroes-Outsiders/">Link</Link>
                </Stack>
                <Divider flexItem />
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Ancient calculator:</Typography>
                    <Link href="https://kepow.org/clickerheroes/">Link</Link>
                </Stack>
                <Divider flexItem />
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Subreddit:</Typography>
                    <Link href="https://www.reddit.com/r/ClickerHeroes/">Link</Link>
                </Stack>
                <Divider flexItem />
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Wiki:</Typography>
                    <Link href="https://clickerheroes.fandom.com/wiki/ClickerHeroes_Wiki">Link</Link>
                </Stack>
            </Stack>
        </Card>

    )
}

export default Info