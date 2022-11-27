import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  clickDateState,
  endDateState,
  startDateState,
} from "../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MonthDatePicker() {
  const Moment = require("moment");
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [monthArray, setMonthArray] = useState<string[]>([]);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [click, setClick] = useState(0);

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
    let newClick = click >= 3 ? 1 : click + 1;
    setClick(newClick);
    setClickDate(clickedDate);
    // start보다 먼저 눌렀을때 초기화
    if (clickedDate < startDate) {
      setClick(0);
      newClick = 0;
      setStartDate("");
      setEndDate("");
    }
    // start와 앤드 사이에 눌렀을때 앤드만 변경
    if (startDate <= clickedDate && clickedDate < endDate) {
      setClick(2);
      newClick = 2;
      setEndDate(clickedDate);
    }
    switch (newClick) {
      case 1:
        setStartDate(clickedDate);
        break;
      case 2:
        setEndDate(clickedDate);
        break;
      case 3:
        setStartDate("");
        setEndDate("");
        break;
      default:
        break;
    }
  };

  return (
    <DateContainer>
      {monthArray.map((date: string, index: number) => (
        <DateBox key={index}>
          <HoverBox
            clicked={clickDate === Moment(date).format("YYYY-MM-DD")}
            onClick={() => onDateClick(date)}
          >
            <DateText
              nowMonth={Number(Moment(date).format("MM")) !== calendarMonth}
            >
              {Number(Moment(date).format("DD"))}
            </DateText>
            {((startDate <= date && date <= endDate) || startDate === date) && (
              <DateBar isSame={startDate === endDate} />
            )}
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
  @media screen and (max-height: 600px) {
    height: 30px;
  }
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
const DateBar = styled.div<{ isSame: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: ${(props) => (props.isSame ? "#FFC500" : "#0002ff")};
`;
