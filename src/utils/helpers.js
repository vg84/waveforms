export function parseTime(secs) {
  if (secs < 60) {
    return `${secs}`;
  }

  if (secs < 3600) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs - (minutes * 60);

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - hours * 3600) / 60);
  const seconds = secs - (hours * 3600) - (minutes * 60);

  const minutesString = `${minutes < 10 ? '0' + minutes : minutes}`;
  const secondsString = `${seconds < 10 ? '0' + seconds : seconds}`;

  return `${hours}:${minutesString}:${secondsString}`;
}
