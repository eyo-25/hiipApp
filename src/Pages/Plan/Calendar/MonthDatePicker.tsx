import { useRecoilState } from "recoil";
import styled from "styled-components";
import { clickDateState } from "../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
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

function MonthDatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const Moment = require("moment");
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [monthArray, setMonthArray] = useState<Date[]>([]);
  // 달력 연도
  let calendarYear = date.getFullYear();
  // 달력 월
  let calendarMonth = date.getMonth() + 1;
  //Date 객체에서는 일자가 0이면 이전달의 마지막 일자를 계산하여 이전 달의 마지막 날짜로 자동 설정됩니다.
  let monthLastDate = new Date(calendarYear, calendarMonth, 0);
  // 달력 월의 마지막 일
  let calendarMonthLastDate = monthLastDate.getDate();
  //현재달의 첫째 일
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  // 달력 월의 시작 일(=마지막날에서 다음날)
  let monthStartDay = new Date(calendarYear, date.getMonth(), 1);
  // 달력 월의 시작 요일
  let calendarMonthStartDay = monthStartDay.getDay();
  //이전달 마지막일
  let prevMonthLastDate = new Date(
    calendarYear,
    calendarMonth - 1,
    0
  ).getDate();

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
        copy[index] = new Date(
          calendarYear,
          calendarMonth - 1,
          monthStartDay.getDate() + addDay1
        );
        addDay1++;
      }
      // 이전 달 date배정
      let addDay2 = 1;
      for (let index = calendarMonthStartDay - 1; index >= 0; index--) {
        --addDay2;
        copy[index] = new Date(
          calendarYear,
          calendarMonth - 2,
          prevMonthLastDate + addDay2
        );
      }
      // 다음 달 date배정
      let addDay3 = 0;
      let prevDate = calendarMonthLastDate + calendarMonthStartDay;
      for (let index = prevDate; index < 42; index++) {
        copy[index] = new Date(
          calendarYear,
          calendarMonth,
          monthStartDay.getDate() + addDay3
        );
        addDay3++;
      }
      return [...copy];
    });
  }, [date]);

  const onDateClick = (clickedDate: string) => {
    const nowDate = Moment(clickedDate).format("YYYY-MM-DD");
    setClickDate(nowDate);
    //다음달 클릭
    if (nowDate > Moment(date).format("YYYY-MM-DD")) {
      setDate((date) => new Date(date.getFullYear(), date.getMonth() + 2, 0));
    }
    //이전달 클릭
    if (nowDate < Moment(startDate).format("YYYY-MM-DD")) {
      setDate((date) => new Date(date.getFullYear(), date.getMonth(), 0));
    }
  };

  return (
    <DateContainer
      variants={calendarVariants}
      initial="normal"
      animate="animate"
    >
      {monthArray.map((date: any, index: number) => (
        <DateBox key={index}>
          <HoverBox
            clicked={clickDate === Moment(date).format("YYYY-MM-DD")}
            onClick={() => onDateClick(date)}
          >
            <DateText nowMonth={date.getMonth() + 1 != calendarMonth}>
              {date.getDate()}
            </DateText>
          </HoverBox>
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
  height: calc(var(--vh, 1vh) * 4.7);
  cursor: pointer;
`;
const HoverBox = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: ${(props) => props.clicked && "white"};
  background-color: ${(props) => props.clicked && "black"};
  @media screen and (max-height: 800px) {
    width: 23px;
    height: 23px;
  }
`;
const DateText = styled.div<{ nowMonth: boolean }>`
  color: ${(props) => props.nowMonth && "#c4c4c4"};
`;
