import { atom } from "recoil";

export const toDoState = atom<number[]>({
  key: "toDo",
  default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // default: [],
});
