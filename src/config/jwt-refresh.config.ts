const jwtRefreshConfig = () => ({
  refreshSecret: process.env.REFRESH_JWT_SECRET,
  refreshExpiresIn: process.env.REFRESH_JWT_EXPIRE_IN,
});

export default jwtRefreshConfig;
