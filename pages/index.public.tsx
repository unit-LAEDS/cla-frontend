import { useMantineColorScheme } from "@mantine/core";
import { BasicLayout } from "layouts";
import type { NextPage } from "next";
import { NextPageWithLayout } from "./_app.public";

const Home: NextPageWithLayout = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <h1
        style={{
          color: dark ? "white" : "white",
        }}
      >
        {process.env.SECRET}
      </h1>
    </>
  );
};

Home.PageLayout = BasicLayout;

export default Home;
