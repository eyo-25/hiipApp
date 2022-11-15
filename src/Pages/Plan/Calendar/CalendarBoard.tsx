import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { clickDateState } from "../../../Recoil/atoms";
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

const CalendarBoard = ({ isWeek }: { isWeek: boolean }) => {
  const Moment = require("moment");
  let calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date());
  const [clickDate, setClickDate] = useRecoilState(clickDateState);

  const onPrevClick = () => {
    if (isWeek) {
      const nowDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 7
      );
      setDate(nowDate);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
    } else {
      setDate((date) => new Date(date.getFullYear(), date.getMonth(), 0));
      const nowDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
    }
  };

  const onNextClick = () => {
    if (isWeek) {
      const nowDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 7
      );
      setDate(nowDate);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
    } else {
      setDate((date) => new Date(date.getFullYear(), date.getMonth() + 2, 0));
      const nowDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
    }
  };
  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
    setDate(new Date());
  };

  useEffect(() => {
    setClickDate(Moment().format("YYYY-MM-DD"));
    setDate(new Date());
  }, []);

  return (
    <Wrapper variants={calendarVariants} initial="normal" animate="animate">
      <Container>
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onTodayClick}>
            {isWeek
              ? new Date(clickDate.split("-")).getMonth() + 1
              : date.getMonth() + 1}
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
        {isWeek && <WeeklyDatePicker date={date} />}
        {!isWeek && <MonthDatePicker date={date} />}
      </Container>
    </Wrapper>
  );
};

export default React.memo(CalendarBoard);

const Wrapper = styled(motion.div)`
  width: 100%;
  background-color: white;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.2vh;
  max-width: 400px;
  height: 14vh;
  margin: 0 auto;
  position: relative;
  @media screen and (max-height: 800px) {
    padding-top: 1.6vh;
  }
`;
const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  font-weight: 600;
  margin-bottom: 1.8vh;
`;
const MonthText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-radius: 50%;
  cursor: pointer;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => (props.isWeek ? "1vh" : "0.8vh")};
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
