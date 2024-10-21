const isExpiredTime = (time: Date): boolean => {
  const currentTime = new Date().getTime();

  if (currentTime < time.getTime()) return true;

  return false;
};

export default isExpiredTime;
