import styled from "styled-components";
import { IoPlaySharp } from "react-icons/io5";
import { ReactComponent as PlusIcon } from "../Assets/Icons/plus.svg";
import { motion } from "framer-motion";
import { useMatch } from "react-router-dom";

const boxVarients = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.9,
      type: "linear",
    },
  },
  click: { scale: 0.9 },
};

function Button({ isPlay }: { isPlay: boolean }) {
  const planmatch = useMatch("/plan/*");
  return (
    <Wrapper isplan={planmatch !== null}>
      <BtnBox
        variants={boxVarients}
        whileTap="click"
        initial="normal"
        animate="animate"
      >
        {isPlay ? <PlayBtn /> : <PlusBtn />}
      </BtnBox>
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.div<{ isplan: boolean }>`
  position: fixed;
  display: flex;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.isplan ? "18vh" : "15vh")};
  z-index: 50;
  width: 78px;
  @media screen and (max-height: 800px) {
    width: 70px;
    height: 70px;
  }
`;
const BtnBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  @media screen and (max-height: 800px) {
    width: 70px;
    height: 70px;
  }
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;
const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 35px;
  height: 35px;
`;
const PlusBtn = styled(PlusIcon)`
  color: white;
  width: 30px;
  height: 30px;
`;
