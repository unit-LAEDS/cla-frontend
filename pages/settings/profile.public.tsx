import {
  Avatar,
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
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import RichTextEditor from "components/RichText";
import { UserContext } from "context";
import { BasicLayout } from "layouts";
import React, { useContext, useEffect, useState } from "react";
import { laedsPostUpdateUserProfile } from "services";
import {
  socialLinks,
  SocialMediaFormList,
} from "./components/SocialMediaFormList";

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
  const { laedsUser, updateUserInfo } = useContext(UserContext);

  const theme = useMantineTheme();
  const { classes } = useClasses();
  const [loadingButton, setLoadingButton] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState<string>();
  const [rteValue, setRteValue] = useState(laedsUser!.about || "");
  const [socialMediaLinks, setSocialMediaLinks] = useState<socialLinks>([]);
  const [links, setLinks] = useState<socialLinks>([]);

  const form = useForm({
    initialValues: {
      name: laedsUser!.name || "",
      bio: laedsUser!.bio || "",
    },
  });

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    let emptyRte = rteValue === "<p><br></p>" || rteValue === "";

    if (socialMediaLinks.length === 0) {
      showNotification({
        autoClose: 10000,
        title: "Venda um pouco mais dos seus dados pessoais 🙂",
        message: "Adicione pelo menos uma rede social!",
        color: "red",
      });
    }

    if (emptyRte) {
      showNotification({
        autoClose: 10000,
        title: "Escreva um pouco mais sobre você",
        message:
          "Quanto mais souber-mos sobre sua vida mais eficaz será nossa estratégia de manipulação 😁",
        color: "red",
      });
    }

    setLoadingButton(true);
    try {
      await laedsPostUpdateUserProfile({
        name: form.values.name.trim(),
        bio: form.values.bio.trim(),
        about: rteValue,
        socialMediaLinks: socialMediaLinks,
      });

      updateUserInfo();
    } catch (error) {
      showNotification({
        title: "Ops...",
        message: "Tivemos algum erro no servidor!",
        color: "red",
      });
    }
    setLoadingButton(false);
  };

  const handleSocialMediaLinks = (links: socialLinks) => {
    setSocialMediaLinks(links);
  };

  useEffect(() => {
    if (laedsUser) {
      setProfileImageUrl(laedsUser.image);
      setLinks(
        laedsUser.SocialMediaLinks.map(link => ({
          key: link.id,
          name: link.name,
          value: link.value,
        }))
      );
    }
  }, []);

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <Paper className={classes.presentationCard} withBorder p={"lg"}>
        <Avatar size={120} radius={120}>
          <Dropzone
            className={classes.presentationCardDropzone}
            radius={20}
            onDrop={file => {
              const imageUrl = URL.createObjectURL(file[0]);

              setProfileImageUrl(imageUrl);
            }}
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
                {profileImageUrl ? (
                  <Avatar src={profileImageUrl} size={120} radius={120} />
                ) : (
                  <IconPhoto size={50} stroke={1.5} />
                )}
              </Dropzone.Idle>
            </Stack>
          </Dropzone>
        </Avatar>

        <div className={classes.presentationCardInputs}>
          <TextInput label="Nome" required {...form.getInputProps("name")} />
          <Textarea label="Bio" required {...form.getInputProps("bio")} />
        </div>
      </Paper>

      <Paper className={classes.socialMediaLinks} withBorder p={"lg"}>
        <SocialMediaFormList
          socialMediaLinks={handleSocialMediaLinks}
          links={links}
        />
      </Paper>

      <RichTextEditor
        placeholder="Escreva como se a sua vida dependesse disso 👍"
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

      <Button type="submit" loading={loadingButton}>
        Salvar
      </Button>
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
    width: "100%",
    height: "100%",
    borderRadius: "10rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
