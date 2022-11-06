import { useState } from "react";
import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Button from "../../Component/Button";
import { Normal_Gray } from "../../Styles/Colors";
import { motion } from "framer-motion";
import Background from "../../Assets/image/start_background2.png";

function Home() {
  const [isReady, setIsReady] = useState(false);
  const [isFadeout, setIsFadeout] = useState(false);
  const onPlayClick = () => {
    setIsReady((prev) => !prev);
    setTimeout(() => {
      setIsFadeout((prev) => !prev);
    }, 400);
  };

  const bottomVariants = {
    normal: {
      height: "0vh",
      transition: {
        duration: 0.2,
        type: "linear",
      },
    },
    animate: {
      height: isReady ? "59vh" : "22vh",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };

  return (
    <Applayout>
      <BackgroundBox>
        <BackgroundImg isFadeout={isFadeout} />
      </BackgroundBox>
      <Box2 variants={bottomVariants} initial="normal" animate="animate"></Box2>
      <div onClick={onPlayClick}>
        <Button />
      </div>
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
  display: flex;
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
  transition-duration: 4s;
`;

const Box2 = styled(motion.div)`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 1;
  display: flex;
  width: 100%;
  background-color: ${Normal_Gray};
`;
