import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AddTimer from "./AddTimer";
import {
  inputFocusState,
  isAddState,
  isBreakState,
  isPauseState,
  timerState,
} from "../../../Recoil/atoms";
import { dbService } from "../../../firebase";

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 4,
  },
  coundStart: {
    opacity: 0,
    y: 6,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spling",
    },
  },
};

interface IBreakTimer {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  done: () => void;
}

function BreakTimer({ count, start, stop, reset, done }: IBreakTimer) {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [timerObj, setTimeObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [breakSet, setBreakSet] = useState(timerObj.breakSet);
  const [minutes, setMinutes] = useState(timerObj.breakMin);
  const [seconds, setSeconds] = useState(timerObj.breakSec);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const params = useParams();
  const todoId = params.todoId;

  //파이어베이스 timer 업데이트
  async function updateBreakSubmit(type: string) {
    const isDone = type === "done";
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .doc(timerObj.id)
        .update({
          breakSet: isDone ? 0 : timerObj.breakSet - 1,
          breakMin: isDone ? 0 : timerObj.setBreakMin,
          breakSec: isDone ? 0 : timerObj.setBreakSec,
        });
    } catch (e) {
      alert("타이머 ERROR.");
    }
  }

  //count를 시간으로 변환하여 표현
  const timer = async () => {
    if (breakSet <= 0) return;
    //done
    if (breakSet === 1 && count <= 0) {
      setSeconds(0);
      done();
      await updateBreakSubmit("done");
      setTimeObj((prev) => {
        return {
          ...prev,
          breakSet: 0,
          breakMin: 0,
          breakSec: 0,
        };
      });
      setIsBreakSet(false);
      return;
    }
    //count
    if (1 <= breakSet && 0 < count) {
      const mathMin = Math.floor(count / 60);
      const mathSec = Math.floor(count - mathMin * 60);
      setMinutes(mathMin);
      setSeconds(mathSec);
      setTimeObj((prev) => {
        return {
          ...prev,
          breakMin: mathMin,
          breakSec: mathSec,
        };
      });
    }
    //NextSet
    if (1 < breakSet && count <= 0) {
      setSeconds(0);
      await updateBreakSubmit("next");
      setIsBreakSet(false);
      setTimeObj((prev) => {
        return {
          ...prev,
          breakSet: timerObj.breakSet - 1,
          breakMin: timerObj.setBreakMin,
          breakSec: timerObj.setBreakSet,
        };
      });
      reset();
    }
  };

  useEffect(() => {
    setBreakSet(timerObj.breakSet);
  }, [timerObj]);

  //초기화
  useEffect(() => {
    setIsPause(false);
    start();
    return () => {
      setIsPause(false);
      stop();
      reset();
    };
  }, []);

  useEffect(() => {
    if (0 < timerObj.breakSet) {
      timer();
    }
  }, [count]);

  return (
    <>
      {!isPause && (
        <CounterWrapper>
          <CounterBox
            variants={TextUpVarients}
            initial="coundStart"
            animate="end"
          >
            <h4>
              <span>{timerObj.setFocusSet - timerObj.focusSet}</span>SET
            </h4>
            <h4>BREAK</h4>
          </CounterBox>
          <BreakBox>
            <h5>다음 세트까지</h5>
          </BreakBox>
          <BreakBox variants={TextUpVarients} initial="start" animate="end">
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
          </BreakBox>
        </CounterWrapper>
      )}
      {isPause && !inputToggle && (
        <CounterWrapper>
          {!isAdd && (
            <>
              <BreakBox
                variants={TextUpVarients}
                initial="coundStart"
                animate="end"
              >
                <h4>PAUSE</h4>
              </BreakBox>
              <BreakBox>
                <h5>다음 세트까지</h5>
              </BreakBox>
              <BreakBox variants={TextUpVarients} initial="start" animate="end">
                <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
                <p>:</p>
                <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
              </BreakBox>
              <BreakBox>
                <h5>진행된 SET</h5>
              </BreakBox>
              <BreakBox variants={TextUpVarients} initial="start" animate="end">
                <p>{timerObj.setFocusSet - timerObj.focusSet}</p>
              </BreakBox>
            </>
          )}
          {isAdd && <AddTimer />}
        </CounterWrapper>
      )}
    </>
  );
}

export default React.memo(BreakTimer);

const CounterWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 58%;
  @media screen and (max-height: 800px) {
    height: 62%;
  }
  @media screen and (max-height: 750px) {
    height: 65%;
  }
`;
const CounterBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 7.8vh;
  @media screen and (max-height: 700px) {
    margin-bottom: 5vh;
  }
  h4 {
    font-family: "Roboto";
    font-weight: 900;
    font-size: 65px;
    line-height: 1.1;
    @media screen and (max-height: 700px) {
      font-size: 60px;
    }
  }
  span {
    margin-right: 4px;
  }
`;
const BreakBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  h5 {
    margin-bottom: 10px;
    @media screen and (max-height: 650px) {
      margin-bottom: 5px;
    }
  }
  h4 {
    font-family: "Roboto";
    font-weight: 900;
    font-size: 70px;
    letter-spacing: -1px;
    margin-bottom: 4.7vh;
    @media screen and (max-height: 650px) {
      margin-bottom: 20px;
      font-size: 65px;
    }
  }
  p {
    display: flex;
    font-family: "Roboto";
    font-weight: 900;
    font-size: 50px;
    letter-spacing: -1px;
    margin-bottom: 3.5vh;
    @media screen and (max-height: 650px) {
      margin-bottom: 15px;
    }
    &:nth-child(2) {
      margin-top: 5px;
      font-size: 35px;
      padding-left: 3px;
      padding-right: 2px;
    }
  }
`;
