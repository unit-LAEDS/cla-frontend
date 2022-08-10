import {
  Button,
  Container,
  Paper,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconAt } from "@tabler/icons";
import { UserContext } from "context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { laedsFindUsername, laedsSetUsername } from "services";

const SelectUsername = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [debounced] = useDebouncedValue(username, 200);
  const { reloadSession } = useContext(UserContext);
  const { push } = useRouter();

  const handleLaedsFindUsername = async () => {
    try {
      const response = await laedsFindUsername(username);

      setButtonDisable(false);
      setError("");
    } catch (error) {
      setButtonDisable(true);
      setError("Nome de usuário já utilizado!");
    }
  };

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

  useEffect(() => {
    if (username !== "") {
      handleLaedsFindUsername();
    } else {
      setButtonDisable(true);
      setError("");
    }
  }, [debounced]);

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
        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              required
              placeholder="Xaropinho"
              mb={10}
              onChange={event => {
                const value = event.currentTarget.value;
                let name = value.trim().split(" ").join("-");

                setUsername(name);
              }}
            />
            <TextInput
              error={error}
              icon={<IconAt size={14} />}
              disabled
              variant="filled"
              value={debounced}
              rightSection={
                <Tooltip
                  label="Esse será o slug da sua conta na plataforma"
                  position="top-end"
                  withArrow
                >
                  <div>
                    <IconAlertCircle
                      size={18}
                      style={{ display: "block", opacity: 0.4 }}
                    />
                  </div>
                </Tooltip>
              }
            />
            <Button
              type="submit"
              fullWidth
              mt="md"
              disabled={buttonDisable}
              loading={buttonLoading}
            >
              Salvar
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SelectUsername;
