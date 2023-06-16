import { localize } from "./localize";

const strings = {
  hours: localize("hours"),
  minutes: localize("minutes"),
  seconds: localize("seconds"),
};

function formatTimeString(time: number, showMsecs?: boolean): string {
  let msecs = time % 1000;
  let msecsStr = "";

  if (msecs < 10) {
    msecsStr = `00${msecs}`;
  } else if (msecs < 100) {
    msecsStr = `0${msecs}`;
  }

  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;
  let formatted;
  if (showMsecs) {
    formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""
      }${minutes}:${seconds < 10 ? 0 : ""}${seconds}:${msecsStr}`;
  } else {
    formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""
      }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  }

  return formatted;
}

function formatMsecsString(msecs: number, delimiter: string = ":"): string {
  let minutes = Math.floor(msecs / 60);
  let hours = Math.floor(minutes / 60);

  const secondsStr = (msecs % 60).toString().padStart(2, '0');
  const minutesStr = (minutes % 60).toString().padStart(2, '0');
  const hoursStr = (hours).toString().padStart(2, '0');

  return hoursStr + delimiter + minutesStr + delimiter + secondsStr;
}

function formatMsecsStringByLocale(msecs: number): string {
  let minutes = Math.floor(msecs / 60);
  let hours = Math.floor(minutes / 60);

  const secondsStr = (msecs % 60).toString().padStart(2, '0');
  const minutesStr = (minutes % 60).toString().padStart(2, '0');
  const hoursStr = (hours).toString().padStart(2, '0');

  return hoursStr + strings.hours + " " + minutesStr + strings.minutes + " " + secondsStr + strings.seconds;
}

export { formatTimeString, formatMsecsString, formatMsecsStringByLocale };
