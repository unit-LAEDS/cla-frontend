import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider emotionOptions={{ key: "mantine", prepend: false }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
