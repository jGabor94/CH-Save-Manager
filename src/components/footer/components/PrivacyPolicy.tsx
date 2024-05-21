"use client"

import { FC, Fragment, useState } from "react"
import { Box, Divider, Link, Modal, Paper, Stack, Typography } from "@mui/material";
import Contact from "./Contact";



const PrivacyPolicy: FC<{}> = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content" }}>Privacy policy</Link>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    maxWidth: "95%",
                    outline: "none",
                }}>
                    <Stack gap={2} sx={{
                        p: 2,
                        height: 600,
                        overflowY: "scroll",
                    }}>


                        <Typography fontWeight={600} fontSize={25}>Privacy Policy</Typography>

                        <Divider flexItem />

                        Welcome to this website! Below we outline our privacy practices in detail to help you understand how we handle and protect the personal information you share with us.

                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>1. Collected Information</Typography>
                            <Typography>

                                When you visit this website or register through it, we may ask for certain personal data from you, such as your name, email address, etc. We collect this data solely for the purpose of providing our services.
                            </Typography>

                        </Stack>

                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>2. Data Management and Security</Typography>
                            <Typography>

                                We securely store the personal data you share with us, and only our employees who need access to it for the purpose of providing services can access it. We take every step to protect the data and do not share it with third parties unless required by law or regulatory requirements.
                            </Typography>

                        </Stack>
                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>3. Cookies and Tracking Technologies</Typography>
                            <Typography>

                                This website may use cookies and other tracking technologies to operate the site and improve the user experience. These cookies are used solely to store basic session or logged-in user data and to ensure the proper functioning of the site.
                            </Typography>

                        </Stack>
                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>4. Data Sharing</Typography>
                            <Typography>

                                We do not share the personal information you provide with third parties unless you expressly consent to it or unless required by law.
                            </Typography>

                        </Stack>
                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>5. User Rights</Typography>
                            <Typography>

                                Customers have the right to access the personal data they provide, as well as request its modification or deletion. They also have the right to refuse access to their data and to impose restrictions on the processing of their data.
                            </Typography>

                        </Stack>
                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>6. Contact</Typography>
                            <Stack gap={1}>
                                <Typography>
                                    If you have any questions or concerns about privacy, please contact us at one of the following:
                                </Typography>
                                <Contact />
                            </Stack>

                        </Stack>

                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>7. Updates</Typography>
                            <Typography>
                                This privacy policy may be updated from time to time to reflect changes in our practices or legal requirements. Please visit this page regularly to stay informed about our privacy practices.
                            </Typography>

                        </Stack>
                    </Stack>

                </Box>

            </Modal>
        </Fragment>

    )

}

export default PrivacyPolicy