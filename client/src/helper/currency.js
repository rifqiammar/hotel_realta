const currency = (number) => {
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return formattedCurrency;
};

export default currency;
