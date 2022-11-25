import { atom } from "recoil";

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

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
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

export const selectState = atom({
  key: "selectState",
  default: false,
});
