const slugify = (text: string) => {
  const randomText = crypto.randomUUID().split('-')[4];

  const slugy = text.toLowerCase().replaceAll(' ', '-');

  return slugy + '-' + randomText;
};

export default slugify;
