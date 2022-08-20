import DefineUsername from "@components/DefineUsername";
import { Button, Container, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "context";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { laedsSetUsername } from "services";

const SelectUsername = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { reloadSession } = useContext(UserContext);
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setButtonLoading(true);

    try {
      const response = await laedsSetUsername(username);

      reloadSession();

      setTimeout(() => push("/"), 1000);
    } catch (error) {
      setButtonLoading(false);
      showNotification({
        title: "Ops...",
        message: "Tivemos algum erro no servidor!",
        color: "red",
      });
    }
  };

  const handleUsernameError = (value: boolean) => {
    if (!value) {
      return setButtonDisable(false);
    }

    setButtonDisable(true);
    setError(value);
  };

  const handleGetUsername = (username: string) => {
    setUsername(username);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          width: "40rem",
        }}
      >
        <Title order={2}>Antes de continuar...</Title>
        <Text>Finalize o cadastro</Text>
        <form onSubmit={handleSubmit}>
          <DefineUsername
            isError={handleUsernameError}
            getUsername={handleGetUsername}
          >
            <Button
              type="submit"
              fullWidth
              mt="md"
              disabled={buttonDisable}
              loading={buttonLoading}
            >
              Salvar
            </Button>
          </DefineUsername>
        </form>
      </Container>
    </div>
  );
};

export default SelectUsername;
