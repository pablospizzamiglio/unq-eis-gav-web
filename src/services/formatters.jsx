export const formatCurrency = (currency) => {
  let formattedCurrency = 0.0;
  if (currency) {
    formattedCurrency = currency;
  }
  return formattedCurrency.toFixed(2);
};

export const formatUserName = (user) => {
  let formattedUserName = "";
  if (user) {
    formattedUserName = `${user.firstName} ${user.lastName}`;
  }
  return formattedUserName;
};

export const formatKmTraveled = (kmTraveled) => {
  let formattedKmTraveled = "";
  if (kmTraveled == null) {
    formattedKmTraveled = "null";
  } else {
    formattedKmTraveled = kmTraveled;
  }
  return formattedKmTraveled;
};
