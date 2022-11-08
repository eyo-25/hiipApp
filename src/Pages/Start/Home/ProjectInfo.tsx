import { motion } from "framer-motion";
import styled from "styled-components";
import DetailInfo from "./DetailInfo";
import WeeklyDatePicker from "./WeeklyDatePicker";

export const fadeinVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.6,
      type: "linear",
    },
  },
};

function ProjectInfo({
  isReady,
  onBackClick,
}: {
  isReady: boolean;
  onBackClick: () => void;
}) {
  return (
    <InfoBox>
      <WeeklyDatePicker />
      {isReady ? (
        <DetailInfo onBackClick={onBackClick} />
      ) : (
        <>
          <MessageBox
            variants={fadeinVariants}
            initial="normal"
            animate="animate"
          >
            <h4>
              이대론 <br /> 가망이 없다
            </h4>
          </MessageBox>
          <DdayBox variants={fadeinVariants} initial="normal" animate="animate">
            <p>12</p>
            <span>D.day</span>
          </DdayBox>
        </>
      )}
    </InfoBox>
  );
}

export default ProjectInfo;

const InfoBox = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;
const MessageBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47%;
  margin: 0 auto;
  padding-top: 8vh;
  color: white;
  h4 {
    text-align: center;
    line-height: 1.3;
    letter-spacing: -0.5px;
    color: white;
    font-size: 3.5vh;
    font-weight: 400;
  }
`;
export const DdayBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  width: 100%;
  height: 14%;
  font-family: "Roboto";
  font-weight: 900;
  span {
    font-size: 2.5vh;
    padding-bottom: 1.2vh;
  }
  p {
    font-size: 11vh;
    letter-spacing: -10px;
    margin-right: 8px;
  }
`;
