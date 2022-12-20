import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  timeState,
} from "../../../../Recoil/atoms";
import { dbService } from "../../../../firebase";
import { useParams } from "react-router-dom";
import { useCounter } from "../../../../hooks/useCounter";
import TimerInfo from "./TimerInfo";
import TimerButton from "./TimerButton";
import { isAndroid } from "react-device-detect";

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 4,
  },
  coundStart: {
    opacity: 0,
    y: 2,
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

function BreakTimer() {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [breakSet, setBreakSet] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const { count, start, stop, reset, done } = useCounter(
    timeObj.breakMin,
    timeObj.breakSec
  );
  const params = useParams();
  const todoId = params.todoId;

  //파이어베이스 timer 업데이트
  async function updateBreakSubmit(type: string) {
    const isTime = type === "count";
    const isDone = type === "done";
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .doc("time")
        .update({
          breakSet: isDone ? 0 : timeObj.breakSet - 1,
          breakMin: isDone ? 0 : timeObj.setBreakMin,
          breakSec: isDone ? 0 : timeObj.setBreakSec,
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
      await updateBreakSubmit("done");
      done();
      setTimeObj((prev) => {
        return {
          ...prev,
          breakSet: 0,
          breakMin: 0,
          breakSec: 0,
          mSec: 0,
        };
      });
      setIsBreakSet(false);
      return;
    }
    //count
    if (1 <= breakSet && 0 < count) {
      const mathMin = Math.floor(count / 60 / 100);
      const mathSec = Math.floor((count - mathMin * 60 * 100) / 100);
      setMinutes(mathMin);
      setSecounds(mathSec);
      setMSecounds(Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)));
      setTimeObj((prev) => {
        return {
          ...prev,
          breakMin: mathMin,
          breakSec: mathSec,
          mSec: Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)),
        };
      });
    }
    //NextSet
    if (1 < breakSet && count <= 0) {
      await updateBreakSubmit("next");
      setIsBreakSet(false);
      setTimeObj((prev) => {
        return {
          ...prev,
          breakSet: timeObj.breakSet - 1,
          breakMin: timeObj.setBreakMin,
          breakSec: timeObj.setBreakSet,
          mSec: 0,
        };
      });
      reset();
    }
  };

  //초기화
  useEffect(() => {
    setBreakSet(timeObj.breakSet);
    setMinutes(timeObj.breakMin);
    setSecounds(timeObj.breakSec);
    setIsPause(false);
    setTimeout(() => {
      start();
    }, 600);
    return () => {
      setIsPause(false);
      stop();
      reset();
    };
  }, []);

  useEffect(() => {
    timer();
  }, [count]);

  return (
    <>
      <ContentsWrapper>
        <InfoWrapper>
          <TimerInfo count={0} breakCount={count} />
        </InfoWrapper>
        {!isPause && (
          <CounterWrapper>
            <CounterBox
              variants={TextUpVarients}
              initial="coundStart"
              animate="end"
            >
              <h4>
                <span>{timeObj.setFocusSet - timeObj.focusSet}</span>SET
              </h4>
              <h4>BREAK</h4>
            </CounterBox>
            <BreakBox>
              <h5>다음 세트까지</h5>
            </BreakBox>
            <BreakBox variants={TextUpVarients} initial="start" animate="end">
              <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
              <p>:</p>
              <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
            </BreakBox>
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
              <h5>다음 세트까지</h5>
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
              <p>{timeObj.setFocusSet - timeObj.focusSet}</p>
            </BreakBox>
          </CounterWrapper>
        )}
      </ContentsWrapper>
      {!(isAndroid && inputToggle) && (
        <ButtonWrapper>
          <TimerButton count={count} stop={stop} start={start} />
        </ButtonWrapper>
      )}
    </>
  );
}

export default React.memo(BreakTimer);

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
const InfoWrapper = styled.div`
  height: 42%;
  @media screen and (max-height: 800px) {
    height: 38%;
  }
  @media screen and (max-height: 750px) {
    height: 35%;
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
