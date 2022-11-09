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
import ProjectInfo from "./Home/ProjectInfo";

function Home() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isReady, setIsReady] = useState(false);
  const [isFadeout, setIsFadeout] = useState(false);
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
  const bottomVariants = {
    normal: {
      height: "0vh",
      transition: {
        duration: 0.3,
        type: "linear",
      },
    },
    animate: {
      height: isReady && toDos.length > 0 ? "57vh" : "23vh",
      transition: {
        duration: 0.8,
        type: "linear",
      },
    },
  };
  const bgVariants = {
    normal: {
      background: "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4))",
    },
    animate: {
      background: isFadeout
        ? "linear-gradient(rgba(0, 0, 0, 0.5), 40%, rgba(0, 0, 0, 0.9))"
        : "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4))",
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
      <ContentContainer>
        <InfoContainer isFadeout={isFadeout && toDos.length > 0}>
          <ProjectInfo isReady={isReady} onBackClick={onBackClick} />
          <BackgroundImg />
        </InfoContainer>
        <BackgroundCover
          onClick={onBackClick}
          variants={bgVariants}
          initial="normal"
          animate="animate"
        />
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
      </ContentContainer>
    </Applayout>
  );
}

export default Home;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 90vh;
  overflow: hidden;
`;
const InfoContainer = styled.div<{ isFadeout: boolean }>`
  cursor: ${(props) => (props.isFadeout ? "pointer" : null)};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const BackgroundCover = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;
const TodoBox = styled(motion.div)`
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  z-index: 2;
  display: flex;
  width: 100%;
  padding: 3vh 2.5vh;
  padding-bottom: 0;
  background-color: ${Normal_Gray};
  overflow: hidden;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 13;
`;
