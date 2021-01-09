import moment from "moment";

export const convertDateStringToMomentObj = (dateString) => {
  const dateObj = new Date(dateString);
  const momentObj = moment(dateObj);

  return momentObj;
};
