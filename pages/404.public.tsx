import Link from "next/link";

import { Player } from "@lottiefiles/react-lottie-player";

import { BasicLayout } from "layouts";
import { error404 } from "public";
import { Button, createStyles } from "@mantine/core";

export default function Custom404() {
  const { classes } = useClasses();

  return (
    <BasicLayout
      title="CLA | LAEDS"
      description="Central das Ligas Acadêmicas | LAEDS"
    >
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
          <Button variant="outline">Voltar para o inicio</Button>
        </Link>
      </section>
    </BasicLayout>
  );
}

const useClasses = createStyles(theme => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5rem",
  },
}));
