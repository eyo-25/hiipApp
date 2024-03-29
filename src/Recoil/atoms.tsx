import { atom } from "recoil";
import { defaultTimer, ItimeState } from "../Utils/interface";

const Moment = require("moment");

export interface ITodo {
  endDate: string;
  index: number;
  timerIndex: number;
  successCount: number;
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
export const timerToDoState = atom<any>({
  key: "timerToDoState",
  default: {},
});
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
export const timerState = atom<ItimeState>({
  key: "timerState",
  default: defaultTimer,
});

export interface IstartTodo {
  endDate: string;
  index: number;
  timerIndex: number;
  successCount: number;
  defaultSet: number;
  memo: string;
  planSubTitle: string;
  planTitle: string;
  startDate: string;
  status: string;
  todoId: any;
  id: string;
  addSet: number;
  timerFocusSet: number;
  timerSetFocusSet: number;
  timerStatus: string;
  timerAddSet: number;
}

//start
export const startTodoState = atom<IstartTodo[]>({
  key: "startTodoState",
  default: [],
});
export const endTodoState = atom<any[]>({
  key: "endTodoState",
  default: [],
});
//feedBack
export const feedBackTodoState = atom<ITodo[]>({
  key: "feedBackTodoState",
  default: [],
});
export const feedBackTimerState = atom<any[]>({
  key: "feedBackTimerState",
  default: [
    { successPercent: 0 },
    { successPercent: 0 },
    { successPercent: 0 },
    { successPercent: 0 },
    { successPercent: 0 },
    { successPercent: 0 },
    { successPercent: 0 },
  ],
});
