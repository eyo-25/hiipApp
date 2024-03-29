import { IoChevronForward } from "react-icons/io5";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Header from "../../Component/Header";
import { authService } from "../../firebase";
import { homeSplashState } from "../../Recoil/atoms";
import EditProfile from "./MyPage/EditProfile";

function MyPage({ userObj }: any) {
  const [homeSplash, setHomeSplash] = useRecoilState(homeSplashState);
  const localPhotoURL = JSON.parse(
    localStorage.getItem("user") as any
  ).photoURL;
  const localEmail = JSON.parse(localStorage.getItem("user") as any).email;
  const localNickname = JSON.parse(
    localStorage.getItem("user") as any
  ).nickname;
  const navigate = useNavigate();
  const editMatch = useMatch(`/mypage/editprofile`);
  async function logoutSubmit() {
    authService.signOut().then(() => {
      setHomeSplash(true);
      navigate(`/`);
    });
  }
  const onLogOutClick = async () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await logoutSubmit();
    }
  };
  const onEditClick = () => {
    navigate(`/mypage/editprofile`);
  };
  const GUEST_ICON =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qBTDzBVonLHd5Ejk0i-61YlcHI54KTgOMhIRea9jwACihT9hxQaj2P87_XAv87DEkAY&usqp=CAU";
  return (
    <Applayout>
      <Header title={"My Page"} />
      <Wrapper>
        <Container>
          <ProfileBox>
            <ProfileImg
              onClick={onEditClick}
              src={localPhotoURL !== null ? localPhotoURL : GUEST_ICON}
            />
            <UserText>
              <UserNameBox>
                <h4 onClick={onEditClick}>
                  {localNickname ? localNickname : `HIIP 회원`}
                </h4>
                <UserRank>Beginner</UserRank>
              </UserNameBox>
              <p>{localEmail ? localEmail : "이메일을 등록해 주세요"}</p>
            </UserText>
          </ProfileBox>
          <Items>
            <Item onClick={onEditClick}>
              <div>프로필 관리</div>
              <IoChevronForward />
            </Item>
            <Item>
              <div>친구 관리</div>
              <IoChevronForward />
            </Item>
            <Item>
              <div>알림 관리</div>
              <IoChevronForward />
            </Item>
          </Items>
          <Items>
            <Item>
              <div>고객센터</div>
              <IoChevronForward />
            </Item>
            <Item>
              <div>제작자 소개</div>
              <IoChevronForward />
            </Item>
            <Item onClick={onLogOutClick}>
              <span>로그아웃</span>
              <IoChevronForward />
            </Item>
          </Items>
          {editMatch && <EditProfile userObj={userObj} />}
        </Container>
      </Wrapper>
    </Applayout>
  );
}

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;
const ProfileBox = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const ProfileImg = styled.img`
  background-color: #c4c4c4;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
`;
const UserText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  cursor: pointer;
  p {
    font-size: 12px;
  }
`;
const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  h4 {
    font-size: 18px;
    font-weight: 600;
  }
`;
const UserRank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 20px;
  background-color: black;
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding-bottom: 2px;
  margin-left: 10px;
  @media screen and (max-height: 800px) {
    padding-bottom: 0;
  }
`;
const Items = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Item = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  letter-spacing: -1px;
  @media screen and (max-height: 700px) {
    font-size: 14px;
  }
  cursor: pointer;
  div {
    font-weight: 600;
    color: #6c6c6c;
  }
  span {
    font-weight: 600;
    color: black;
  }
  svg {
    color: #c4c4c4;
  }
`;
