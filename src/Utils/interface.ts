import { Blue, Red, Yellow } from "../Styles/Colors";

export interface IUserObjProps {
  userObj: any;
}

type statusNameType = {
  [key: string]: string;
};
export const statusName: statusNameType = {
  extend: "진행중",
  start: "진행중",
  success: "완료",
  fail: "실패",
};

type statusColorType = {
  [key: string]: string;
};
export const statusColor: statusColorType = {
  extend: "black",
  start: "black",
  success: Blue,
  fail: Red,
};

type resultMentType = {
  [key: string]: string;
};
export const resultMent: resultMentType = {
  success: "성공을 맛 봤으니-꾸준함을 맛볼 차례다.",
  extend: "한번 끝까지 해봤으니-내일은 오늘보다 쉬울거다.",
  fail: "시작은 반-근데 넌,-오늘 거기서 뒷걸음 쳤네?",
};

type resultColorType = {
  [key: string]: string;
};
export const resultColor: resultColorType = {
  default: "#000",
  extend: Yellow,
  success: Blue,
  fail: Red,
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
};
