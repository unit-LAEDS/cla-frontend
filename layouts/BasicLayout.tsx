import { DefaultHeader } from "@components/Header";
import { AppShell } from "@mantine/core";
import Head from "next/head";
import { ReactNode } from "react";

interface BasicLayoutInterface {
  title: string;
  description: string;
  icon?: string;
  children: ReactNode | ReactNode[];
}

const BasicLayout = ({
  children,
  icon = "/favicon.ico",
  ...props
}: BasicLayoutInterface) => {
  return (
    <AppShell header={<DefaultHeader />}>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href={icon} />
      </Head>
      {children}
    </AppShell>
  );
};

export { BasicLayout };
