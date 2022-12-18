import { useRecoilState } from "recoil";
import TimerSplash from "../../../Component/TimerSplash";
import {
  isBreakState,
  timerSplashState,
  timeState,
} from "../../../Recoil/atoms";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../../../firebase";
import TimerBoard from "./Timer/TimerBoard";

function Timer() {
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const params = useParams();
  const todoId = params.todoId;
  async function getTimeObj() {
    try {
      await dbService
        .collection("plan")
        .doc(`${todoId}`)
        .collection("timer")
        .doc("time")
        .get()
        .then((result: any) => {
          setTimeObj(result.data());
          if (
            result.data().breakSet >= result.data().focusSet &&
            result.data().focusSet !== 0
          ) {
            setIsBreakSet(true);
          } else {
            setIsBreakSet(false);
          }
        });
    } catch (e) {
      alert("Timer를 불러오는데 오류가 발생하였습니다. 다시 시도하여 주세요");
    }
  }

  useEffect(() => {
    getTimeObj();
    return () => {
      setIsTimerSplash(true);
    };
  }, []);
  if (isTimerSplash) {
    return <TimerSplash />;
  }
  return <TimerBoard />;
}

export default Timer;
