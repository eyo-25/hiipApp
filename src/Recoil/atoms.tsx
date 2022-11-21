import { atom } from "recoil";

export interface ITodo {
  memo: string;
  todoId: string;
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [
    {
      memo: "오답체크 : 67번 오답을 보면 또 문제를 잘못 보았다. 옳은 ,틀린 같은 지문을 제대로 보도록 하자보완: 문제 풀때 옳은 ,틀린 단어에 밑줄을 먼저 그어 체크를 한다",
      todoId: "a",
    },
    { memo: "하하", todoId: "b" },
    { memo: "기모링", todoId: "c" },
    { memo: "", todoId: "d" },
    { memo: "개추요", todoId: "e" },
  ],
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
