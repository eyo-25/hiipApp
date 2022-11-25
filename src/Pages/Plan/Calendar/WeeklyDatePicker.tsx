import styled from "styled-components";
import { useRecoilState } from "recoil";
import { clickDateState } from "../../../Recoil/atoms";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1.2,
      type: "linear",
    },
  },
};

const WeeklyDatePicker = () => {
  const Moment = require("moment");
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [weekArray, setWeekArray] = useState<Date[]>([]);

  useEffect(() => {
    setWeekArray((prev) => {
      const copy = [...prev];
      // 앞 배열 채우기
      let removeDay = 0;
      for (let index = Moment(clickDate).day(); index >= 0; index--) {
        copy[index] = Moment(clickDate)
          .subtract(removeDay, "days")
          .format("YYYY-MM-DD");
        removeDay++;
      }
      let addDay = 0;
      // 뒷 배열 채우기
      for (let index = Moment(clickDate).day(); index < 7; index++) {
        copy[index] = Moment(clickDate)
          .add(addDay, "days")
          .format("YYYY-MM-DD");
        addDay++;
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
      {weekArray.map((date: any, index: number) => (
        <DateBox
          key={index}
          clicked={clickDate === date}
          onClick={() => onDateClick(date)}
        >
          <div>{Number(Moment(date).format("DD"))}</div>
        </DateBox>
      ))}
    </DateContainer>
  );
};

export default WeeklyDatePicker;

const DateContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;
const DateBox = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: ${(props) => (props.clicked ? "white" : "black")};
    background-color: ${(props) => props.clicked && "black"};
    @media screen and (max-height: 800px) {
      width: 23px;
      height: 23px;
    }
  }
`;
