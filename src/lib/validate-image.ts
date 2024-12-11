export const validateImage = (imageUrl?: string) => {
  return imageUrl?.startsWith("https://media.licdn.com/dms/image/")
    ? imageUrl
    : null;
};
