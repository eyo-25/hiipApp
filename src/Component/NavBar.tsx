import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Icon1 } from "../Assets/Icons/planing.svg";
import { ReactComponent as Icon2 } from "../Assets/Icons/start.svg";
import { ReactComponent as Icon3 } from "../Assets/Icons/peedback.svg";
import { ReactComponent as Icon4 } from "../Assets/Icons/mypage.svg";
import { Dark_Gray } from "../Styles/Colors";
import TabBar from "./TabBar";

function NavBar() {
  const navigate = useNavigate();
  const onClick = (address: string) => {
    navigate(address);
  };
  const planMatch = useMatch("/plan/*");
  const startMatch = useMatch("/");
  const feedbackMatch = useMatch("/feedback/*");
  const mypageMatch = useMatch("/mypage/*");

  const isTab = planMatch !== null;
  return (
    <Wrapper>
      {isTab ? <TabBar /> : null}
      <NavContainer isTab={isTab}>
        <Nav>
          <Items>
            <Item
              isActive={planMatch !== null}
              onClick={() => onClick("/plan")}
            >
              <Icon1 />
              <Link to="/plan">계획</Link>
            </Item>
            <Item isActive={startMatch !== null} onClick={() => onClick("/")}>
              <Icon2 />
              <Link to="/">실행</Link>
            </Item>
            <Item
              isActive={feedbackMatch !== null}
              onClick={() => onClick("/feedback")}
            >
              <Icon3 />
              <Link to="/feedBack">피드백</Link>
            </Item>
            <Item
              isActive={mypageMatch !== null}
              onClick={() => onClick("/mypage")}
            >
              <Icon4 />
              <Link to="/mypage">MY</Link>
            </Item>
          </Items>
        </Nav>
      </NavContainer>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 12;
`;
const NavContainer = styled.div<{ isTab: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 10);
  max-width: 414px;
  padding-bottom: 1%;
  background-color: white;
  border-top: ${(props) =>
    props.isTab ? "1px solid white" : `1px solid ${Dark_Gray}`};
  z-index: 12;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Item = styled.li<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  svg {
    width: 4vh;
    height: 4vh;
    margin-bottom: 1.8px;
    rect {
      fill: ${(props) => (props.isActive ? "#000000" : Dark_Gray)};
    }
    path {
      fill: ${(props) => (props.isActive ? "#000000" : Dark_Gray)};
    }
  }
  a {
    font-size: 1vh;
    font-weight: 400;
    text-align: center;
    color: ${(props) => (props.isActive ? "#000000" : Dark_Gray)};
  }
`;
