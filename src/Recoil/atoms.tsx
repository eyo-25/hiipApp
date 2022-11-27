import { atom, selector } from "recoil";

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
export const inputFocusState = atom({
  key: "inputFocusState",
  default: false,
});
//
export const startDateState = atom({
  key: "startDateState",
  default: "",
});
// export const startChange = selector<any>({
//   key: "startChange",
//   get: ({ get }) => {
//     const oldStartDate = get(startDateState);
//     if (oldStartDate !== "") {
//       return new Date(oldStartDate.split("-") + "");
//     }
//     return null;
//   },
//   set: ({ set }, newValue) => {
//     let newStartDate = newValue;
//     if (newStartDate !== null) {
//       newStartDate = Moment(newValue).format("YYYY-MM-DD");
//     }
//     set(startDateState, newStartDate);
//   },
// });
export const endDateState = atom({
  key: "endDateState",
  default: "",
});
export const projectTitleState = atom({
  key: "projectTitleState",
  default: "",
});
