import { useState } from "react";
import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Button from "../../Component/Button";
import { Normal_Gray } from "../../Styles/Colors";
import { motion } from "framer-motion";
import Background from "../../Assets/image/start_background2.png";
import TodoBord from "./Home/TodoBord";
import { useRecoilState } from "recoil";
import { toDoState } from "../../Recoil/atoms";

function Home() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isReady, setIsReady] = useState(false);
  const [isFadeout, setIsFadeout] = useState(false);
  const btnVariants = {
    normal: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };
  const bottomVariants = {
    normal: {
      height: "-1vh",
      transition: {
        duration: 0.3,
        type: "linear",
      },
    },
    animate: {
      height: isReady && toDos.length > 0 ? "59vh" : "23vh",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };
  const onPlayClick = () => {
    if (toDos.length <= 0) return;
    setIsReady(true);
    setTimeout(() => {
      setIsFadeout(true);
    }, 400);
  };
  const onBackClick = () => {
    setIsReady(false);
    setTimeout(() => {
      setIsFadeout(false);
    }, 400);
  };

  return (
    <Applayout>
      <BackgroundBox onClick={onBackClick}>
        <BackgroundImg isFadeout={isFadeout && toDos.length > 0} />
      </BackgroundBox>
      <TodoBox variants={bottomVariants} initial="normal" animate="animate">
        <TodoBord isReady={isReady} />
      </TodoBox>
      <ButtonContainer
        variants={btnVariants}
        initial="normal"
        animate="animate"
        onClick={onPlayClick}
      >
        <Button isPlay={toDos.length > 0 ? true : false} />
      </ButtonContainer>
    </Applayout>
  );
}

export default Home;

const BackgroundBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: powderblue;
`;

const BackgroundImg = styled.div<{ isFadeout: boolean }>`
  cursor: ${(props) => (props.isFadeout ? "pointer" : null)};
  width: 100%;
  height: 100%;
  justify-content: center;
  background-image: ${(props) =>
      props.isFadeout
        ? "linear-gradient(rgba(0, 0, 0, 0.5), 40%, rgba(0, 0, 0, 0.9)),"
        : "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),"}
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
  transition: all linear 5s;
`;

const TodoBox = styled(motion.div)`
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  z-index: 1;
  display: flex;
  width: 100%;
  padding: 3vh 2.5vh;
  padding-bottom: 0;
  background-color: ${Normal_Gray};
  overflow: hidden;
`;

const ButtonContainer = styled(motion.div)``;
