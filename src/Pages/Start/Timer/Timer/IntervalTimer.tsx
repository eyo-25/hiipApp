import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  isBreakState,
  isPauseState,
  timeState,
} from "../../../../Recoil/atoms";

const TimerUpVarients = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "ease",
    },
  },
  countStart: {
    opacity: 1,
  },
  countEnd: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "ease",
    },
  },
  exit: {
    opacity: 1,
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
  const [intervalSet, setIntervalSet] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);

  //count를 시간으로 변환하여 표현
  const timer = () => {
    if (intervalSet <= 0) return;
    if (intervalSet !== 0) {
      if (count <= 0) {
        if (intervalSet === 1) {
          done();
          return;
        }
        setIsBreakSet(true);
        setTimeObj((prev) => {
          return {
            ...prev,
            FocusSet: timeObj.FocusSet - 1,
            min: timeObj.setFocusMin,
            sec: timeObj.setFocusSec,
            mSec: 0,
          };
        });
        reset();
        return;
      }
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
  };

  //초기화
  useEffect(() => {
    setIntervalSet(timeObj.FocusSet);
    setMinutes(timeObj.min);
    setSecounds(timeObj.sec);
    setIsPause(false);
    setTimeout(() => {
      start();
    }, 700);
    return () => {
      setIsPause(false);
      stop();
    };
  }, []);

  useEffect(timer, [count]);

  return (
    <div>
      {!isPause && (
        <CounterWrapper
          variants={TimerUpVarients}
          initial="start"
          animate="end"
        >
          <AnimatePresence>
            <CounterBox
              variants={TimerUpVarients}
              initial="countStart"
              animate="countEnd"
              exit="exit"
              layoutId="count"
            >
              <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
              <p>:</p>
              <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
            </CounterBox>
          </AnimatePresence>
        </CounterWrapper>
      )}
      {isPause && (
        <CounterWrapper
          variants={TimerUpVarients}
          initial="start"
          animate="countEnd"
        >
          <BreakBox>
            <h4>PAUSE</h4>
          </BreakBox>
          <BreakBox>
            <h5>다음 휴식까지</h5>
          </BreakBox>
          <AnimatePresence>
            <BreakBox
              variants={TimerUpVarients}
              initial="countStart"
              animate="countEnd"
              exit="exit"
              layoutId="count"
            >
              <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
              <p>:</p>
              <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
            </BreakBox>
          </AnimatePresence>
          <BreakBox>
            <h5>진행된 SET</h5>
          </BreakBox>
          <BreakBox>
            <p>{intervalSet}</p>
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
  @media screen and (max-height: 600px) {
    height: 74%;
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
      margin-bottom: 10px;
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
