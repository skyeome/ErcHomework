import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { generateWeekDates, getWeekDate } from "@/hooks/getWeekDate";
import { WeeklyCheck } from "@/components/home/DailyCheckItem.types";
import { recordConverter } from "@/libs/firestore";

const setWeeklyByDay = (
  day: number,
  result: WeeklyCheck,
  target: string,
  value: boolean
) => {
  switch (day) {
    case 1:
      result.mon[target] = value;
      break;
    case 2:
      result.tue[target] = value;
      break;
    case 3:
      result.wed[target] = value;
      break;
    case 4:
      result.thu[target] = value;
      break;
    case 5:
      result.fri[target] = value;
      break;
  }
};

const setWeeklyCheck = (day: number, result: WeeklyCheck) => {
  switch (day) {
    case 1:
      result.mon.checked = true;
      break;
    case 2:
      result.tue.checked = true;
      break;
    case 3:
      result.wed.checked = true;
      break;
    case 4:
      result.thu.checked = true;
      break;
    case 5:
      result.fri.checked = true;
      break;
  }
};

export const getWeeklyCheck = async (uid: string | null) => {
  if (!uid) throw new Error("로그인 해주세요");
  // 결과값 저장하는 변수
  const result: WeeklyCheck = {
    mon: { checked: false },
    tue: { checked: false },
    wed: { checked: false },
    thu: { checked: false },
    fri: { checked: false },
  };
  // 이번주 월~토(금요일 12시)를 생성
  const [startDate, endDate] = getWeekDate();
  const thisWeek = generateWeekDates();
  thisWeek.forEach((date) => {
    const today = new Date().getDay();
    const day = date.getDay();
    if (today === 0) {
      setWeeklyByDay(day, result, "record", false);
    } else if (today >= day) {
      setWeeklyByDay(day, result, "record", false);
    }
  });

  // 이번주 숙제 검사
  const recordRef = collection(db, "record");
  const readingRef = collection(db, "reading");
  const workRef = collection(db, "workbook");
  const wheres = [
    where("uid", "==", uid),
    where("date", ">", startDate),
    where("date", "<", endDate),
  ];
  const q1 = query(recordRef, ...wheres).withConverter(recordConverter);
  const q2 = query(readingRef, ...wheres);
  const q3 = query(workRef, ...wheres);
  const promises = [getDocs(q1), getDocs(q2), getDocs(q3)];
  const results = await Promise.all(promises);
  results[0].forEach((doc) => {
    const data = doc.data();
    const date = data.date.toDate();
    const day = date.getDay();
    const check = data.check;
    setWeeklyByDay(day, result, "record", true);
    if (check) setWeeklyCheck(day, result);
  });
  results[1].forEach((doc) => {
    const date = doc.data().date.toDate();
    const day = date.getDay();
    setWeeklyByDay(day, result, "reading", true);
  });
  results[2].forEach((doc) => {
    const date = doc.data().date.toDate();
    const day = date.getDay();
    setWeeklyByDay(day, result, "workbook", true);
  });

  return result;
};
