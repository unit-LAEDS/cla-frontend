import {
  Avatar,
  Card,
  Container,
  createStyles,
  Divider,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import RichTextEditor from "components/RichText";
import { ContainerEnum } from "global";
import { BasicLayout } from "layouts";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { xaropinho } from "public";
import { useEffect, useState } from "react";
import { fetchGitHubInfo } from "services";

const initialValue =
  "<p>Insira seu <b>username</b> do GitHub na url <br> Ex: laeds.org/NahtanN </p>";

export const getStaticProps: GetStaticProps = context => {
  const param = context.params;
  const username = param!.username;

  return {
    props: {
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const UsernameProfile: NextPage = ({
  username,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  const { asPath } = useRouter();
  const { classes } = useClasses();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    image?: string | null | undefined;
    name?: string | null | undefined;
    bio?: string | null | undefined;
    socialMedia: {
      name?: string | null | undefined;
      link?: string | null | undefined;
    }[];
  }>();

  const handleGitHubFetch = async () => {
    try {
      setLoading(true);
      const data = await fetchGitHubInfo(username);
      setLoading(false);

      setUser({
        image: data.avatar_url,
        name: data.name,
        bio: data.bio,
        socialMedia: [
          {
            link: data.html_url,
            name: "GitHub",
          },
        ],
      });
    } catch (err) {
      setLoading(false);

      setUser({
        image: xaropinho.src,
        name: "Xaropinho",
        bio: "Comfortably Numb - Live (Pulse Show)",
        socialMedia: [],
      });
    }
  };

  useEffect(() => {
    if (session) {
      let user = session.user;
      let urlPath = user?.name?.split(" ").join("");

      asPath.replace("/", "") === `user/${urlPath}`
        ? setUser({
            image: user?.image,
            name: user?.name,
            bio: "",
            socialMedia: [
              {
                link: user?.email,
                name: "E-mail",
              },
            ],
          })
        : handleGitHubFetch();
    }

    if (session === null) handleGitHubFetch();
  }, [session, asPath]);

  return (
    <BasicLayout
      title={`CLA | ${username}`}
      description={`CLA | Perfil do ${username}`}
    >
      <Container size={ContainerEnum.size} className={classes.container}>
        <section className={classes.basicInfo}>
          <Paper
            radius="md"
            withBorder
            className={classes.basicInfoPaper}
            p="lg"
          >
            <Avatar src={user?.image} size={120} radius={120} mx="auto" />
            <Text align="center" size="lg" weight={500} mt="md">
              {loading ? <Skeleton height={8} radius="lg" /> : user?.name}
            </Text>
            <Text
              align="center"
              color="dimmed"
              size="sm"
              style={{
                wordBreak: "break-word",
              }}
            >
              {user?.bio}
            </Text>
          </Paper>

          <Card withBorder>
            <Divider label={<Text>Redes Sociais</Text>} />
            {loading && (
              <>
                <Skeleton height={8} mt={10} width="50%" radius="lg" />
                <Skeleton height={8} mt={10} radius="lg" />
              </>
            )}
            {user?.socialMedia.map(media => (
              <div className={classes.socialMedia}>
                <Text size="sm">{media.name}</Text>
                <a href={`${media.link}`} target={"_blank"}>
                  <Text size="xs" color="dimmed">
                    {`${media.link}`}
                  </Text>
                </a>
              </div>
            ))}
          </Card>
        </section>
        <section className={classes.userDetails}>
          <RichTextEditor
            p={0}
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
            }}
            readOnly
            value={initialValue}
            onChange={() => {}}
          />
        </section>
      </Container>
    </BasicLayout>
  );
};

const useClasses = createStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gap: "2rem",
    },
  },

  basicInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "100%",
    },
  },

  basicInfoPaper: {
    width: "30rem",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "100%",
    },
  },

  userDetails: {
    width: "50%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
  },

  socialMedia: {
    marginTop: "1rem",
  },
}));

export default UsernameProfile;
