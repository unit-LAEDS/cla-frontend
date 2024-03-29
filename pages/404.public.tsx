import Link from "next/link";

import { Player } from "@lottiefiles/react-lottie-player";

import { BasicLayout } from "layouts";
import { error404 } from "public";
import { Button, createStyles } from "@mantine/core";
import { NextPageWithLayout } from "./_app.public";

const Custom404: NextPageWithLayout = () => {
  const { classes } = useClasses();

  return (
    <section className={classes.section}>
      <Player
        autoplay
        loop
        src={error404}
        style={{
          maxHeight: "300px",
          height: "100%",
          maxWidth: "300px",
          width: "100%",
        }}
      />

      <h1>Ops! Parece que essa página ainda não existe :(</h1>
      <Link href="/">
        <Button variant="outline">Voltar para a home</Button>
      </Link>
    </section>
  );
};

const useClasses = createStyles(theme => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5rem",
  },
}));

Custom404.PageLayout = BasicLayout;

export default Custom404;
