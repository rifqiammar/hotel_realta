const dateTimezone = (dateCurr) => {
  const date = new Date(dateCurr.split("T")[0]);

  const monthName = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  let day = date.getDate();

  return `${day}  ${monthName} ${year}`;
};

export default dateTimezone;
