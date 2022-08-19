import DefineUsername from "@components/DefineUsername";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  keyframes,
  Paper,
  PasswordInput,
  Progress,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { laedsSignup } from "services";

const secret = process.env.SECRET;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = await getToken({
    req: ctx.req,
    secret,
  });
  const csrfToken = await getCsrfToken(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken,
    },
  };
};

const requirements = [
  { re: /[0-9]/, label: "Inclui números" },
  { re: /[a-z]/, label: "Inclui letra minúscula" },
  { re: /[A-Z]/, label: "Inclui letra maiúscula" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Inclui símbolo especial" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach(requirement => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function Signup({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [shake, setShake] = useState(false);
  const [value, setValue] = useInputState("");

  const [error, setError] = useState(false);
  const strength = getStrength(value);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (strength < 100 || error) {
      setShake(true);

      setTimeout(() => setShake(false), 300);

      return;
    }

    try {
      await laedsSignup({
        username: form.values.username,
        email: form.values.email,
        password: value,
      });
      signIn("credentials", {
        username: form.values.email,
        password: value,
      });
    } catch (err) {
      showNotification({
        title: "Ops... tivemos algum problema",
        message:
          "Parece que o nosso servidor esta fora do ar, tente novamente em alguns instantes.",
        color: "red",
      });
    }
  };

  const handleUsernameError = (value: boolean) => {
    setError(value);
  };

  const handleGetUsername = (username: string) => {
    form.setFieldValue("username", username);
  };

  function PasswordRequirement({
    meets,
    label,
  }: {
    meets: boolean;
    label: string;
  }) {
    return (
      <Text
        color={meets ? "teal" : "red"}
        mt={5}
        size="sm"
        sx={theme => ({
          animation:
            shake && !meets
              ? `${shakeHorizontal} .8s cubic-bezier(.455,.03,.515,.955) both`
              : "",
        })}
      >
        <Center inline>
          {meets ? (
            <IconCheck size={14} stroke={1.5} />
          ) : (
            <IconX size={14} stroke={1.5} />
          )}
          <Box ml={7}>{label}</Box>
        </Center>
      </Text>
    );
  }

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        marginBottom: "4rem",
      }}
    >
      <Container
        style={{
          width: "40rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box
            sx={theme => ({
              animation:
                shake && error
                  ? `${shakeHorizontal} .8s cubic-bezier(.455,.03,.515,.955) both`
                  : "",
            })}
          >
            <DefineUsername
              isError={handleUsernameError}
              getUsername={handleGetUsername}
            />
          </Box>

          <Paper withBorder shadow="md" p={30} radius="md">
            <Stack>
              <TextInput
                label="Email"
                type={"email"}
                placeholder="seumelhor@email.com"
                required
                {...form.getInputProps("email")}
              />
              <div>
                <PasswordInput
                  value={value}
                  onChange={setValue}
                  label="Senha"
                  required
                />
                <Group spacing={5} grow mt="xs" mb="md">
                  {bars}
                </Group>
                <PasswordRequirement
                  label="Tem pelo menos 6 caracteres"
                  meets={value.length > 5}
                />
                {checks}
              </div>
            </Stack>

            <Button
              fullWidth
              mt="xl"
              type="submit"
              // disabled={strength === 100 ? false : true}
              onClick={() => {}}
            >
              Criar Conta
            </Button>

            <Text color="dimmed" size="xs" align="center" mt={10}>
              Ao criar um conta você concorda com os{" "}
              <Link href="/cla/site-policy">
                <Anchor<"a"> size="xs">termos de uso</Anchor>
              </Link>{" "}
              e{" "}
              <Link href="/cla/site-policy">
                <Anchor<"a"> size="xs">políticas de privacidade</Anchor>
              </Link>{" "}
              da plataforma
            </Text>
          </Paper>
        </form>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Já tem uma conta?{" "}
          <Link href="/auth/signin">
            <Anchor<"a"> size="sm">Voltar para o login</Anchor>
          </Link>
        </Text>
      </Container>
    </div>
  );
}

const shakeHorizontal = keyframes({
  "0%,100%": { transform: "translateX(0)" },
  "10%,30%,50%,70%": { transform: "translateX(-5px)" },
  "20%,40%,60%": { transform: "translateX(5px)" },
  "80%": { transform: "translateX(3px)" },
  "90%": { transform: "translateX(-3px)" },
});
