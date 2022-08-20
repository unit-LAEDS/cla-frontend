import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext, NextPage } from "next";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { UserProvider } from "context";
import { ModalsProvider } from "@mantine/modals";

export type NextPageWithLayout = NextPage & {
  PageLayout?: React.ElementType;
};

type ComponentWithPageLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(
  props: ComponentWithPageLayout & { colorScheme: ColorScheme }
) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");

    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  useEffect(() => {
    let mantineColorScheme = getCookie("mantine-color-scheme") || "light";

    setColorScheme(mantineColorScheme as ColorScheme);
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <NotificationsProvider>
              <UserProvider>
                {Component.PageLayout ? (
                  <Component.PageLayout>
                    <Component {...pageProps} />
                  </Component.PageLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </UserProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}
