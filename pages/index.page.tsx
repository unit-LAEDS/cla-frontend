import { Teste } from "@components/Teste";
import { Button, TextInput } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CLA | LAEDS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Teste />
    </div>
  );
};

export default Home;