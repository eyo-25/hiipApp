import { atom } from "recoil";

const Moment = require("moment");

export interface ITodo {
  endDate: string;
  index: number;
  intervalSet: number;
  memo: string;
  planSubTitle: string;
  planTitle: string;
  startDate: string;
  status: string;
  todoId: any;
}

export const projectState = atom({
  key: "projectState",
  default: [],
});
export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});
export const homeSplashState = atom<boolean>({
  key: "homeSplash",
  default: true,
});
export const clickDateState = atom({
  key: "clickDateState",
  default: Moment().format("YYYY-MM-DD"),
});
export const toDoEditState = atom({
  key: "toDoEditState",
  default: false,
});
export const selectState = atom({
  key: "selectState",
  default: false,
});
export const inputFocusState = atom({
  key: "inputFocusState",
  default: false,
});
