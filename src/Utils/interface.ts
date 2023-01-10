import { Blue, Red, Yellow } from "../Styles/Colors";

export interface IUserObjProps {
  userObj: any;
}

type statusStringType = {
  [key: string]: string;
};
export const statusName: statusStringType = {
  extend: "진행중",
  start: "진행중",
  success: "완료",
  fail: "실패",
};
export const statusColor: statusStringType = {
  extend: "black",
  start: "black",
  success: Blue,
  fail: Red,
};
export const resultMent: statusStringType = {
  success: "성공을 맛 봤으니-꾸준함을 맛볼 차례다.",
  extend: "한번 끝까지 해봤으니-내일은 오늘보다 쉬울거다.",
  fail: "시작은 반-근데 넌,-오늘 거기서 뒷걸음 쳤네?",
};
export const resultColor: statusStringType = {
  default: "#000",
  extend: Yellow,
  success: Blue,
  fail: Red,
};
export const resultGraphMent: statusStringType = {
  extend: "어제보다 평균 계획 완수율이",
  success: "어제보다 평균 집중시간이",
  fail: "어제보다 예상 계획 성공률이",
};

const Moment = require("moment");

export interface ItimeState {
  date: string;
  addSet: number;
  focusSet: number;
  breakMin: number;
  breakSec: number;
  breakSet: number;
  min: number;
  sec: number;
  setBreakMin: number;
  setBreakSec: number;
  setBreakSet: number;
  setFocusMin: number;
  setFocusSec: number;
  setFocusSet: number;
  startTime: string;
  endTime: string;
  id: string;
  status: string;
  usedCount: number;
  successCount: number;
  timerIndex: number;
}

export const defaultTimer = {
  date: Moment().format("YYYY-MM-DD"),
  addSet: 0,
  focusSet: 0,
  breakMin: 0,
  breakSec: 0,
  breakSet: 0,
  min: 0,
  sec: 0,
  setBreakMin: 0,
  setBreakSec: 0,
  setBreakSet: 0,
  setFocusMin: 0,
  setFocusSec: 0,
  setFocusSet: 0,
  startTime: "",
  endTime: "",
  id: "",
  status: "start",
  usedCount: 0,
  successCount: 0,
  timerIndex: 0,
};
