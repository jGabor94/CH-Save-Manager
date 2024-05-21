import MenuBar from "@/components/menuBar/MenuBar";
import { Stack } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Fragment>
            <MenuBar height={80} />
            <Stack alignItems="center" sx={{ width: "100%" }} p={2}>
                {children}
            </Stack>
        </Fragment>
    );
}

export default Layout