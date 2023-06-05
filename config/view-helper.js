module.exports = (app) => {
  app.locals.checkStatusOfDate = (habbit, checkDate) => {
    let check = habbit.tracks.filter((track) => track.date == checkDate);
    if (check.length) return check[0].status;
    return "None";
  };

  app.locals.getDayOfWeek = (date) => {
    let dayOfWeek = date.getDay();
    return isNaN(dayOfWeek)
      ? null
      : ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][dayOfWeek];
  };

};
