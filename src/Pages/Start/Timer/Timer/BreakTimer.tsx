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
interface IBreakTimer {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  done: () => void;
}

function BreakTimer({ count, start, stop, reset, done }: IBreakTimer) {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [breakSet, setBreakSet] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);

  //count를 시간으로 변환하여 표현
  const timer = () => {
    if (breakSet <= 0) return;
    if (breakSet !== 0) {
      if (count <= 0) {
        setIsBreakSet(false);
        if (breakSet === 1) {
          done();
          return;
        }
        setTimeObj((prev) => {
          return {
            ...prev,
            breakSet: timeObj.breakSet - 1,
            breakMin: timeObj.setBreakMin,
            breakSec: timeObj.setBreakSec,
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
          breakMin: mathMin,
          breakSec: mathSec,
          mSec: Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)),
        };
      });
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
            >
              <h4>
                <span>{breakSet}</span>SET
              </h4>
              <h4>BREAK</h4>
            </CounterBox>
            <BreakBox>
              <h5>다음 세트까지</h5>
            </BreakBox>
            <BreakBox
              variants={TimerUpVarients}
              initial="countStart"
              animate="countEnd"
              exit="exit"
            >
              <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
              <p>:</p>
              <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
            </BreakBox>
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
            <h5>다음 세트까지</h5>
          </BreakBox>
          <BreakBox
            variants={TimerUpVarients}
            initial="countStart"
            animate="countEnd"
            exit="exit"
          >
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{secounds < 10 ? `0${secounds}` : secounds}</p>
          </BreakBox>
          <BreakBox>
            <h5>진행된 SET</h5>
          </BreakBox>
          <BreakBox>
            <p>{breakSet}</p>
          </BreakBox>
        </CounterWrapper>
      )}
    </div>
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
  @media screen and (max-height: 600px) {
    height: 74%;
  }
`;
const CounterBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 7.8vh;
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
