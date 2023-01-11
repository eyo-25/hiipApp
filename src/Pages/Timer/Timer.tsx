import { useRecoilState } from "recoil";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Background from "../../Assets/image/bull.png";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, query } from "firebase/firestore";
import TimerBoard from "./Timer/TimerBoard";
import {
  isBreakState,
  isPauseState,
  timerSplashState,
  timerState,
  timerToDoState,
} from "../../Recoil/atoms";
import { authService, dbService } from "../../firebase";
import TimerSplash from "../../Component/TimerSplash";
import { defaultTimer } from "../../Utils/interface";

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
  const [toDo, setToDo] = useRecoilState(timerToDoState);
  const params = useParams();
  const todoId = params.todoId;
  const Moment = require("moment");
  const timeObj = useRef<any>({});
  const now = Moment().format("YYYY-MM-DD");

  // async function getToDoObj() {
  //   try {
  //     await dbService
  //       .collection("plan")
  //       .doc(todoId)
  //       .get()
  //       .then((result) => {
  //         setToDo(result.data());
  //       });
  //   } catch {}
  // }

  //오늘날짜 타이머 체크후 없으면 생성 + timerIndex늘리기
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
        const defaultSet = toDo.defaultSet;
        const newObj = {
          date: now,
          addSet: 0,
          setFocusSet: defaultSet,
          setBreakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
          focusSet: defaultSet,
          breakSet: defaultSet - 1 <= 0 ? 0 : defaultSet - 1,
          successCount: toDo.successCount,
          //테스트 끝나면 분만 적용
          setFocusMin: 0,
          setFocusSec: 10,
          setBreakMin: 0,
          setBreakSec: 5,
          min: 0,
          sec: 10,
          breakMin: defaultSet - 1 <= 0 ? 0 : 0,
          breakSec: defaultSet - 1 <= 0 ? 0 : 5,
          startTime: Moment().format("YYYY-MM-DD HH:mm:ss"),
          endTime: "",
          todoId: todoId,
          status: "start",
          usedCount: 0,
          timerIndex: toDo.timerIndex,
        };

        const createTimer = () =>
          dbService
            .collection("plan")
            .doc(todoId)
            .collection("timer")
            .add(newObj);
        const timerIndexIncrease = () =>
          dbService
            .collection("plan")
            .doc(todoId)
            .get()
            .then(async (result: any) => {
              await dbService
                .collection("plan")
                .doc(todoId)
                .update({ timerIndex: result.data().timerIndex + 1 });
            });

        await Promise.all([createTimer(), timerIndexIncrease()]);
      } else {
        if (timeObj.current.focusSet === 0) {
          setIsBreakSet(false);
          setIsPause(true);
        } else if (timeObj.current.focusSet <= timeObj.current.breakSet) {
          setIsBreakSet(true);
          setIsPause(false);
        } else {
          setIsBreakSet(false);
          setIsPause(false);
        }
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

  // useLayoutEffect(() => {
  //   //toDo장착
  //   getToDoObj();
  // }, []);

  //초기화
  useEffect(() => {
    //오늘날짜에 todo 기간이 없으면 home으로 navigate
    if (toDo) {
      getTimeObj();
    }
    return () => {
      setIsTimerSplash(true);
      setIsBreakSet(false);
      timeObj.current = {};
      setTimerObj(defaultTimer);
    };
  }, []);

  if (isTimerSplash) {
    return <TimerSplash />;
  }
  return (
    <Container>
      <TimerBoard />
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
