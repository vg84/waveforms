export function parseTime(secs) {
  if (!secs) {
    return '00:00';
  }

  if (secs < 3600) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs - (minutes * 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - hours * 3600) / 60);
  const seconds = secs - (hours * 3600) - (minutes * 60);

  const minutesString = `${minutes < 10 ? '0' + minutes : minutes}`;
  const secondsString = `${seconds < 10 ? '0' + seconds : seconds}`;

  return `${hours}:${minutesString}:${secondsString}`;
}

export function getWaveformLength(talkTimes) {
  if (!talkTimes || !talkTimes.user || !talkTimes.customer) {
    return 0;
  }

  const talkTimesObj = JSON.parse( JSON.stringify(talkTimes) );
  const lastUserWave = talkTimesObj.user.pop()[1];
  const lastCustomerWave = talkTimesObj.customer.pop()[1];

  return lastUserWave > lastCustomerWave ? lastUserWave : lastCustomerWave
}
