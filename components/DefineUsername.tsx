import { Paper, TextInput, Tooltip } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAlertCircle, IconAt } from "@tabler/icons";
import { ReactNode, useEffect, useState } from "react";
import { laedsFindUsername } from "services";

interface SelectUsernameInterface {
  isError: (value: boolean) => void;
  getUsername: (username: string) => void;
  children?: ReactNode | ReactNode[];
}

const DefineUsername = ({
  getUsername,
  isError,
  children,
}: SelectUsernameInterface) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState("");
  const [debounced] = useDebouncedValue(username, 200);

  const handleLaedsFindUsername = async () => {
    try {
      const response = await laedsFindUsername(username);

      setError("");
      isError(false);
      getUsername(username);
    } catch (error) {
      setError("Nome de usuário já utilizado!");
      isError(true);
    }
  };

  useEffect(() => {
    if (username !== "") {
      handleLaedsFindUsername();
    } else {
      setError("");
      isError(true);
    }
  }, [debounced]);

  return (
    <Paper withBorder shadow="md" p={30} mt={20} radius="md">
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

      {children}
    </Paper>
  );
};

export default DefineUsername;
