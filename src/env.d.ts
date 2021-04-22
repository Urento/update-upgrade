declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_SECURE: boolean;
    EMAIL_AUTH_USER: string;
    EMAIL_AUTH_PASSWORD: string;
  }
}
