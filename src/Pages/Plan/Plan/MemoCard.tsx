import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as SaveIcon } from "../../../Assets/Icons/save.svg";
import {
  IconBox,
  IntervalBar,
  IntervalBarBox,
  IntervalBox,
  Item,
  MemoForm,
  StartBtn,
  StatusBox,
  TextBox,
  TitleBox,
} from "./TodoCard";
import { Dark_Gray2 } from "../../../Styles/Colors";
import { useRecoilState } from "recoil";
import { toDoState } from "../../../Recoil/atoms";
import { useParams } from "react-router-dom";

interface iMemoProps {
  memoText: string;
  setMemoText: React.Dispatch<React.SetStateAction<string>>;
  onSaveClick: () => Promise<void>;
}

function MemoCard({ memoText, setMemoText, onSaveClick }: iMemoProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const inputRef = useRef<any>(null);
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);
  const [intervalArray, setIntervalArray] = useState<number[]>([]);

  useEffect(() => {
    setIntervalArray((prev) => {
      const set = toDos[index].defaultSet;
      const copy = [...prev];
      for (let index = 0; index < set; index++) {
        copy[index] = index;
      }
      return [...copy];
    });
  }, []);

  const cardVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6,
        type: "spling",
      },
    },
  };
  useEffect(() => {
    setMemoText(toDos[index].memo);
  }, []);
  const onTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMemoText(value);
  };
  return (
    <>
      <TodoCarWrapper
        variants={cardVariants}
        initial="normal"
        animate="animate"
      >
        <TodoTopBox>
          <TextBox>
            <TitleBox>
              <h4>{toDos[index].planTitle}</h4>
              <StatusBox>
                <h5>진행중</h5>
              </StatusBox>
            </TitleBox>
            <p>{toDos[index].planSubTitle}</p>
          </TextBox>
          <IntervalBox>
            <h4>{toDos[index].defaultSet}</h4>
            <p>SET</p>
            <StartBtn />
          </IntervalBox>
        </TodoTopBox>
        <MemoContainer>
          <MemoForm>
            <MemoInput
              placeholder="계획 실천 후 피드백이나 &#13;&#10;실천 중 메모를 적어주세요"
              ref={inputRef}
              required
              value={memoText}
              onChange={onTextChange}
            />
            <IconBox>
              <Item onClick={onSaveClick}>
                <SaveIcon />
                <p>저장</p>
              </Item>
            </IconBox>
          </MemoForm>
        </MemoContainer>
        <IntervalBarBox>
          {intervalArray.map((index) => (
            <IntervalBar key={index} />
          ))}
        </IntervalBarBox>
      </TodoCarWrapper>
    </>
  );
}

export default MemoCard;

const TodoCarWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  height: 405px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  z-index: 999;
  @media screen and (max-height: 700px) {
    height: 355px;
  }
  @media screen and (max-height: 460px) {
    height: 280px;
  }
  @media screen and (max-height: 360px) {
    height: 80vh;
  }
`;
const MemoInput = styled.textarea`
  font-weight: 600;
  line-height: 1.4;
  border: none;
  display: flex;
  width: 100%;
  height: 80%;
  margin-bottom: 5%;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  &::placeholder {
    color: ${Dark_Gray2};
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  &:focus {
    outline: 0;
  }
`;
const TodoTopBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;
const MemoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 5;
  overflow: hidden;
`;
