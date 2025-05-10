// 이번 주의 시작 날짜(월요일) 계산 함수
export const getStartOfThisWeek = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  const diff =
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); // adjust when day is Sunday
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

export const getWeekDate = () => {
  const startOfWeek = getStartOfThisWeek();
  // 이번 주의 토요일을 구합니다. (월요일에서 5일을 더하고, 시간을 0시 0분으로 설정)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 5);
  endOfWeek.setHours(0, 0, 0, 0);

  return [startOfWeek, endOfWeek];
};

export const getWeekDateAll = () => {
  const startOfWeek = getStartOfThisWeek();
  // 이번 주의 토요일을 구합니다. (월요일에서 7일을 더하고, 시간을 0시 0분으로 설정)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(0, 0, 0, 0);

  return [startOfWeek, endOfWeek];
};

// 이번 주 월요일부터 금요일까지의 날짜 배열 생성
export const generateWeekDates = () => {
  const startOfWeek = getStartOfThisWeek();
  const weekDates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

export const generateAllWeekDates = () => {
  const startOfWeek = getStartOfThisWeek();
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};
