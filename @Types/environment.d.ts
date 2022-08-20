declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      NEXTAUTH_SECRET: string;
      LAEDS_API: string;
    }
  }
}

export {};
