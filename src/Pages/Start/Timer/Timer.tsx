import { useRecoilState } from "recoil";
import TimerSplash from "../../../Component/TimerSplash";
import {
  isBreakState,
  isPauseState,
  timerSplashState,
  timerState,
  toDoState,
} from "../../../Recoil/atoms";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { authService, dbService } from "../../../firebase";
import { motion } from "framer-motion";
import IntervalTimer from "./Timer/IntervalTimer";
import BreakTimer from "./Timer/BreakTimer";
import styled from "styled-components";
import Background from "../../../Assets/image/bull.png";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, query } from "firebase/firestore";

const bottomVariants = {
  normal: {
    opacity: 0,
    height: "0",
  },
  animate: {
    opacity: 1,
    height: "80%",
    transition: {
      delat: 0.1,
      duration: 1,
      type: "linear",
    },
  },
};

function Timer() {
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);
  const Moment = require("moment");

  const timeObj = useRef<any>({});
  const now = Moment(new Date()).format("YYYY-MM-DD");
  const defaultSet = toDos[index].defaultSet;
  const newObj = {
    date: Moment(new Date()).format("YYYY-MM-DD"),
    stopDate: Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    setFocusSet: defaultSet,
    setBreakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
    focusSet: defaultSet,
    breakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
    //테스트 끝나면 분만 적용
    setFocusMin: 0,
    setFocusSec: 10,
    setBreakMin: 0,
    setBreakSec: 5,
    min: 0,
    sec: 10,
    breakMin: 0,
    breakSec: 5,
  };

  //오늘날짜 타이머 체크후 없으면 생성
  async function getTimeObj() {
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .where("date", "==", now)
        .get()
        .then((result: any) => {
          result.forEach((timerData: any) => {
            timeObj.current = timerData.data();
          });
        });
    } catch {
      alert("Timer를 불러오는데 오류가 발생하였습니다. 다시 시도하여 주세요");
    } finally {
      if (Object.keys(timeObj.current).length <= 0) {
        await dbService
          .collection("plan")
          .doc(todoId)
          .collection("timer")
          .add(newObj);
      }
    }
  }
  //타이머 변경감지
  useEffect(() => {
    const q = query(
      dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .where("date", "==", now)
    );
    const addId = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTimerObj({ ...newArray[0] });
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        addId();
      }
    });
  }, []);

  useEffect(() => {
    setIsPause(false);
    getTimeObj();
    if (timerObj.focusSet <= timerObj.breakSet && timerObj.breakSet !== 0) {
      setIsBreakSet(true);
    }
    return () => {
      setIsTimerSplash(true);
      setIsBreakSet(false);
      timeObj.current = {};
    };
  }, []);

  if (isTimerSplash) {
    return <TimerSplash />;
  }
  return (
    <Container>
      {!isBreakSet && <IntervalTimer />}
      {isBreakSet && <BreakTimer />}
      <BottomGradient
        variants={bottomVariants}
        initial="normal"
        animate="animate"
        iscolor={isPause ? "Red" : "Blue"}
      />
      <BackgroundImg />
    </Container>
  );
}

export default Timer;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 414px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 20;
`;
const BackgroundImg = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;
const BottomGradient = styled(motion.div)<{ iscolor: string }>`
  z-index: 5;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    70%,
    ${(props) => props.iscolor}
  );
`;
