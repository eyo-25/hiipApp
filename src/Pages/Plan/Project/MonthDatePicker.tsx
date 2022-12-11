import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  clickDateState,
  endDateState,
  startDateState,
} from "../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Red } from "../../../Styles/Colors";

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
    if (clickedDate < Moment().format("YYYY-MM-DD")) {
      return;
    }
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
            isDeadLine={date === startDate || date === endDate}
            isSame={startDate === endDate && endDate === date}
            onClick={() => onDateClick(date)}
          >
            <DateText
              nowMonth={
                Number(Moment(date).format("MM")) !== calendarMonth ||
                date < Moment().format("YYYY-MM-DD")
              }
            >
              {Number(Moment(date).format("DD"))}
            </DateText>
            {((startDate <= date && date <= endDate) || startDate === date) && (
              <BarBox>
                <DateBar
                  isEdge={
                    0 === Moment(date).day() ||
                    startDate === date ||
                    startDate === ""
                  }
                >
                  <RightBar />
                  <LeftBar />
                </DateBar>
                <PointBox>
                  <BarPoint />
                </PointBox>
                <DateBar
                  isEdge={
                    6 === Moment(date).day() ||
                    endDate === date ||
                    endDate === ""
                  }
                >
                  <RightBar />
                  <LeftBar />
                </DateBar>
              </BarBox>
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
  height: 35px;
  cursor: pointer;
  @media screen and (min-height: 700px) {
    height: 40px;
  }
  @media screen and (min-height: 780px) {
    height: 44px;
  }
  @media screen and (min-height: 840px) {
    height: 47px;
  }
`;
const HoverBox = styled.div<{ isDeadLine: boolean; isSame: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: ${(props) => props.isDeadLine && "white"};
  background-color: ${(props) =>
    props.isSame ? Red : props.isDeadLine ? "black" : null};
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
  height: 5px;
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
const BarPoint = styled.div`
  background-color: Blue;
  width: 5px;
  height: 100%;
  margin: 0 auto;
  z-index: 99;
  height: 100%;
  border-radius: 50%;
`;
