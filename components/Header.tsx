import {
  ActionIcon,
  Avatar,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ContainerEnum } from "global";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Logout, MoonStars, Sun, User } from "tabler-icons-react";

type LinkType = {
  label: string;
  href: string;
};

const items: LinkType[] = [
  {
    href: "/",
    label: "Home",
  },
];

const HEADER_HEIGHT = 60;

export const DefaultHeader = () => {
  const { classes } = useClasses();
  const mantineTheme = useMantineTheme();

  const { pathname } = useRouter();
  const [active, setActive] = useState(pathname);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const setSelected = (href: string) => setActive(href);

  const links = items.map(item => (
    <Link href={item.href} key={item.label}>
      <a
        className={`${
          active === item.href ? classes.linkActive : classes.linkDisable
        } ${classes.link}`}
        onClick={() => setSelected(item.href)}
      >
        {item.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.inner} size={ContainerEnum.size}>
        <h1>LAEDS</h1>

        <Group spacing={50}>
          <Group spacing={5}>{links}</Group>
          <Menu
            withArrow
            closeOnItemClick={false}
            control={
              <UnstyledButton>
                <Avatar color={"red"} />
              </UnstyledButton>
            }
          >
            <Menu.Label pb={0}>Logado como</Menu.Label>
            <Menu.Item disabled py={0}>
              <Text
                size={"xs"}
                color={
                  colorScheme === "dark"
                    ? mantineTheme.white
                    : mantineTheme.black
                }
              >
                Nathan
              </Text>
            </Menu.Item>

            <Menu.Label>Tema</Menu.Label>
            <Menu.Item
              icon={
                dark ? (
                  <Sun size={18} color={mantineTheme.colors.yellow[4]} />
                ) : (
                  <MoonStars size={18} color={mantineTheme.colors.blue[6]} />
                )
              }
              onClick={() => toggleColorScheme()}
            >
              {/* <UnstyledButton
                  sx={theme => ({
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.yellow[4]
                        : theme.colors.blue[6],
                  })}
                ></UnstyledButton> */}
              {dark ? "Claro" : "Escuro"}
            </Menu.Item>

            <Divider />

            <Menu.Item
              icon={<User size={14} />}
              component={NextLink}
              href={"/operadores/perfil"}
            >
              Meu Perfil
            </Menu.Item>

            <Menu.Item
              color="red"
              icon={<Logout size={14} />}
              // onClick={logOut}
            >
              Sair
            </Menu.Item>
          </Menu>
        </Group>
      </Container>
    </Header>
  );
};

const useClasses = createStyles(theme => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    padding: "0.5rem 1rem",
    fontWeight: "bolder",
  },

  linkActive: {
    textAlign: "center",
    color: "var(--light-blue)",
    backgroundColor: "#0eb1d218",
    borderRadius: "0.5rem",
  },

  linkDisable: {
    color: "rgb(97, 97, 97)",
    transition: "0.3s all",

    "&:hover": {
      backgroundColor: "rgba(97, 97, 97, 0.144)",
      borderRadius: "0.5rem",
    },
  },

  root: {
    position: "relative",
    "& *": {
      cursor: "pointer",
    },
  },

  icon: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 4,
    color: theme.white,
  },

  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
}));
