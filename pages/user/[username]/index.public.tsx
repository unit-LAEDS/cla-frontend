import { Player } from "@lottiefiles/react-lottie-player";
import {
  Avatar,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  Paper,
  Skeleton,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { ContainerEnum } from "global";
import { BasicLayout } from "layouts";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  PreviewData,
} from "next";
import Link from "next/link";
import { error404, notFound } from "public";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { laedsGetUser, laedsGetUsernames, LaedsUser } from "services";

export const getStaticProps: GetStaticProps<
  {
    [key: string]: LaedsUser;
  },
  ParsedUrlQuery,
  PreviewData
> = async context => {
  const param = context.params;
  const username = param!.username;

  const user = await laedsGetUser(username as string);

  return {
    props: {
      user,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await laedsGetUsernames();

  const paths = users.map(user => ({
    params: {
      username: user.username,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

const UsernameProfile: NextPage = ({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { classes } = useClasses();

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <BasicLayout
        title="CLA | LAEDS"
        description="Central das Ligas Acadêmicas | LAEDS"
      >
        <section className={classes.section}>
          <Player
            autoplay
            loop
            src={notFound}
            style={{
              maxHeight: "500px",
              height: "100%",
              maxWidth: "500px",
              width: "100%",
            }}
          />

          <Title order={2}>
            Ops! Parece que esse usuário ainda não existe.
          </Title>
          <Link href="/auth/signin">
            <Button variant="outline">Esse username pode ser seu !!!</Button>
          </Link>
        </section>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout
      title={`CLA | ${user.username}`}
      description={`CLA | Perfil do ${user.username}`}
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
            {user?.SocialMediaLinks.map(media => (
              <div className={classes.socialMedia}>
                <Text size="sm">{media.name}</Text>
                <a href={`${media.value}`} target={"_blank"}>
                  <Text size="xs" color="dimmed">
                    {`${media.value}`}
                  </Text>
                </a>
              </div>
            ))}
          </Card>
        </section>
        <section className={classes.userDetails}>
          <Paper
            shadow="xl"
            p="lg"
            withBorder
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.gray : "",
            })}
          >
            <TypographyStylesProvider>
              <div
                dangerouslySetInnerHTML={{
                  __html: user.about || "<p>Nada a declarar 🤷‍♀️</p>",
                }}
              />
            </TypographyStylesProvider>
          </Paper>
        </section>
      </Container>
    </BasicLayout>
  );
};

const useClasses = createStyles(theme => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5rem",
  },

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
