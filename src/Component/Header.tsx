import { useLayoutEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { projectState } from "../Recoil/atoms";

function Header({ title }: { title: string }) {
  const [project, setProject] = useRecoilState(projectState);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDday, setProjectDday] = useState("");
  const planMatch = useMatch("/plan/*");
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");

  useLayoutEffect(() => {
    if (project.length > 0) {
      setProjectTitle(project[0].projectTitle);
      setProjectDday(() => {
        const dDay = Moment(project[0].endDate).diff(Moment(now), "days");
        return dDay >= 0 ? dDay : 0;
      });
    } else {
      setProjectTitle("HIIP");
      setProjectDday("0");
    }
  }, []);

  return (
    <Container>
      {planMatch ? (
        <HeaderBox>
          <Dday>D {projectDday}</Dday>
          <ProjectTitle>{projectTitle}</ProjectTitle>
          <HamMenu>
            <HamLine />
            <HamLine />
          </HamMenu>
        </HeaderBox>
      ) : (
        <Wrapper>{title}</Wrapper>
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 7vh;
  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 88%;
  height: 100%;
  font-family: "Roboto";
  font-size: 2.9vh;
`;
const HeaderBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 2vh;
`;
const Dday = styled.h4`
  position: absolute;
  left: 0;
  letter-spacing: -1.3px;
  font-weight: 600;
  font-size: 2.6vh;
  @media screen and (min-height: 800px) {
    font-size: 2.3vh;
  }
`;
const ProjectTitle = styled.h4`
  font-weight: 900;
  letter-spacing: -1px;
  font-size: 2.9vh;
  @media screen and (min-height: 800px) {
    font-size: 2.5vh;
  }
`;
const HamMenu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.3vh;
  height: 1.8vh;
  @media screen and (min-height: 800px) {
    width: 2vh;
    height: 1.6vh;
  }
`;
const HamLine = styled.div`
  width: 100%;
  height: 0.3vh;
  border-radius: 0.5vh;
  background-color: black;
`;
