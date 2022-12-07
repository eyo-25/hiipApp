import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  clickDateState,
  endDateState,
  projectState,
  selectTodoState,
  startDateState,
  toDoState,
} from "../../../Recoil/atoms";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blue, Red } from "../../../Styles/Colors";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1.2,
      type: "linear",
    },
  },
};

const WeeklyDatePicker = () => {
  const Moment = require("moment");
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [project, setProject] = useRecoilState(projectState);
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [weekArray, setWeekArray] = useState<Date[]>([]);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [selectTodo, setSelectTodo] = useRecoilState(selectTodoState);

  useEffect(() => {
    setWeekArray((prev) => {
      const copy = [...prev];
      // 앞 배열 채우기
      let removeDay = 0;
      for (let index = Moment(clickDate).day(); index >= 0; index--) {
        copy[index] = Moment(clickDate)
          .subtract(removeDay, "days")
          .format("YYYY-MM-DD");
        removeDay++;
      }
      let addDay = 0;
      // 뒷 배열 채우기
      for (let index = Moment(clickDate).day(); index < 7; index++) {
        copy[index] = Moment(clickDate)
          .add(addDay, "days")
          .format("YYYY-MM-DD");
        addDay++;
      }
      return [...copy];
    });
  }, [clickDate]);

  const onDateClick = (clickedDate: string) => {
    setClickDate(clickedDate);
  };

  return (
    <DateContainer
      variants={calendarVariants}
      initial="normal"
      animate="animate"
    >
      {weekArray.map((date: any, index: number) => (
        <DateBox key={index} onClick={() => onDateClick(date)}>
          {project.length > 0 ? (
            <HoverBox
              clicked={clickDate === date}
              isDeadLine={
                project[0].startDate === date || project[0].endDate === date
              }
              onClick={() => onDateClick(date)}
            >
              <div>{Number(Moment(date).format("DD"))}</div>
              {project[0].startDate <= date && date <= project[0].endDate && (
                <BarBox>
                  <DateBar
                    isEdge={
                      0 === Moment(date).day() || project[0].startDate === date
                    }
                  >
                    <RightBar />
                    <LeftBar />
                  </DateBar>
                  <PointBox>
                    <BarPoint isRed={startDate <= date && date <= endDate} />
                  </PointBox>
                  <DateBar
                    isEdge={
                      6 === Moment(date).day() || project[0].endDate === date
                    }
                  >
                    <RightBar />
                    <LeftBar />
                  </DateBar>
                </BarBox>
              )}
            </HoverBox>
          ) : (
            <HoverBox
              clicked={clickDate === date}
              isDeadLine={false}
              onClick={() => onDateClick(date)}
            >
              <div>{Number(Moment(date).format("DD"))}</div>
            </HoverBox>
          )}
        </DateBox>
      ))}
    </DateContainer>
  );
};

export default WeeklyDatePicker;

const DateContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;
const DateBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 5.2);
  min-height: 30px;
  cursor: pointer;
`;
const HoverBox = styled.div<{ clicked: boolean; isDeadLine: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5px;
  margin-bottom: 5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: ${(props) => (props.clicked || props.isDeadLine) && "white"};
  background-color: ${(props) =>
    props.clicked ? " Red" : props.isDeadLine ? "black" : null};
  @media screen and (max-height: 800px) {
    width: 23px;
    height: 23px;
  }
  @media screen and (max-height: 700px) {
    width: 21px;
    height: 21px;
  }
  @media screen and (max-height: 650px) {
    width: 20px;
    height: 20px;
  }
`;
const BarBox = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 5px;
  @media screen and (max-height: 700px) {
    height: 4.5px;
  }
`;
const DateBar = styled.div<{ isEdge: boolean }>`
  display: flex;
  height: 100%;
  width: 50%;
  background-color: ${(props) => (props.isEdge ? "white" : "#0002ff")};
  justify-content: ${(props) => (props.isEdge ? "flex-start" : "flex-end")};
`;
const RightBar = styled.div`
  height: 100%;
  width: 50%;
`;
const LeftBar = styled.div`
  height: 100%;
  width: 50%;
`;
const PointBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const BarPoint = styled.div<{ isRed: boolean }>`
  background-color: ${(props) => (props.isRed ? Red : Blue)};
  width: 5px;
  height: 100%;
  margin: 0 auto;
  z-index: 99;
  height: 100%;
  border-radius: 50%;
`;
