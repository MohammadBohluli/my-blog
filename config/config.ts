export default () => ({
  app_port: parseInt(process.env.APP_PORT),
  database: {
    postgres_user: process.env.POSTGRES_USER,
    postgres_password: process.env.POSTGRES_PASSWORD,
  },
});
