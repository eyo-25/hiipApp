import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Header from "../../Component/Header";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../Component/Button";
import CalendarBoard from "./Calendar/CalendarBoard";
import { Light_Gray } from "../../Styles/Colors";
import TodoBord from "./Plan/TodoBoard";

function Plan() {
  const [isWeek, setIsWeek] = useState(false);
  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeek ? "17%" : "90%",
      transition: {
        duration: 1,
        type: "linear",
      },
    },
  };
  const btnVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
        type: "linear",
      },
    },
  };
  return (
    <Applayout>
      <Header />
      <ContentContainer>
        <CalendarBox
          variants={calendarVariants}
          initial="normal"
          animate="animate"
        >
          <CalendarBoard isWeek={isWeek} />
        </CalendarBox>
        <TodoContainer
          variants={btnVariants}
          initial="normal"
          animate="animate"
          onClick={() => setIsWeek((prev) => !prev)}
        >
          <TodoBord isWeek={isWeek} />
        </TodoContainer>
      </ContentContainer>
      <ButtonContainer
        variants={btnVariants}
        initial="normal"
        animate="animate"
      >
        <Button isPlay={false} />
      </ButtonContainer>
    </Applayout>
  );
}

export default Plan;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 79.1%;
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const CalendarBox = styled(motion.div)`
  display: flex;
  width: 100%;
`;
const TodoContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 3.5vh 2.5vh;
  padding-bottom: 0;
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 13;
`;
