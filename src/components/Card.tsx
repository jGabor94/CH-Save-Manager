import { Paper, PaperProps, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props extends PaperProps {
    children: ReactNode,
    title?: string,
}

const Card: FC<Props> = ({ children, title, ...rest }) => {

    return (
        <Paper {...rest}>
            {title && (
                <Typography sx={{ backgroundColor: "primary.main", p: 1, color: "#fff" }}>
                    {title}
                </Typography>
            )}
            {children}
        </Paper>
    )
}

export default Card