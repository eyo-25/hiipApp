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

const CalendarBoard = ({
  isWeek,
  setIsWeek,
}: {
  isWeek: boolean;
  setIsWeek: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const Moment = require("moment");
  const today = new Date();
  let calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  );
  const [clickDate, setClickDate] = useRecoilState(clickDateState);

  const onPrevClick = () => {
    const clickDateNow = new Date(clickDate.split("-"));
    if (isWeek) {
      const nowDate = new Date(
        clickDateNow.getFullYear(),
        clickDateNow.getMonth(),
        clickDateNow.getDate() - (7 + clickDateNow.getDay())
      );
      setDate(nowDate);
      const prevDay = 7 + Moment(clickDate).day();
      const prevWeek = Moment(clickDate)
        .subtract(prevDay, "days")
        .format("YYYY-MM-DD");
      setClickDate(prevWeek);
    } else {
      const nowDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
      setDate((date) => new Date(date.getFullYear(), date.getMonth(), 0));
    }
  };

  const onNextClick = () => {
    const clickDateNow = new Date(clickDate.split("-"));
    if (isWeek) {
      const nowDate = new Date(
        clickDateNow.getFullYear(),
        clickDateNow.getMonth(),
        clickDateNow.getDate() + (7 - clickDateNow.getDay())
      );
      setDate(nowDate);
      const nextWeek = 7 - Moment(clickDate).day();
      setClickDate(
        Moment(clickDate).add(nextWeek, "days").format("YYYY-MM-DD")
      );
    } else {
      const nowDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      setClickDate(Moment(nowDate).format("YYYY-MM-DD"));
      setDate((date) => new Date(date.getFullYear(), date.getMonth() + 2, 0));
    }
  };
  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
    setDate(() => new Date(today.getFullYear(), today.getMonth() + 1, 0));
  };

  useEffect(() => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  }, []);

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
        {isWeek && <WeeklyDatePicker date={date} setDate={setDate} />}
        {!isWeek && <MonthDatePicker date={date} setDate={setDate} />}
      </Container>
    </Wrapper>
  );
};

export default React.memo(CalendarBoard);

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  cursor: pointer;
`;
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.2vh;
  max-width: 400px;
  height: 13vh;
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
  margin-bottom: ${(props) => (props.isWeek ? "1.2vh" : "1vh")};
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
