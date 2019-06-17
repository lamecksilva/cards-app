const formatTime = (date) => {
  const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minute = date.getMinutes();

  return `${hour}:${minute}`;
};

module.exports = formatTime;
