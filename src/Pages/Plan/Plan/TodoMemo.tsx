import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectState, toDoEditState } from "../../../Recoil/atoms";
import MemoCard from "./MemoCard";

const TodoMemo = () => {
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
  const [isEdit, setIsEdit] = useRecoilState(toDoEditState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const navigate = useNavigate();
  const onOverlayClicked = (e: any) => {
    setIsEdit(false);
    setIsSelect(false);
    navigate("/plan");
  };
  return (
    <Wrapper>
      <Container>
        <ModalBox>
          <MemoWrapper>
            <MemoCard />
          </MemoWrapper>
        </ModalBox>
      </Container>
      <Overlay
        onClick={onOverlayClicked}
        variants={memoVariants}
        initial="normal"
        animate="animate"
      />
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
