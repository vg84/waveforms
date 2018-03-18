import { parseTime, getWaveformLength } from '../utils/helpers';

describe('parseTime works as expected', () => {
  test('displays 00:00 if no seconds are passed', () => {
    const result = parseTime();
    expect(result).toBe('00:00');
  });

  test('displays the seconds correctly', () => {
    const result = parseTime(45);
    expect(result).toBe('00:45');
  });

  test('displays the minutes correctly', () => {
    const result = parseTime(85);
    expect(result).toBe('01:25');
  });

  test('displays the hours correctly', () => {
    const result = parseTime(3600);
    expect(result).toBe('1:00:00');
  });

  test('displays the hours, minutes and seconds correctly', () => {
    const result = parseTime(3672);
    expect(result).toBe('1:01:12');
  });
});


describe('getWaveformLength works as expected', () => {
  const talkTimes = {
    user: [
      [0,3.504],[6.656,14],[19.712,20.144]
    ],
    customer: [
      [0,1.84],[4.48,26.928],[29.184,29.36]
    ]
  };

  const talkTimesWithoutUser = {
    customer: [
      [0,1.84],[4.48,26.928],[29.184,29.36]
    ]
  };

  const talkTimesWithoutCustomer = {
    user: [
      [0,3.504],[6.656,14],[19.712,20.144]
    ]
  };

  test('return "0" if no data is passed', () => {
    const result = getWaveformLength();
    expect(result).toBe(0);
  });

  test('return "0" if no user data is passed', () => {
    const result = getWaveformLength(talkTimesWithoutUser);
    expect(result).toBe(0);
  });

  test('return "0" if no customer data is passed', () => {
    const result = getWaveformLength(talkTimesWithoutCustomer);
    expect(result).toBe(0);
  });

  test('return the expected result', () => {
    const result = getWaveformLength(talkTimes);
    expect(result).toBe(29.36);
  });
})
