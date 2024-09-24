import { formatTime } from "./common";

export const logError = (name, action) => {
  let time = formatTime(new Date());
  console.error(time, name, action);
};
