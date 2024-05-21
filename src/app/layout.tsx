import type { Metadata } from "next";
import { DateTimePickerProvider, NextAuthProvider, RootThemeProvider } from "./_providers/providers";
import ConfigProvider from "./_providers/ConfigProvider/ConfigProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline } from "@mui/material";
import { auth } from "@/lib/services/authentication/auth";
import { FC, ReactNode } from "react";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "CH Save Manager",
  description: " Store your saves in the cloud to access them from any device. You can later download the game files to any platform.",
  creator: 'Jakucs Gábor',
  referrer: 'no-referrer',
  keywords: ['clicker', 'heroes', 'save', "manager", "mobile", "pc", "converter"],
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

const RootLayout: FC<{
  guest: ReactNode
  main: ReactNode
}> = async ({ guest, main }) => {

  const session = await auth()

  return (
    <html lang="en">
      <NextAuthProvider>
        <ConfigProvider>
          <RootThemeProvider>
            <DateTimePickerProvider>
              <body>
                <AppRouterCacheProvider>
                  <CssBaseline />
                  {session === null ? guest : main}
                  <Footer />
                </AppRouterCacheProvider>
              </body>
            </DateTimePickerProvider>
          </RootThemeProvider>
        </ConfigProvider>
      </NextAuthProvider>
    </html>
  );
}

export default RootLayout