"use client"

import SnackbarAlert, { SnackbarAlertData } from "@/components/SnackbarAlert";
import SA_CreateChangeLog from "@/lib/actions/createChangeLog";
import useChangeLogs from "@/lib/hooks/useChangeLogs";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { FC, Fragment, useState } from "react";


const ChangeLogForm: FC<{}> = () => {

    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)

    const { mutate } = useChangeLogs()

    const initFormikValues: { description: string, date: Dayjs } = { description: "", date: dayjs() }

    const formik = useFormik({
        initialValues: initFormikValues,
        onSubmit: async ({ description, date }, actions) => {
            actions.setSubmitting(true)

            const res = await SA_CreateChangeLog({
                description,
                date: date ? date.toISOString() : null
            })

            if (res.statusCode === 200) {
                setAlert({ severity: "success", content: "Log has been added" })
                formik.resetForm()
                mutate()
            } else {
                setAlert({ severity: "error", content: res.error })
            }

            actions.setSubmitting(false)

        },
    });

    const handleDateChange = (value: Dayjs | null) => {
        formik.setFieldValue("date", value)
    }

    return (
        <Fragment>
            <SnackbarAlert {...{ alert, setAlert }} />
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={1}>
                    <TextField id="description" label="description" size="small" multiline rows={3} onChange={formik.handleChange} value={formik.values.description} />
                    <DatePicker slotProps={{ textField: { size: 'small' } }} value={formik.values.date} onChange={handleDateChange} maxDate={dayjs()} />
                    <LoadingButton
                        loading={formik.isSubmitting}
                        loadingPosition="center"
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting || formik.values.description === ""}
                    >
                        Send
                    </LoadingButton>
                </Stack>
            </form>
        </Fragment>
    )
}

export default ChangeLogForm