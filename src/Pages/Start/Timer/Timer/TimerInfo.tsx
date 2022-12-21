import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as PencilIcon } from "../../../../Assets/Icons/pencil.svg";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  loadState,
  toDoState,
} from "../../../../Recoil/atoms";
import { IoCloseSharp } from "react-icons/io5";
import { dbService } from "../../../../firebase";
import { useParams } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";

interface ITimerInfo {
  count: number;
  breakCount: number;
}

const FadeInVarients = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "linear",
    },
  },
};

function TimerInfo({ count, breakCount }: ITimerInfo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [memoText, setMemoText] = useState("");
  const inputRef = useRef<any>(null);
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((todo) => todo.id === todoId);

  const MemoVarients = {
    start: {
      height: "10vh",
    },
    end: {
      height: inputToggle ? "47vh" : "50px",
      transition: {
        duration: 0.7,
        type: "linear",
      },
    },
  };

  const memoChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMemoText(value);
  };

  //파이어베이스 plan > memo수정 요청
  async function saveMemoSubmit() {
    try {
      await dbService
        .collection("plan")
        .doc(`${todoId}`)
        .update({ memo: memoText });
    } catch (e) {
      alert(
        "서버 오류가 발생하여 To-Do생성이 실패 하였습니다. 다시 To-Do를 생성해 주세요."
      );
    }
  }
  const onInputBlur = async () => {
    if (toDos[index].memo !== memoText) {
      await saveMemoSubmit();
    }
    setInputToggle(false);
  };

  useEffect(() => {
    setMemoText(toDos[index].memo);
    setInputToggle(false);
    return () => {
      setMemoText("");
      setInputToggle(false);
      inputRef.current = null;
    };
  }, []);

  return (
    <Container>
      {!isPause && (
        <CounterWrapper variants={FadeInVarients} initial="start" animate="end">
          <ProgressBar count={count} breakCount={breakCount} />
          {!isBreakSet && (
            <WiseSaying>나중에 울지말고 지금 울면서하자</WiseSaying>
          )}
        </CounterWrapper>
      )}
      {isPause && (
        <PauseWrapper variants={FadeInVarients} initial="start" animate="end">
          <MemoWrapper>
            <IconWrapper>
              <PencilIcon />
              {inputToggle && <ExitIcon />}
            </IconWrapper>
            <MemoArea
              style={{ minHeight: inputToggle ? "180px" : "50px" }}
              variants={MemoVarients}
              initial="start"
              animate="end"
              ref={inputRef}
              value={memoText}
              onChange={memoChange}
              onFocus={() => setInputToggle(true)}
              onBlur={onInputBlur}
              placeholder="인터벌 끝나고 해야 할 일이나&#13;&#10;필요한 메모를 메모하세요"
            ></MemoArea>
          </MemoWrapper>
        </PauseWrapper>
      )}
    </Container>
  );
}

export default TimerInfo;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 25px;
`;
const CounterWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 206px;
  height: 5.6vh;
  min-height: 45px;
`;
const WiseSaying = styled.h4`
  position: absolute;
  bottom: 0;
  font-size: 14px;
  letter-spacing: -0.5px;
`;
const PauseWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  max-width: 414px;
  top: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 100;
`;
const MemoWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 auto;
  top: 150px;
  left: 0;
  right: 0;
  z-index: 120;
  width: 260px;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (max-height: 900px) {
    top: 120px;
  }
  @media screen and (max-height: 800px) {
    top: 80px;
  }
  @media screen and (max-height: 750px) {
    top: 60px;
  }
  @media screen and (max-height: 700px) {
    top: 50px;
  }
  @media screen and (max-height: 600px) {
    top: 40px;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  width: 100%;
`;
const ExitIcon = styled(IoCloseSharp)`
  width: 25px;
  height: 24px;
`;
const MemoArea = styled(motion.textarea)`
  line-height: 1.4;
  border: none;
  display: flex;
  width: 100%;
  margin-top: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  &::-webkit-scrollbar {
    width: 0;
  }
  &:focus {
    outline: 0;
  }
`;
