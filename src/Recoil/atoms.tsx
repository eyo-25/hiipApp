import { atom, selector } from "recoil";

const Moment = require("moment");

export interface ITodo {
  endDate: string;
  index: number;
  defaultSet: number;
  memo: string;
  planSubTitle: string;
  planTitle: string;
  startDate: string;
  status: string;
  todoId: any;
  id: string;
}

export const projectState = atom<any>({
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
//project
export const inputFocusState = atom({
  key: "inputFocusState",
  default: false,
});
export const startDateState = atom({
  key: "startDateState",
  default: "",
});
export const endDateState = atom({
  key: "endDateState",
  default: "",
});
export const projectTitleState = atom({
  key: "projectTitleState",
  default: "",
});
//create
export const createStartDateState = atom({
  key: "creatStartDateState",
  default: "",
});
export const createEndDateState = atom({
  key: "createEndDateStat",
  default: "",
});
export const createClickDateState = atom({
  key: "createClickDateState",
  default: "",
});
export const createTitleState = atom({
  key: "createTitleState",
  default: "",
});
export const createSubTitleState = atom({
  key: "createSubTitleState",
  default: "",
});
