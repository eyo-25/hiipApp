import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  clickDateState,
  endDateState,
  projectState,
  startDateState,
} from "../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blue, Red } from "../../../Styles/Colors";

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
  height: calc(var(--vh, 1vh) * 5.2);
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
    props.clicked ? "Red" : props.isDeadLine ? "black" : null};
  @media screen and (max-height: 800px) {
    width: 23px;
    height: 23px;
  }
  @media screen and (max-height: 700px) {
    width: 20px;
    height: 20px;
  }
`;
const DateText = styled.div<{ nowMonth: boolean }>`
  color: ${(props) => props.nowMonth && "#c4c4c4"};
`;
const BarBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 0.5vh;
  @media screen and (max-height: 800px) {
    height: 4px;
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
