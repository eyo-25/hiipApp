import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import {
  clickDateState,
  endDateState,
  isWeekState,
  startDateState,
  toDoState,
} from "../../../Recoil/atoms";
import WeeklyDatePicker from "./WeeklyDatePicker";
import MonthDatePicker from "./MonthDatePicker";
import { motion } from "framer-motion";

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

const CalendarBoard = () => {
  const Moment = require("moment");
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [isWeek, setIsWeek] = useRecoilState(isWeekState);

  useEffect(() => {
    onTodayClick();
  }, []);

  const onPrevClick = () => {
    if (isWeek) {
      const prevDay = 7 + Moment(clickDate).day();
      const prevWeek = Moment(clickDate)
        .subtract(prevDay, "days")
        .format("YYYY-MM-DD");
      setClickDate(prevWeek);
    } else {
      const prevMonth = Moment(clickDate)
        .subtract(1, "Month")
        .startOf("month")
        .format("YYYY-MM-DD");
      setClickDate(prevMonth);
    }
  };
  const onNextClick = () => {
    if (isWeek) {
      const nextWeek = 7 - Moment(clickDate).day();
      setClickDate(
        Moment(clickDate).add(nextWeek, "days").format("YYYY-MM-DD")
      );
    } else {
      const nextMonth = Moment(clickDate)
        .add(1, "Month")
        .startOf("month")
        .format("YYYY-MM-DD");
      setClickDate(nextMonth);
    }
  };
  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  };

  //클릭한 날짜 변경시 첫번째 todo의 일정이 나타나도록 설정
  useEffect(() => {
    if (0 < toDos.length) {
      for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].startDate <= clickDate && clickDate <= toDos[i].endDate) {
          setStartDate(toDos[i].startDate);
          setEndDate(toDos[i].endDate);
          break;
        } else if (i + 1 === toDos.length) {
          setStartDate("");
          setEndDate("");
        }
      }
    }
  }, [clickDate]);

  return (
    <Wrapper>
      <Container variants={calendarVariants} initial="normal" animate="animate">
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onTodayClick}>
            {Moment(clickDate).format("MM") > 10
              ? Moment(clickDate).format("MM")
              : Moment(clickDate).format("M")}
            월
          </MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
        <DayContainer>
          {calendarDays.map((days) => (
            <DayBox key={days} isWeek={isWeek}>
              {days}
            </DayBox>
          ))}
        </DayContainer>
        {isWeek && <WeeklyDatePicker />}
        {!isWeek && <MonthDatePicker />}
      </Container>
    </Wrapper>
  );
};

export default React.memo(CalendarBoard);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding-top: 0.8vh;
  @media screen and (max-height: 900px) {
    padding-top: 0;
  }
`;
const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  font-weight: 600;
  margin-bottom: 1.6vh;
`;
const MonthText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-radius: 50%;
  @media screen and (max-height: 800px) {
    font-size: 14px;
  }
`;
const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;
const DayBox = styled.div<{ isWeek: boolean }>`
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7vh;
`;
const PrevBtn = styled(IoChevronBack)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  @media screen and (max-height: 800px) {
    width: 16px;
    height: 16px;
  }
`;
const NextBtn = styled(IoChevronForward)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  @media screen and (max-height: 800px) {
    width: 16px;
    height: 16px;
  }
`;
