"use client"

import useSWR from "swr"
import SA_GetSaveGames from "../actions/getSaveGames"

export default function useSaveGames() {

    const { data: saveGames, mutate, isLoading } = useSWR("saveGames", async (key) => {
        const res = await SA_GetSaveGames()
        return res.payload
    }, { revalidateOnMount: false })

    return { saveGames, mutate, isLoading }

} 