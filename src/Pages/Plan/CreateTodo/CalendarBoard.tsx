import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { clickDateState } from "../../../Recoil/atoms";
import { useEffect } from "react";
import MonthDatePicker from "../Calendar/MonthDatePicker";

function CalendarBoard() {
  const Moment = require("moment");
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [clickDate, setClickDate] = useRecoilState(clickDateState);

  const onPrevClick = () => {
    const prevMonth = Moment(clickDate)
      .subtract(1, "Month")
      .startOf("month")
      .format("YYYY-MM-DD");
    setClickDate(prevMonth);
  };
  const onNextClick = () => {
    const nextMonth = Moment(clickDate)
      .add(1, "Month")
      .startOf("month")
      .format("YYYY-MM-DD");
    setClickDate(nextMonth);
  };
  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  };

  useEffect(() => {
    onTodayClick();
  }, []);

  return (
    <Wrapper>
      <Container>
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
            <DayBox key={days}>{days}</DayBox>
          ))}
        </DayContainer>
        <MonthDatePicker />
      </Container>
    </Wrapper>
  );
}

export default CalendarBoard;

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.2vh;
  max-width: 400px;
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
const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
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
