import { useEffect, useRef } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import { toDoState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { scrollIntoView } from "seamless-scroll-polyfill";

const bottomVariants = {
  normal: {
    opacity: 0,
    height: "0vh",
  },
  animate: {
    opacity: 1,
    height: "7vh",
    transition: {
      delay: 0.5,
      duration: 0.8,
      type: "linear",
    },
  },
};

function TodoBord({ isReady }: { isReady: boolean }) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const topRef = useRef<any>(null);
  //클릭이벤트시 사용
  // const topClick = () => {
  //   topRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  useEffect(() => {
    if (!isReady) {
      setTimeout(() => {
        scrollIntoView(topRef.current as any, {
          behavior: "smooth",
        });
      }, 600);
    }
    return;
  }, [isReady]);
  return (
    <Wrapper isReady={isReady}>
      <Container ref={topRef}>
        {toDos?.map((toDo, index) => (
          <CardWrapper key={index}>
            <TodoCard />
          </CardWrapper>
        ))}
      </Container>
      <BottomGradient
        variants={bottomVariants}
        initial="normal"
        animate="animate"
      />
    </Wrapper>
  );
}

export default TodoBord;

const Wrapper = styled.div<{ isReady: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: ${(props) => (props.isReady ? "scroll" : "hidden")};
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
const CardWrapper = styled.div`
  display: flex;
  width: 95%;
  margin: 0 0.5vh;
  &:first-child {
    div:first-child {
      background-color: white;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
      div {
        box-shadow: none;
      }
    }
    li {
      background-color: black;
    }
  }
`;
const BottomGradient = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, white, 80%, rgba(0, 0, 0, 0));
  @media screen and (max-height: 800px) {
    height: 6vh;
    background: linear-gradient(to top, white, 70%, rgba(0, 0, 0, 0));
  }
`;
