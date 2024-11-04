const mailConfig = () => ({
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailSecure: Boolean(process.env.MAIL_SECURE),
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
  mailTransport: process.env.MAIL_TRASNPORT,
});

export default mailConfig;
