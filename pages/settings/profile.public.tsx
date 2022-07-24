import {
  Avatar,
  Container,
  createStyles,
  Group,
  MantineTheme,
  Paper,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ContainerEnum } from "global";
import { BasicLayout } from "layouts";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { SocialMediaFormList } from "./components/SocialMediaFormList";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <>
    <Group align={"center"} direction={"column"}>
      <ImageUploadIcon
        status={status}
        style={{ color: getIconColor(status, theme) }}
        size={80}
      />
      <Text>Foto de Perfil</Text>
    </Group>
  </>
);

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
              {status => dropzoneChildren(status, theme)}
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
    width: "30%",
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
