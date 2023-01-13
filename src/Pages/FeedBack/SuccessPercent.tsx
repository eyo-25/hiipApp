import styled from "styled-components";
import { useEffect, useState } from "react";

function SuccessPercent() {
  return (
    <Wrapper>
      <TitleContainer>
        <h3>성공률</h3>
      </TitleContainer>
      <PercentContainer>
        <PercentBox>
          <h2>62.5</h2>
          <span>%</span>
        </PercentBox>
      </PercentContainer>
      <DetailInfoContainer>
        <DetailInfoBox>
          <h5>142h</h5>
          <p>남은시간</p>
        </DetailInfoBox>
        <DetailInfoBox>
          <h5>142h</h5>
          <p>총 집중 시간</p>
        </DetailInfoBox>
        <DetailInfoBox>
          <h5>142h</h5>
          <p>평균 집중 시간</p>
        </DetailInfoBox>
      </DetailInfoContainer>
    </Wrapper>
  );
}

export default SuccessPercent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 30);
  width: 90%;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 30%;
  width: 100%;
`;
const PercentContainer = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
`;
const PercentBox = styled.div`
  display: flex;
  align-items: flex-end;
`;
const DetailInfoContainer = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
`;
const DetailInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 33.33%;
`;
