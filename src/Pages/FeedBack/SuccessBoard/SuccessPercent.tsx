import styled from "styled-components";
import { useEffect, useState } from "react";
import { feedBackTimerState, feedBackTodoState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";

function SuccessPercent() {
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  const [processPercent, setProcessPercent] = useState(0);
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");
  const nowMoment = Moment(now);
  const startMoment = Moment(feedBackTodo[0].startDate);
  const endMoment = Moment(feedBackTodo[0].endDate);
  const duration = Moment.duration(endMoment.diff(startMoment)).asDays() + 1;
  const nowDuration = Moment.duration(endMoment.diff(nowMoment)).asDays();

  useEffect(() => {
    setProcessPercent((feedBackTodo[0].timerIndex / duration) * 100);
  }, []);

  return (
    <Wrapper>
      <ContentContainer>
        <TitleContainer>
          <h3>진행률</h3>
        </TitleContainer>
        <PercentContainer>
          <PercentBox>
            <h2>{processPercent.toFixed(1)}</h2>
            <span>%</span>
          </PercentBox>
        </PercentContainer>
        <DetailInfoContainer>
          <DetailInfoBox>
            <h5>142h</h5>
            <p>총 남은 시간</p>
          </DetailInfoBox>
          <DetailInfoBox>
            <h5>42h</h5>
            <p>총 집중 시간</p>
          </DetailInfoBox>
          <DetailInfoBox>
            <h5>5h</h5>
            <p>평균 집중 시간</p>
          </DetailInfoBox>
        </DetailInfoContainer>
      </ContentContainer>
    </Wrapper>
  );
}

export default SuccessPercent;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 38%;
  width: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 17%;
  margin-top: 10%;
  width: 100%;
`;
const PercentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 33%;
  width: 100%;
`;
const PercentBox = styled.div`
  display: flex;
  align-items: flex-end;
`;
const DetailInfoContainer = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
`;
const DetailInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2.5vh;
  h5 {
    font-size: 2.7vh;
    font-weight: 600;
    margin-bottom: 10%;
  }
  p {
    font-size: 13px;
    margin-left: 1px;
    color: #828282;
  }
`;
