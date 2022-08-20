import ProfileContent from "@components/ProfileContent";
import {
  Box,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "context";
import { useRouter } from "next/router";
import { useContext } from "react";

const CreateProfile = () => {
  const { classes } = useClasses();

  return (
    <Container size={"md"} className={classes.container}>
      <PageContent />
    </Container>
  );
};

const PageContent = () => {
  const { reloadSession } = useContext(UserContext);
  const { push } = useRouter();

  const handleDataSaved = (value: boolean) => {
    if (value) {
      showNotification({
        title: "Perfil criado com sucesso 😎",
        message: "Você será redirecionado!",
      });

      reloadSession();

      return setTimeout(() => push("/"), 1000);
    }

    showNotification({
      title: "Ops...",
      message: "Tivemos algum erro no servidor!",
      color: "red",
    });
  };

  return (
    <>
      <Box mb={20}>
        <Title order={2}>Antes de continuar...</Title>
        <Text>Escreva um pouco mais sobre você 🙂</Text>
      </Box>
      <ProfileContent dataSaved={handleDataSaved} />
    </>
  );
};

const useClasses = createStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gap: "2rem",
    },
  },
}));

export default CreateProfile;
