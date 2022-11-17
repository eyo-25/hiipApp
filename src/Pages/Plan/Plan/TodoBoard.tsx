import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import { toDoEditState, toDoState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { motion } from "framer-motion";

function TodoBord({
  isWeek,
  setIsWeek,
}: {
  isWeek: boolean;
  setIsWeek: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cardVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.8,
        type: "linear",
      },
    },
  };

  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isEdit, setIsEdit] = useRecoilState(toDoEditState);
  const topRef = useRef<any>(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollIntoView(topRef.current as any, {
  //       behavior: "smooth",
  //     });
  //   }, 1000);
  // }, [isWeek]);
  return (
    <Wrapper>
      <Container ref={topRef} id="target">
        {toDos?.map((toDo, index) => (
          <CardWrapper
            variants={cardVariants}
            initial="normal"
            animate="animate"
            key={index}
          >
            <TodoCard setIsWeek={setIsWeek} />
          </CardWrapper>
        ))}
      </Container>
      <Background />
    </Wrapper>
  );
}
export default TodoBord;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const CardWrapper = styled(motion.div)`
  display: flex;
  width: 95%;
  height: 100%;
  margin: 0 0.5vh;
  z-index: 5;
`;
