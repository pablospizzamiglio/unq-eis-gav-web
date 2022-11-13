export const formatDecimalNumber = (value) => {
  let formattedCurrency = 0.0;
  if (value) {
    formattedCurrency = value;
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

export const formatOrderStatus = (status) => {
  let formattedOrderStatus = "";
  if (status) {
    formattedOrderStatus = status.replaceAll("_", " ");
  }
  return formattedOrderStatus;
};
