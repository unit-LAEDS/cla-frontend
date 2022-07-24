import { Box, createStyles, List, Paper, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { User } from "tabler-icons-react";

const SettingsNavigation = () => {
  const { classes } = useClasses();

  return (
    <Paper radius="md" withBorder p="lg">
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <div className={classes.listItemBoxSelector}></div>
          <UnstyledButton
            className={classes.listItemBox}
            component={NextLink}
            href={"/settings/profile"}
          >
            <User size={15} />
            Perfil
          </UnstyledButton>
        </li>
        <li className={classes.listItem}>
          <div className={classes.listItemBoxSelector}></div>
          <UnstyledButton
            className={classes.listItemBox}
            component={NextLink}
            href={"/settings/profile"}
          >
            <User size={15} />
            Privacidade
          </UnstyledButton>
        </li>
      </ul>
    </Paper>
  );
};

const useClasses = createStyles(theme => ({
  list: {
    listStyle: "none",
    padding: 0,
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    width: "20rem",
    marginTop: "1rem",
  },

  listItemBox: {
    width: "100%",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "rgba(97, 97, 97, 0.144)",
    padding: "0.5rem 2rem",
    borderRadius: "1rem",
  },

  listItemBoxSelector: {
    width: ".3rem",
    height: "3rem",
    backgroundColor: "var(--light-blue)",
    borderRadius: "1rem",
  },
}));

export default SettingsNavigation;
