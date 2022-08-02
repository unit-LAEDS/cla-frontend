import {
  Avatar,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  Menu,
  Text,
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ContainerEnum } from "global";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Logout, MoonStars, Settings, Sun, User } from "tabler-icons-react";

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
  const { data: session } = useSession();
  const { classes } = useClasses();
  const mantineTheme = useMantineTheme();

  const { pathname } = useRouter();
  const [active, setActive] = useState(pathname);
  const [profileLink, setProfileLink] = useState("");
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

  useEffect(() => {
    if (session) {
      let linkHref = session.user?.name?.split(" ").join("");

      return setProfileLink(linkHref!);
    }

    setProfileLink("/uuuueeeeppa");
  }, [session]);

  return (
    <Header height={HEADER_HEIGHT} mb={30}>
      <Container className={classes.inner} size={ContainerEnum.size}>
        <Link href={"/"}>
          <a>
            <Title order={1}>LAEDS</Title>
          </a>
        </Link>

        <Group spacing={50}>
          <Group spacing={5}>
            {links}
            {!session && (
              <Link href={"/auth/signin"} key={"Signin"}>
                <a
                  className={`${
                    active === "/auth/signin"
                      ? classes.linkActive
                      : classes.linkDisable
                  } ${classes.link}`}
                  onClick={() => setSelected("/auth/signin")}
                >
                  Signin
                </a>
              </Link>
            )}
          </Group>
          {session && (
            <Menu
              closeOnItemClick={false}
              withArrow
              position={"bottom-end"}
              width={200}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Avatar color={"grape"} />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Logado como</Menu.Label>
                <Menu.Item disabled py={0}>
                  <Text
                    size={"xs"}
                    color={
                      colorScheme === "dark"
                        ? mantineTheme.white
                        : mantineTheme.black
                    }
                  >
                    {session.user?.email}
                  </Text>
                </Menu.Item>

                <Menu.Label>Tema</Menu.Label>
                <Menu.Item
                  icon={
                    dark ? (
                      <Sun size={18} color={mantineTheme.colors.yellow[4]} />
                    ) : (
                      <MoonStars
                        size={18}
                        color={mantineTheme.colors.blue[6]}
                      />
                    )
                  }
                  onClick={() => toggleColorScheme()}
                >
                  {dark ? "Claro" : "Escuro"}
                </Menu.Item>

                <Divider />

                <Menu.Item
                  icon={<User size={14} />}
                  component={NextLink}
                  href={`/user/${profileLink}`}
                >
                  Meu Perfil
                </Menu.Item>

                <Menu.Item
                  icon={<Settings size={14} />}
                  component={NextLink}
                  href={"/settings/profile"}
                >
                  Configurações
                </Menu.Item>

                <Menu.Item
                  color="red"
                  icon={<Logout size={14} />}
                  onClick={() => signOut()}
                >
                  Sair
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
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
    backgroundColor: "var(--dimmed-blue)",
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
