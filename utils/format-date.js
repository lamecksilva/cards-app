const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

module.exports = formatDate;
