import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import styled from "styled-components";
import { motion } from "framer-motion";

export const fadeinVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "linear",
    },
  },
};

function Loader() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current as any,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Assets/Lottie/loadingWhite.json"),
    });
  }, []);
  return (
    <Wrapper variants={fadeinVariants} initial="normal" animate="animate">
      <Container>
        <div className="container" ref={container}></div>
      </Container>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  max-width: 414px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  div {
    z-index: 999;
    width: 60px;
    height: 60px;
  }
`;
