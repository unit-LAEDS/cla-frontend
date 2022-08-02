import { useMantineColorScheme } from "@mantine/core";
import { BasicLayout } from "layouts";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <BasicLayout
      title="CLA | LAEDS"
      description="Central das Ligas Acadêmicas | LAEDS"
    >
      <h1
        style={{
          color: dark ? "white" : "white",
        }}
      >
        {process.env.SECRET}
      </h1>
    </BasicLayout>
  );
};

export default Home;
