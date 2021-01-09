export const convertObjectToArray = (object) => {
  if (object) {
    return Object.entries(object).map((entry) =>
      Object.assign({}, entry[1], { id: entry[0] })
    );
  } else {
    return [];
  }
};
