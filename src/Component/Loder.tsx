import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import styled from "styled-components";

function Loder() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current as any,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Assets/Lottie/97443-loading-gray.json"),
    });
  }, []);
  return (
    <Wrapper>
      <Container>
        <div className="container" ref={container}></div>
      </Container>
    </Wrapper>
  );
}

export default Loder;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 999;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
