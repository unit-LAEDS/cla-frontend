import LaedsHeader, { LaedsHeaderInterface } from "@components/LaedsHeader";
import {
  Avatar,
  Container,
  Paper,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { BasicLayout } from "layouts";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  PreviewData,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { laedsLogo } from "public";
import { ParsedUrlQuery } from "querystring";
import { laedsGetUsersProfiles, LaedsUsersProfiles } from "services";
import { NextPageWithLayout } from "./_app.public";

export const getStaticProps: GetStaticProps<
  {
    [key: string]: LaedsUsersProfiles[];
  },
  ParsedUrlQuery,
  PreviewData
> = async () => {
  const users = await laedsGetUsersProfiles();

  return {
    props: {
      users,
    },
    revalidate: 10,
  };
};

const Home: NextPageWithLayout = ({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <LaedsHeader />
      <Container
        size={"xl"}
        sx={theme => ({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          rowGap: "4rem",

          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            gap: "2rem",
          },
        })}
      >
        {users.map(user => (
          <Tooltip.Floating label={`@${user.username}`} key={user.username}>
            <UnstyledButton>
              <Link href={`/user/${user.username}`}>
                <Paper
                  radius="md"
                  withBorder
                  shadow="xl"
                  sx={theme => ({
                    width: "30rem",
                    height: "100%",
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.white,
                  })}
                  p="lg"
                >
                  <Avatar src={user?.image} size={120} radius={120} mx="auto" />
                  <Text align="center" size="lg" weight={500} mt="md">
                    {user?.name}
                  </Text>
                  <Text
                    align="center"
                    color="dimmed"
                    size="sm"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {user?.bio}
                  </Text>
                </Paper>
              </Link>
            </UnstyledButton>
          </Tooltip.Floating>
        ))}
      </Container>
    </>
  );
};

Home.PageLayout = BasicLayout;

export default Home;
