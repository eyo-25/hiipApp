import { motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as HiipIcon } from "../Assets/Icons/HIIPLogo.svg";
const textVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      type: "linear",
    },
  },
};

function Splash() {
  return (
    <Container>
      <LogoBox variants={textVariants} initial="normal" animate="animate">
        <HiipLogo />
      </LogoBox>
    </Container>
  );
}

export default Splash;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 99;
`;

const LogoBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const HiipLogo = styled(HiipIcon)`
  display: flex;
  width: 120px;
  path {
    fill: white;
  }
`;
