import { useRecoilState } from "recoil";
import {
  inputFocusState,
  isAddState,
  isBreakState,
  isPauseState,
  timerSplashState,
  timerState,
  timerToDoState,
  toDoState,
} from "../../../Recoil/atoms";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { authService, dbService } from "../../../firebase";
import IntervalTimer from "./IntervalTimer";
import BreakTimer from "./BreakTimer";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, query } from "firebase/firestore";
import { useCounter } from "../../../hooks/useCounter";
import { isAndroid } from "react-device-detect";
import TimerInfo from "./TimerInfo";
import TimerButton from "./TimerButton";

function TimerBoard() {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const params = useParams();
  const todoId = params.todoId;
  const Moment = require("moment");

  const { count, start, stop, reset, done } = useCounter(
    timerObj.min * 60 + timerObj.sec,
    timerObj.setFocusMin * 60 + timerObj.setFocusSec
  );

  const {
    count: breakCount,
    start: breakStart,
    stop: breakStop,
    reset: breakReset,
    done: breakDone,
  } = useCounter(
    timerObj.breakMin * 60 + timerObj.breakSec,
    timerObj.setBreakMin * 60 + timerObj.setBreakSec
  );

  // const timeObj = useRef<any>({});
  // const now = Moment(new Date()).format("YYYY-MM-DD");
  // const defaultSet = toDo.defaultSet;
  // const newObj = {
  //   date: Moment(new Date()).format("YYYY-MM-DD"),
  //   stopDate: Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  //   setFocusSet: defaultSet,
  //   setBreakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
  //   focusSet: defaultSet,
  //   breakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
  //   //테스트 끝나면 분만 적용
  //   setFocusMin: 0,
  //   setFocusSec: 10,
  //   setBreakMin: 0,
  //   setBreakSec: 5,
  //   min: 0,
  //   sec: 10,
  //   breakMin: 0,
  //   breakSec: 5,
  // };

  //오늘날짜 타이머 체크후 없으면 생성
  // async function getTimeObj() {
  //   try {
  //     await dbService
  //       .collection("plan")
  //       .doc(todoId)
  //       .collection("timer")
  //       .where("date", "==", now)
  //       .get()
  //       .then((result: any) => {
  //         result.forEach((timerData: any) => {
  //           timeObj.current = timerData.data();
  //         });
  //       });
  //   } catch {
  //     alert("Timer를 불러오는데 오류가 발생하였습니다. 다시 시도하여 주세요");
  //   } finally {
  //     if (Object.keys(timeObj.current).length <= 0) {
  //       await dbService
  //         .collection("plan")
  //         .doc(todoId)
  //         .collection("timer")
  //         .add(newObj);
  //     }
  //   }
  // }

  //타이머 변경감지
  // useEffect(() => {
  //   const q = query(
  //     dbService
  //       .collection("plan")
  //       .doc(todoId)
  //       .collection("timer")
  //       .where("date", "==", now)
  //   );
  //   const addId = onSnapshot(q, (querySnapshot) => {
  //     const newArray = querySnapshot.docs.map((doc: any) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });
  //     setTimerObj({ ...newArray[0] });
  //   });
  //   onAuthStateChanged(authService, (user) => {
  //     if (user == null) {
  //       addId();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setIsAdd(false);
    // getTimeObj();
    return () => {
      setIsTimerSplash(true);
      setIsAdd(false);
      // timeObj.current = {};
    };
  }, []);

  return (
    <>
      <ContentsWrapper>
        <>
          {!isAdd && (
            <InfoWrapper>
              <TimerInfo count={isBreakSet ? breakCount : count} />
            </InfoWrapper>
          )}
          {!isBreakSet && (
            <IntervalTimer
              count={count}
              start={start}
              stop={stop}
              reset={reset}
              done={done}
            />
          )}
          {isBreakSet && (
            <BreakTimer
              count={breakCount}
              start={breakStart}
              stop={breakStop}
              reset={breakReset}
              done={breakDone}
            />
          )}
        </>
      </ContentsWrapper>
      {!(isAndroid && inputToggle) && (
        <ButtonWrapper>
          <TimerButton
            count={isBreakSet ? breakCount : count}
            stop={isBreakSet ? breakStop : stop}
            start={isBreakSet ? breakStart : start}
            reset={isBreakSet ? breakReset : reset}
            breakReset={breakReset}
            breakStop={breakStop}
          />
        </ButtonWrapper>
      )}
    </>
  );
}

export default TimerBoard;

const ContentsWrapper = styled.div`
  position: relative;
  z-index: 10;
  height: 70%;
  width: 100%;
  color: white;
`;
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  height: 30%;
  width: 100%;
  z-index: 10;
`;
const InfoWrapper = styled.div`
  height: 42%;
  @media screen and (max-height: 800px) {
    height: 38%;
  }
  @media screen and (max-height: 750px) {
    height: 35%;
  }
`;
