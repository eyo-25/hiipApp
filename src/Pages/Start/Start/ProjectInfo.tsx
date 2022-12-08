import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { clickDateState, projectState, toDoState } from "../../../Recoil/atoms";
import DetailInfo from "./DetailInfo";
import WeeklyDatePicker from "./WeeklyDatePicker";
import { useLayoutEffect, useState } from "react";

export const fadeinVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
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
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [project, setProject] = useRecoilState(projectState);
  const [projectDday, setProjectDday] = useState("");
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const Moment = require("moment");
  // 디데이 세팅
  useLayoutEffect(() => {
    if (project.length > 0) {
      setProjectDday(() => {
        const dDay = Moment(project[0].endDate).diff(Moment(clickDate), "days");
        return dDay >= 0 ? dDay : 0;
      });
    }
  }, [clickDate, project]);

  return (
    <InfoBox>
      <WeeklyDatePicker />
      {isReady ? (
        <DetailInfo onBackClick={onBackClick} projectDday={projectDday} />
      ) : (
        <>
          <MessageBox
            variants={fadeinVariants}
            initial="normal"
            animate="animate"
          >
            {toDos.length > 0 ? (
              <h4>
                이대론 <br /> 가망이 없다
              </h4>
            ) : (
              <h4>
                D-DAY를 설정하고 <br />
                TO-DO를 추가하세요.
              </h4>
            )}
          </MessageBox>
          <DdayBox variants={fadeinVariants} initial="normal" animate="animate">
            <p>{projectDday}</p>
            <span>D.day</span>
          </DdayBox>
        </>
      )}
    </InfoBox>
  );
}

export default ProjectInfo;

const InfoBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const MessageBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62%;
  margin: 0 auto;
  padding-top: 8vh;
  color: white;
  h4 {
    text-align: center;
    line-height: 1.5;
    color: white;
    font-size: 3vh;
    font-weight: 400;
  }
`;
export const DdayBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  width: 100%;
  height: 19.5%;
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
