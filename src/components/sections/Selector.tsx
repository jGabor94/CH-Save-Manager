"use client"

import { Divider, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import SA_CreateSaveGame from "@/lib/actions/createSaveGame";
import useSaveGames from "@/lib/hooks/useSaveGames";
import { useFormik } from "formik";
import SnackbarAlert, { SnackbarAlertData } from "../SnackbarAlert";
import Card from "../Card";
import UploadButton from "../UploadButton";
import { LoadingButton } from "@mui/lab";

const Selector: FC<{}> = () => {

    const { mutate } = useSaveGames()

    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)


    const initFormikValues: { saveGame: string, name: string } = { saveGame: "", name: "" }

    const formik = useFormik({
        initialValues: initFormikValues,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)

            const res = await SA_CreateSaveGame(values)

            if (res.statusCode === 200) {
                setAlert({ severity: "success", content: "Save success" })
                formik.resetForm()
                mutate()
            } else {
                setAlert({ severity: "error", content: res.error })
            }

            actions.setSubmitting(false)



        },
    });


    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            formik.setFieldValue("name", e.target.files[0].name.split(".")[0])

            formik.setFieldValue("saveGame", await e.target.files[0].text())
        }
    }

    return (
        <Card title="Data">
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={2} p={2} >
                    <SnackbarAlert {...{ alert, setAlert }} />
                    <UploadButton onChange={handleFileChange}>Select file</UploadButton>
                    <Divider flexItem orientation="horizontal">Or</Divider>
                    <TextField id="saveGame" label='Paste save game' multiline rows={5} onChange={formik.handleChange} value={formik.values.saveGame} />
                    <TextField id="name" label='Save name' size="small" onChange={formik.handleChange} value={formik.values.name} />
                    <LoadingButton
                        loading={formik.isSubmitting}
                        loadingPosition="center"
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting || formik.values.saveGame === ""}
                    >
                        Add
                    </LoadingButton>
                </Stack>
            </form>
        </Card>

    )
}

export default Selector