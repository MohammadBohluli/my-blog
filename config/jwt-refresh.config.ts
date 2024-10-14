const jwtRefreshConfig = () => ({
  secret: process.env.REFRESH_JWT_SECRET,
  expiresIn: process.env.REFRESH_JWT_EXPIRE_IN,
});

export default jwtRefreshConfig;
