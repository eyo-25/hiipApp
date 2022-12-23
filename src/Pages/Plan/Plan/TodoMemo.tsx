import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../firebase";
import {
  selectState,
  cardEditState,
  toDoState,
  loadState,
} from "../../../Recoil/atoms";
import { useState, useRef } from "react";
import MemoCard from "./MemoCard";
import useOnClickOutSide from "../../../hooks/useOnClickOutSide";

const memoVariants = {
  normal: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0px)",
  },
  animate: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(1.5px)",
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

const TodoMemo = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [memoText, setMemoText] = useState("");
  const [isEdit, setIsEdit] = useRecoilState(cardEditState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const [isLoad, setIsLoad] = useRecoilState(loadState);
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);
  const navigate = useNavigate();
  const memoRef = useRef<any>();

  //파이어베이스 plan > memo수정 요청
  async function saveMemoSubmit() {
    try {
      await dbService
        .collection("plan")
        .doc(`${toDos[index].id}`)
        .update({ memo: memoText });
    } catch (e) {
      alert(
        "서버 오류가 발생하여 memo작성이 실패 하였습니다. 다시 memo작성을 생성해 주세요."
      );
    }
  }
  //클릭함수
  const reset = () => {
    setIsEdit(false);
  };
  const onInputBlur = async () => {
    if (toDos[index].memo !== memoText) {
      await saveMemoSubmit();
    }
  };

  useOnClickOutSide(memoRef, () => {
    if (toDos[index].memo !== memoText) {
      saveMemoSubmit().then(() => {
        reset();
        navigate("/plan");
        setIsSelect(false);
      });
    }
    reset();
    navigate("/plan");
    setIsSelect(false);
  });

  return (
    <Wrapper>
      <Container>
        <ModalBox>
          <MemoWrapper ref={memoRef}>
            <MemoCard
              memoText={memoText}
              setMemoText={setMemoText}
              onInputBlur={onInputBlur}
            />
          </MemoWrapper>
        </ModalBox>
      </Container>
      <Overlay variants={memoVariants} initial="normal" animate="animate" />
    </Wrapper>
  );
};

export default TodoMemo;

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  z-index: 99;
`;
export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 98;
  cursor: pointer;
`;
export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 414px;
  padding: 0 2.5vh;
  margin: 0 auto;
  z-index: 999;
  cursor: pointer;
`;
export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  z-index: 999;
`;
export const MemoWrapper = styled(motion.div)`
  display: flex;
  width: 95%;
  height: 100%;
  margin: 0 0.5vh;
  z-index: 5;
`;
