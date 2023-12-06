export const dateCon = (dateCurr) => {
  const date = new Date(dateCurr);

  const monthName = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  let day = dateCurr.split("-")[2];

  return `${day}  ${monthName} ${year}`;
};
