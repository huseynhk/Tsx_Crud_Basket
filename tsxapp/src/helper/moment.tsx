import moment from "moment";

moment.locale("en", {
  months:
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  monthsParseExact: true,
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY HH:mm",
    LLLL: "dddd, MMMM D, YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "dddd [last week at] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few sec",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: function (number) {
    const b = number % 10;
    return (~~(number % 100 / 10) === 1
      ? "th"
      : b === 1
      ? "st"
      : b === 2
      ? "nd"
      : b === 3
      ? "rd"
      : "th") + "";
  },
  meridiemParse: /AM|PM/,
  isPM: function (input) {
    return input.toLowerCase() === "pm";
  },
  meridiem: function (hours) {
    return hours < 12 ? "AM" : "PM";
  },
  week: {
    dow: 0, 
    doy: 4,
  },
});