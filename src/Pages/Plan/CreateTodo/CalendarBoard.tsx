import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import {
  createClickDateState,
  createEndDateState,
  createStartDateState,
} from "../../../Recoil/atoms";
import { useEffect } from "react";
import MonthDatePicker from "./MonthDatePicker";
import { Dark_Gray2 } from "../../../Styles/Colors";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

interface ICalendarBoard {
  setStartToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setEndToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isType: string;
}

function CalendarBoard({
  setStartToggle,
  setEndToggle,
  isType,
}: ICalendarBoard) {
  const Moment = require("moment");
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [clickDate, setClickDate] = useRecoilState(createClickDateState);
  const [startDate, setStartDate] = useRecoilState(createStartDateState);
  const [endDate, setEndDate] = useRecoilState(createEndDateState);

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

  //초기화
  useEffect(() => {
    if (isType === "START") {
      onTodayClick();
      setStartDate("");
      setEndDate("");
    } else {
      if (endDate !== "") {
        setClickDate(endDate);
      } else {
        onTodayClick();
      }
    }
  }, []);

  return (
    <Wrapper variants={calendarVariants} initial="normal" animate="animate">
      <Container>
        <TextBox>
          {isType === "START"
            ? "시작 날짜를 설정해 주세요"
            : "종료 날짜를 설정해 주세요"}
        </TextBox>
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
        <MonthDatePicker
          setStartToggle={setStartToggle}
          setEndToggle={setEndToggle}
          isType={isType}
        />
      </Container>
    </Wrapper>
  );
}

export default CalendarBoard;

const Wrapper = styled(motion.div)`
  width: 100%;
  cursor: pointer;
`;
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  position: relative;
  padding: 0 10px;
`;
const TextBox = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 35px;
  margin-top: 10px;
  color: ${Dark_Gray2};
`;
const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  font-weight: 600;
  margin-bottom: 15px;
`;
const MonthText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-radius: 50%;
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
  margin-bottom: 10px;
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
