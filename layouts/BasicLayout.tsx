import { DefaultHeader } from "@components/Header";
import { AppShell } from "@mantine/core";
import Head from "next/head";
import { ReactNode } from "react";

interface BasicLayoutInterface {
  children: ReactNode | ReactNode[];
}

const BasicLayout = ({ children }: BasicLayoutInterface) => {
  return (
    <AppShell fixed={false} header={<DefaultHeader />}>
      <Head>
        <title>CLA | LAEDS</title>
        <meta
          name="description"
          content="Central das Ligas Acadêmicas | LAEDS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </AppShell>
  );
};

export { BasicLayout };
