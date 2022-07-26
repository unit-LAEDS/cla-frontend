import {
  Button,
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
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import RichTextEditor from "components/RichText";
import { BasicLayout } from "layouts";
import React, { useState } from "react";
import { SocialMediaFormList } from "./components/SocialMediaFormList";

const Profile = () => {
  const { classes } = useClasses();
  const matches = useMediaQuery("(min-width: 425px)");

  return (
    <BasicLayout
      title="CLA | Configurações | Perfil"
      description="Central das Ligas Acadêmicas | LAEDS"
    >
      {matches ? (
        <Container size={"md"} className={classes.container}>
          <ProfileContent />
        </Container>
      ) : (
        <ProfileContent />
      )}
    </BasicLayout>
  );
};

const ProfileContent = () => {
  const theme = useMantineTheme();
  const { classes } = useClasses();

  const [rteValue, setRteValue] = useState("");
  const [linksLength, setLinksLength] = useState(0);

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    let emptyRte = "<p><br></p>";

    if (rteValue != emptyRte && linksLength > 0) {
      return;
    }

    if (linksLength === 0) {
      showNotification({
        autoClose: 10000,
        title: "Venda um pouco mais dos seus dados pessoais 🙂",
        message: "Adicione pelo menos uma rede social!",
        color: "red",
      });
    }

    if (rteValue === emptyRte) {
      showNotification({
        autoClose: 10000,
        title: "Escreva um pouco mais sobre você",
        message:
          "Quanto mais souber-mos sobre sua vida mais eficaz será nossa estratégia de manipulação 😁",
        color: "red",
      });
    }
  };

  const handleSocialMediaLinks = (links: number) => {
    setLinksLength(links);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
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
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
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
        <SocialMediaFormList socialMediaLinks={handleSocialMediaLinks} />
      </Paper>

      <RichTextEditor
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
        }}
        value={rteValue}
        onChange={setRteValue}
        controls={[
          ["bold", "italic", "underline", "link", "clean"],
          ["h1", "h2", "h3", "h4"],
          ["unorderedList", "orderedList"],
          ["video", "blockquote", "codeBlock"],
          ["sup", "sub"],
          ["alignLeft", "alignCenter", "alignRight"],
        ]}
      />

      <Button type="submit">Salvar</Button>
    </form>
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
