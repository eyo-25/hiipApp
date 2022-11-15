import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { fadeinVariants } from "./ProjectInfo";

function WeeklyDatePicker() {
  const Moment = require("moment");
  const [clickDate, setClickDate] = useState("");
  //주간배열
  const [weekArray, setWeekArray] = useState<Date[]>([]);
  let addDay1 = 0;
  let addDay2 = 0;

  useEffect(() => {
    setWeekArray((prev) => {
      const copy = [...prev];
      // 0,1,2 배열 채우기
      for (let i = 2; i >= 0; i--) {
        addDay2--;
        copy[i] = new Date(
          Moment(clickDate).year(),
          Moment(clickDate).month(),
          Moment(clickDate).date() + addDay2
        );
      }
      // 3,4,5 배열 채우기
      for (let i = 3; i < 7; i++) {
        copy[i] = new Date(
          Moment(clickDate).year(),
          Moment(clickDate).month(),
          Moment(clickDate).date() + addDay1
        );
        addDay1++;
      }
      return [...copy];
    });
  }, [clickDate]);
  useEffect(() => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  }, []);
  const onPrevClick = () => {
    setClickDate(() => {
      const copy = Moment(clickDate);
      return copy.subtract(1, "days");
    });
  };
  const onNextClick = () => {
    setClickDate(() => {
      const copy = Moment(clickDate);
      return copy.add(1, "days");
    });
  };
  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  };
  const onDateClick = (date: any) => {
    setClickDate(Moment(date).format("YYYY-MM-DD"));
  };
  return (
    <Wrapper variants={fadeinVariants} initial="normal" animate="animate">
      <Container>
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onTodayClick}>
            {Moment(clickDate).month() + 1}월
          </MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
        <DateContainer>
          {weekArray.map((date: any, index: number) => (
            <DateBox key={index} onClick={() => onDateClick(date)}>
              <DateText>{date.getDate() + ""}</DateText>
            </DateBox>
          ))}
        </DateContainer>
      </Container>
    </Wrapper>
  );
}

export default React.memo(WeeklyDatePicker);

const Wrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 16%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 95%;
  margin: 0 auto;
  color: white;
`;
const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 1.7vh;
`;
const MonthText = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  @media screen and (max-height: 800px) {
    font-size: 14px;
  }
`;
const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;
const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:nth-child(4) {
    div {
      background-color: white;
      color: black;
    }
  }
`;
const DateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  @media screen and (max-height: 800px) {
    width: 3.2vh;
    height: 3.2vh;
    padding-bottom: 2px;
    padding-bottom: 0px;
  }
`;
const PrevBtn = styled(IoChevronBack)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const NextBtn = styled(IoChevronForward)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
