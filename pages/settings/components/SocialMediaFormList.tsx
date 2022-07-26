import { useForm } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { Trash } from "tabler-icons-react";
import { useEffect } from "react";

interface SocialMediaFormListInterface {
  socialMediaLinks: (links: number) => void;
}

const SocialMediaFormList = ({
  socialMediaLinks,
}: SocialMediaFormListInterface) => {
  const form = useForm({
    initialValues: {
      socialLinks: [{ name: "", value: "", key: randomId() }],
    },
  });

  const fields = form.values.socialLinks.map((item, index) => (
    <Group
      key={item.key}
      mt="xs"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextInput
        label="Nome"
        placeholder="Linkedin"
        required
        sx={{ flex: 1 }}
        {...form.getInputProps(`socialLinks.${index}.name`)}
      />
      <TextInput
        label="link"
        placeholder="URL"
        required
        sx={{ flex: 1 }}
        {...form.getInputProps(`socialLinks.${index}.value`)}
      />

      <ActionIcon
        color="red"
        style={{
          alignSelf: "flex-end",
          bottom: "5px",
        }}
        onClick={() => form.removeListItem("socialLinks", index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  useEffect(() => {
    socialMediaLinks(fields.length);
  }, [fields]);

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" pr={90}>
            Redes Sociais
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          Você pode adicionar uma ou mais redes sociais
        </Text>
      )}

      {fields}

      <Group position="center" mt="md">
        <Button
          style={{
            display: fields.length === 5 ? "none" : "block",
          }}
          onClick={() =>
            form.insertListItem("socialLinks", {
              name: "",
              value: "",
              key: randomId(),
            })
          }
        >
          Adicionar Rede
        </Button>
      </Group>
    </Box>
  );
};

export { SocialMediaFormList };
