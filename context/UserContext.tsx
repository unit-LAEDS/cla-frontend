import SetUsernameModal from "@components/SetUsernameModal";
import { Button, Text, TextInput } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconAt } from "@tabler/icons";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { laedsGetUserScope, laedsSetUsername } from "services";

type UserContextType = {
  userScopes: string[];
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { data: session } = useSession();
  const [userScopes, setUserScopes] = useState<string[]>([]);
  const [username, setUsername] = useState("");

  const handleGetUserScope = async () => {
    try {
      const response = await laedsGetUserScope();
      const scopes = response.data.scope as string[];

      setUserScopes(scopes);
    } catch (error) {
      showNotification({
        title: "Ops...",
        message: "Tivemos algum erro no servidor!",
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (session) {
      handleGetUserScope();
    }
  }, [session]);

  if (userScopes.includes("update:username")) {
    openModal({
      centered: true,
      withCloseButton: false,
      closeOnClickOutside: false,
      title: "Escolha um nome de usuário!",
      children: (
        <form
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();

            laedsSetUsername(username);
          }}
        >
          <TextInput
            label="Username"
            icon={<IconAt size={14} />}
            placeholder="Xaropinho"
            data-autofocus
            required
            onChange={event => setUsername(event.target.value)}
          />
          <Button type="submit" fullWidth mt="md">
            Salvar
          </Button>
        </form>
      ),
    });
  }

  return (
    <UserContext.Provider value={{ userScopes }}>
      {children}
    </UserContext.Provider>
  );
};
