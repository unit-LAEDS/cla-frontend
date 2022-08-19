import ProfileContent from "@components/ProfileContent";
import { Container, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { NextPageWithLayout } from "@pages/_app.public";
import { BasicLayout } from "layouts";

const Profile: NextPageWithLayout = () => {
  const { classes } = useClasses();
  const matches = useMediaQuery("(min-width: 425px)", true, {
    getInitialValueInEffect: false,
  });

  const handleDataSaved = (value: boolean) => {
    if (value) {
      return showNotification({
        title: "Perfil atualizado",
        message: "Seus dados foram salvados com sucesso!",
        color: "green",
      });
    }

    showNotification({
      title: "Ops...",
      message: "Tivemos algum erro no servidor!",
      color: "red",
    });
  };

  return (
    <>
      {matches ? (
        <Container size={"md"} className={classes.container}>
          <ProfileContent dataSaved={handleDataSaved} />
        </Container>
      ) : (
        <ProfileContent dataSaved={handleDataSaved} />
      )}
    </>
  );
};

const useClasses = createStyles((theme, _params, getRef) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gap: "2rem",
    },
  },
}));

Profile.PageLayout = BasicLayout;

export default Profile;
