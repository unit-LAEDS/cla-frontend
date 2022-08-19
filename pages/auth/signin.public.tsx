import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { BrandGithub } from "tabler-icons-react";

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

export default function Signin({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

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
        <Paper withBorder shadow="md" p={30} radius="md">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <Group grow mb="md">
            <Button
              leftIcon={<BrandGithub />}
              radius="xl"
              sx={theme => ({
                backgroundColor: "#2a292e",
                ":hover": {
                  backgroundColor: "#8357e6",
                },
              })}
              onClick={() => signIn("github")}
            >
              GitHub
            </Button>
          </Group>

          <Divider
            label="Ou continue com o email"
            labelPosition="center"
            my="lg"
          />

          <TextInput
            {...form.getInputProps("username")}
            label="Username ou Email"
            required
          />
          <PasswordInput
            {...form.getInputProps("password")}
            label="Senha"
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Lembrar de mim" />
            <Anchor<"a">
              onClick={event => event.preventDefault()}
              href="#"
              size="sm"
            >
              Esqueceu a senha?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            onClick={async () => {
              const response = await signIn("credentials", {
                username: form.values.username,
                password: form.values.password,
                redirect: false,
              });

              if (response?.error) {
                return showNotification({
                  title: "Ops...",
                  message: "Usuário ou senha inválidos!",
                  color: "red",
                });
              }

              Router.push("/");
            }}
          >
            Entrar
          </Button>
        </Paper>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Ainda não tem uma conta?{" "}
          <Link href="/auth/signup">
            <Anchor<"a"> size="sm">Criar Conta</Anchor>
          </Link>
        </Text>
      </Container>
    </div>
  );
}
