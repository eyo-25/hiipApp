import { useRecoilState } from "recoil";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { addCountState, timerState } from "../../../Recoil/atoms";

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 4,
  },
  coundStart: {
    opacity: 0,
    y: 6,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spling",
    },
  },
};

function AddTimer() {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [addSetCount, setAddSetCount] = useRecoilState(addCountState);

  useEffect(() => {
    setAddSetCount(0);
    return () => setAddSetCount(0);
  }, []);

  return (
    <AddBox>
      <BreakBox>
        <h5 style={{ color: "#B3B3B3" }}>현재 세트</h5>
      </BreakBox>
      <BreakBox variants={TextUpVarients} initial="coundStart" animate="end">
        <h4 style={{ color: "#B3B3B3", marginBottom: 0 }}>
          {timerObj.setFocusSet} SET
        </h4>
      </BreakBox>
      <AddSideBox>
        <WhiteBox />
      </AddSideBox>
      <BreakBox>
        <h5>추가 세트</h5>
      </BreakBox>
      <BreakBox variants={TextUpVarients} initial="coundStart" animate="end">
        <h4 style={{ marginBottom: 0 }}>{addSetCount} SET</h4>
      </BreakBox>
    </AddBox>
  );
}

export default AddTimer;

const BreakBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  h5 {
    margin-bottom: 10px;
  }
  h4 {
    font-family: "Roboto";
    font-weight: 900;
    font-size: 70px;
    letter-spacing: -0.5px;
    margin-bottom: 4.7vh;
    @media screen and (max-height: 650px) {
      font-size: 65px;
      margin-bottom: 20px;
    }
  }
`;
const AddBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const AddSideBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 100%;
`;
const WhiteBox = styled.div`
  height: 20px;
  width: 1px;
  background-color: white;
`;
