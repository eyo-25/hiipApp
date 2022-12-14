import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Background from "../Assets/image/start_background2.png";
import { homeSplashState, loadState } from "../Recoil/atoms";

const imgVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "linear",
    },
  },
};
const gradientVariants = {
  normal: {
    opacity: 0,
    width: "0%",
  },
  animate: {
    opacity: 1,
    width: "80%",
    transition: {
      delay: 0.5,
      duration: 0.8,
      type: "linear",
    },
  },
};
const textVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.8,
      type: "linear",
    },
  },
};

function HomeSplash() {
  const [isLoad, setIsLoad] = useRecoilState(loadState);
  const [isHomeSplash, setIsHomeSplash] = useRecoilState(homeSplashState);
  useEffect(() => {
    if (!isLoad) {
      setTimeout(() => {
        setIsHomeSplash(false);
      }, 2000);
    }
  }, [isLoad]);
  return (
    <Container>
      <BackgroundImg
        variants={imgVariants}
        initial="normal"
        animate="animate"
      />
      {!isLoad && (
        <>
          <GradationBox
            variants={gradientVariants}
            initial="normal"
            animate="animate"
          >
            <TextBox variants={textVariants} initial="normal" animate="animate">
              <h4>High</h4>
              <h4>Intensity</h4>
              <h4>Interval</h4>
              <h4>Planing</h4>
            </TextBox>
          </GradationBox>
        </>
      )}
    </Container>
  );
}

export default HomeSplash;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 20;
`;
const BackgroundImg = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
      "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),"}
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;
const GradationBox = styled(motion.div)`
  position: absolute;
  height: 100%;
  padding-left: 14%;
  padding-bottom: 16%;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0),
    60%,
    rgba(0, 2, 255, 0.6)
  );
`;
const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  h4 {
    font-family: "RobotoBold";
    line-height: 1.1;
    font-size: 5.8vh;
    color: white;
  }
`;
