export const extractExtension = (filename) => {
  return filename.slice(filename.lastIndexOf(".") + 1);
};
