import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  timeState,
} from "../../../../Recoil/atoms";

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

interface IIntervalTimer {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  done: () => void;
}

function IntervalTimer({ count, start, stop, reset, done }: IIntervalTimer) {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [intervalSet, setIntervalSet] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);
  const params = useParams();
  const todoId = params.todoId;

  //파이어베이스 timer 업데이트
  async function updateTimeSubmit(type: string) {
    const isDone = type === "done";
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .doc("time")
        .update({
          focusSet: isDone ? 0 : timeObj.focusSet - 1,
          min: isDone ? 0 : timeObj.setFocusMin,
          sec: isDone ? 0 : timeObj.setFocusSec,
        });
    } catch (e) {
      alert("타이머 ERROR.");
    }
  }

  //count를 시간으로 변환하여 표현
  const timer = async () => {
    if (intervalSet <= 0) return;
    //done
    if (intervalSet === 1 && count <= 0) {
      await updateTimeSubmit("done");
      done();
      setTimeObj((prev) => {
        return {
          ...prev,
          focusSet: timeObj.focusSet - 1,
          min: 0,
          sec: 0,
          mSec: 0,
        };
      });
      return;
    }
    //count
    if (1 <= intervalSet && 0 < count) {
      const mathMin = Math.floor(count / 60 / 100);
      const mathSec = Math.floor((count - mathMin * 60 * 100) / 100);
      setMinutes(mathMin);
      setSecounds(mathSec);
      setMSecounds(Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)));
      setTimeObj((prev) => {
        return {
          ...prev,
          min: mathMin,
          sec: mathSec,
          mSec: Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)),
        };
      });
    }
    //NextSet
    if (1 < intervalSet && count <= 0) {
      await updateTimeSubmit("next");
      setIsBreakSet(true);
      setTimeObj((prev) => {
        return {
          ...prev,
          focusSet: timeObj.focusSet - 1,
          min: timeObj.setFocusMin,
          sec: timeObj.setFocusSec,
          mSec: 0,
        };
      });
      reset();
    }
  };

  //초기화
  useEffect(() => {
    setIntervalSet(timeObj.focusSet);
    setMinutes(timeObj.min);
    setSecounds(timeObj.sec);
    setIsPause(false);
    setTimeout(() => {
      start();
    }, 600);
    return () => {
      setIsPause(false);
      stop();
    };
  }, []);

  useEffect(() => {
    timer();
  }, [count]);

  return (
    <div>
      {!isPause && (
        <CounterWrapper
          variants={TextUpVarients}
          initial="coundStart"
          animate="end"
        >
          <CounterBox>
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
          </CounterBox>
        </CounterWrapper>
      )}
      {isPause && !inputToggle && (
        <CounterWrapper>
          <BreakBox
            variants={TextUpVarients}
            initial="coundStart"
            animate="end"
          >
            <h4>PAUSE</h4>
          </BreakBox>
          <BreakBox>
            <h5>다음 휴식까지</h5>
          </BreakBox>
          <BreakBox variants={TextUpVarients} initial="start" animate="end">
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
          </BreakBox>
          <BreakBox>
            <h5>진행된 SET</h5>
          </BreakBox>
          <BreakBox variants={TextUpVarients} initial="start" animate="end">
            <p style={{ marginBottom: 0 }}>
              {timeObj.setFocusSet - timeObj.focusSet}
            </p>
          </BreakBox>
        </CounterWrapper>
      )}
    </div>
  );
}

export default React.memo(IntervalTimer);

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
  margin-top: 3.5vh;
  display: flex;
  justify-content: center;
  p {
    display: flex;
    font-family: "Roboto";
    font-weight: 900;
    font-size: 85px;
    letter-spacing: -3px;
    &:nth-child(2) {
      margin-bottom: 5px;
      font-size: 75px;
      padding-left: 7px;
      padding-right: 5px;
    }
  }
`;
const BreakBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  h5 {
    margin-bottom: 10px;
  }
  h4 {
    font-family: "Roboto";
    font-weight: 900;
    font-size: 70px;
    letter-spacing: -1px;
    margin-bottom: 4.7vh;
    @media screen and (max-height: 650px) {
      font-size: 65px;
      margin-bottom: 20px;
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
      margin-top: 2px;
      font-size: 35px;
      padding-left: 3px;
      padding-right: 2px;
    }
  }
`;
