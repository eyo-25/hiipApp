import { atom } from "recoil";

export const toDoState = atom<number[]>({
  key: "toDo",
  default: [1, 2, 3, 4, 5, 6, 7, 8],
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
