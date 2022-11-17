import { atom } from "recoil";

export const toDoState = atom<number[]>({
  key: "toDo",
  default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // default: [],
});
export const homeSplashState = atom<boolean>({
  key: "homeSplash",
  default: true,
});

const Moment = require("moment");

export const clickDateState = atom({
  key: "clickDateState",
  default: Moment().format("YYYY-MM-DD"),
});

export const toDoEditState = atom({
  key: "toDoEditState",
  default: false,
});
