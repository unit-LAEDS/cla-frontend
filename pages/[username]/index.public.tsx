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
import { ContainerEnum } from "global";
import { BasicLayout } from "layouts";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { xaropinho } from "public";
import { useEffect, useState } from "react";
import { fetchGitHubInfo } from "services";

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
  const { classes } = useClasses();

  const [loading, setLoading] = useState(false);
  const [githubInfo, setGithubInfo] = useState({
    avatarUrl: "",
    name: "",
    html_url: "",
    bio: "",
  });

  const handleGitHubFetch = async () => {
    try {
      setLoading(true);
      const data = await fetchGitHubInfo(username);
      setLoading(false);

      setGithubInfo({
        avatarUrl: data.avatar_url,
        html_url: data.html_url,
        name: data.name,
        bio: data.bio,
      });
    } catch (err) {
      setGithubInfo({
        avatarUrl: xaropinho.src,
        html_url: "",
        name: "Xaropinho",
        bio: "Comfortably Numb - Live (Pulse Show)",
      });
    }
  };

  useEffect(() => {
    handleGitHubFetch();
  }, []);

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
            p="lg"
            sx={theme => ({
              width: "30rem",
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <Avatar
              src={githubInfo.avatarUrl}
              size={120}
              radius={120}
              mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
              {loading ? <Skeleton height={8} radius="lg" /> : githubInfo.name}
            </Text>
            <Text
              align="center"
              color="dimmed"
              size="sm"
              style={{
                wordBreak: "break-word",
              }}
            >
              {githubInfo.bio}
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
            {githubInfo.html_url && (
              <div className={classes.socialMedia}>
                <Text size="sm">GitHub</Text>
                <Link href={`${githubInfo.html_url}`}>
                  <a target={"_blank"}>
                    <Text size="xs" color="dimmed">
                      {`${githubInfo.html_url}`}
                    </Text>
                  </a>
                </Link>
              </div>
            )}
          </Card>
        </section>
        <section className={classes.userDetails}></section>
      </Container>
    </BasicLayout>
  );
};

const useClasses = createStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10rem",
  },

  basicInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },

  userDetails: {},

  socialMedia: {
    marginTop: "1rem",
  },
}));

export default UsernameProfile;