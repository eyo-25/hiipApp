import { atom } from "recoil";

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
  addSet: string;
}

export const loadState = atom({
  key: "loadState",
  default: false,
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
//plan
export const isWeekState = atom({
  key: "isWeekState",
  default: false,
});
export const selectTodoState = atom({
  key: "selectTodoState",
  default: "",
});
export const cardEditState = atom({
  key: "cardEditState",
  default: false,
});
export const selectState = atom({
  key: "selectState",
  default: false,
});
export const isStatusLoad = atom({
  key: "isStatusLoad",
  default: false,
});
//project
export const projectState = atom<any>({
  key: "projectState",
  default: [],
});
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
export const isCreateState = atom({
  key: "isCreateState",
  default: false,
});
export const isTodoEditState = atom({
  key: "isTodoEditState",
  default: false,
});
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
//timer
export const timerSplashState = atom<boolean>({
  key: "timerSplashState",
  default: true,
});
export const isBreakState = atom<boolean>({
  key: "isBreakState",
  default: false,
});
export const isPauseState = atom<boolean>({
  key: "isPauseState",
  default: false,
});
export const isAddState = atom<boolean>({
  key: "isAddState",
  default: false,
});
export const addCountState = atom<number>({
  key: "addCountState",
  default: 0,
});
interface ItimeState {
  date: string;
  stopDate: string;
  focusSet: number;
  breakMin: number;
  breakSec: number;
  breakSet: number;
  min: number;
  sec: number;
  mSec: number;
  setBreakMin: number;
  setBreakSec: number;
  setBreakSet: number;
  setFocusMin: number;
  setFocusSec: number;
  setFocusSet: number;
  id: string;
  status: string;
}
export const timerState = atom<ItimeState>({
  key: "timerState",
  default: {
    date: Moment().format("YYYY-MM-DD"),
    stopDate: Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    focusSet: 0,
    breakMin: 0,
    breakSec: 0,
    breakSet: 0,
    min: 0,
    sec: 0,
    mSec: 0,
    setBreakMin: 0,
    setBreakSec: 0,
    setBreakSet: 0,
    setFocusMin: 0,
    setFocusSec: 0,
    setFocusSet: 0,
    id: "",
    status: "start",
  },
});
