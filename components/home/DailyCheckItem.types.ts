export interface DailyCheckItemProps {
  data: DailyCheck;
  date: string;
}

export interface WeeklyCheck {
  mon: DailyCheck;
  tue: DailyCheck;
  wed: DailyCheck;
  thu: DailyCheck;
  fri: DailyCheck;
  [key: string]: DailyCheck;
}

export interface DailyCheck {
  record?: boolean;
  reading?: boolean;
  workbook?: boolean;
  checked: boolean;
  [key: string]: boolean | undefined;
}
