import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  clickDateState,
  endDateState,
  projectState,
  selectTodoState,
  startDateState,
  toDoState,
} from "../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Red } from "../../../Styles/Colors";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.2,
      type: "linear",
    },
  },
};

function MonthDatePicker() {
  const Moment = require("moment");
  const [project, setProject] = useRecoilState(projectState);
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [monthArray, setMonthArray] = useState<string[]>([]);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  // 현재월
  let calendarMonth = Number(Moment(clickDate).format("MM"));
  // 현재월의 마지막 일
  let calendarMonthLastDate = Number(
    Moment(clickDate).endOf("month").format("DD")
  );
  // 현재월의 첫째 일
  let monthStartDate = Moment(clickDate).startOf("month").format("YYYY-MM-DD");
  // 현재월의 시작 요일
  let calendarMonthStartDay = Moment(monthStartDate).startOf("month").day();
  // 이전달 마지막일자
  let prevMonthLastDate = Moment(monthStartDate)
    .subtract(1, "Month")
    .endOf("month")
    .format("YYYY-MM-DD");
  // 다음달 시작일자
  let nextMonthStartDate = Moment(monthStartDate)
    .add(1, "Month")
    .startOf("month")
    .format("YYYY-MM-DD");

  useEffect(() => {
    setMonthArray((prev) => {
      const copy = [...prev];
      // 현재 달 date배정
      let addDay1 = 0;
      for (
        let index = calendarMonthStartDay;
        index < calendarMonthLastDate + calendarMonthStartDay;
        index++
      ) {
        copy[index] = Moment(monthStartDate)
          .add(addDay1, "days")
          .format("YYYY-MM-DD");
        addDay1++;
      }
      // 이전 달 date배정
      let addDay2 = 0;
      for (let index = calendarMonthStartDay - 1; index >= 0; index--) {
        copy[index] = Moment(prevMonthLastDate)
          .subtract(addDay2, "days")
          .format("YYYY-MM-DD");
        addDay2++;
      }
      // 다음 달 date배정
      let addDay3 = 0;
      let prevDate = calendarMonthLastDate + calendarMonthStartDay;
      for (let index = prevDate; index < 42; index++) {
        copy[index] = Moment(nextMonthStartDate)
          .add(addDay3, "days")
          .format("YYYY-MM-DD");
        addDay3++;
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
      {monthArray.map((date: string, index: number) => (
        <DateBox key={index}>
          {project.length > 0 ? (
            <HoverBox
              clicked={clickDate === date}
              isDeadLine={
                date === project[0].startDate || date === project[0].endDate
              }
              onClick={() => onDateClick(date)}
            >
              <DateText
                nowMonth={Number(Moment(date).format("MM")) !== calendarMonth}
              >
                {Number(Moment(date).format("DD"))}
              </DateText>
              {/* {((startDate <= date && date <= endDate) || startDate === date) &&
                      startDate && <DateBar isSame={startDate === endDate} />} */}
              {project[0].startDate <= date && date <= project[0].endDate && (
                <ProjectBar />
              )}
            </HoverBox>
          ) : (
            <HoverBox
              clicked={clickDate === date}
              isDeadLine={false}
              onClick={() => onDateClick(date)}
            >
              <DateText
                nowMonth={Number(Moment(date).format("MM")) !== calendarMonth}
              >
                {Number(Moment(date).format("DD"))}
              </DateText>
            </HoverBox>
          )}
        </DateBox>
      ))}
    </DateContainer>
  );
}

export default React.memo(MonthDatePicker);

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
  height: calc(var(--vh, 1vh) * 4.9);
  cursor: pointer;
`;
const HoverBox = styled.div<{ clicked: boolean; isDeadLine: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5px;
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
`;
const DateText = styled.div<{ nowMonth: boolean }>`
  color: ${(props) => props.nowMonth && "#c4c4c4"};
`;
const DateBar = styled.div<{ isSame: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 0.5vh;
  background-color: ${(props) => (props.isSame ? "#FFC500" : "#0002ff")};
  @media screen and (max-height: 800px) {
    height: 4px;
  }
`;
const ProjectBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 0.5vh;
  background-color: #0002ff;
  @media screen and (max-height: 800px) {
    height: 4px;
  }
`;
