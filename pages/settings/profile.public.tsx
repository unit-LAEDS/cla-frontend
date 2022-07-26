import {
  Container,
  createStyles,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { BasicLayout } from "layouts";
import { Upload } from "tabler-icons-react";
import { SocialMediaFormList } from "./components/SocialMediaFormList";

const Profile = () => {
  const theme = useMantineTheme();
  const { classes } = useClasses();

  return (
    <BasicLayout
      title="CLA | Configurações | Perfil"
      description="Central das Ligas Acadêmicas | LAEDS"
    >
      <Container size={"md"} className={classes.container}>
        {/* <section>
          <SettingsNavigation />
        </section> */}
        <form className={classes.form}>
          <Paper className={classes.presentationCard} withBorder p={"lg"}>
            <Dropzone
              className={classes.presentationCardDropzone}
              radius={20}
              onDrop={files => console.log("accepted files", files)}
              onReject={files => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Stack align={"center"}>
                <Dropzone.Accept>
                  <IconUpload
                    size={50}
                    stroke={1.5}
                    color={
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={50}
                    stroke={1.5}
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Stack align={"center"}>
                    <IconPhoto size={50} stroke={1.5} />
                    <Text>Foto de Perfil</Text>
                  </Stack>
                </Dropzone.Idle>
              </Stack>
            </Dropzone>
            <div className={classes.presentationCardInputs}>
              <TextInput label="Nome" required />
              <Textarea label="Bio" required />
            </div>
          </Paper>

          <Paper className={classes.socialMediaLinks} withBorder p={"lg"}>
            <SocialMediaFormList />
          </Paper>
        </form>
      </Container>
    </BasicLayout>
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

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
  },

  presentationCard: {
    width: "100%",
    // height: "20rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1rem",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
      gap: "2rem",

      [`& .${getRef("presentationCardDropzone")}`]: {
        width: "20rem",
        // alignSelf: "flex-start",
      },

      [`& .${getRef("presentationCardInputs")}`]: {
        width: "100%",
      },
    },
  },

  presentationCardDropzone: {
    ref: getRef("presentationCardDropzone"),
    width: "20rem",
  },

  presentationCardInputs: {
    ref: getRef("presentationCardInputs"),
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },

  socialMediaLinks: {},
}));

export default Profile;
