"use client"

import { Button, ButtonProps } from "@mui/material"
import { ChangeEventHandler, FC } from "react"

interface Props extends Omit<ButtonProps, "onChange"> {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const UploadButton: FC<Props> = ({ onChange, ...buttonProps }) => {
    return (
        <Button component="label" aria-label="add" variant="outlined" {...buttonProps} sx={{ gap: 1, ...buttonProps.sx }}>
            {buttonProps.children}
            <input hidden id="image" type="file" accept=".txt" onChange={onChange} />
        </Button>
    )
}

export default UploadButton