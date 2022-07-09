export function TIME_DIFFERENCE(DATE_POSTED) {
  let DATE_POSTED_ON = parseInt(DATE_POSTED);
  let CURRENT_DATE = new Date();
  let TIME_DIFFERENCE = CURRENT_DATE.getTime() - DATE_POSTED_ON;
  let TIME_DISPLAY;

  let TIME_SEC = Math.round(TIME_DIFFERENCE / 1000); //SECONDS
  let TIME_MIN = Math.round(TIME_DIFFERENCE / (1000 * 60)); //MINUTE
  let TIME_HR = Math.round(TIME_DIFFERENCE / (1000 * 60 * 60));
  let TIME_D = Math.round(TIME_DIFFERENCE / (1000 * 60 * 60 * 24));
  let TIME_W = Math.round(TIME_DIFFERENCE / (1000 * 60 * 60 * 24 * 7));
  let TIME_M = Math.round(TIME_DIFFERENCE / (1000 * 60 * 60 * 24 * 7 * 4));
  let TIME_Y = Math.round(TIME_DIFFERENCE / (1000 * 60 * 60 * 24 * 7 * 4 * 12));

  if (TIME_SEC < 60) {
    TIME_DISPLAY = TIME_SEC + "s";
  } else if (TIME_MIN < 60) {
    TIME_DISPLAY = TIME_MIN + "min";
  } else if (TIME_HR < 24) {
    TIME_DISPLAY = TIME_HR + "hr";
  } else if (TIME_D < 7) {
    TIME_DISPLAY = TIME_D + "d";
  } else if (TIME_W < 4) {
    TIME_DISPLAY = TIME_W + "w";
  } else if (TIME_M < 12) {
    TIME_DISPLAY = TIME_M + "m";
  } else if (TIME_Y >= 1) {
    TIME_DISPLAY = TIME_Y + "y";
  }
  return TIME_DISPLAY;
}
