import { useState, Suspense, lazy, MouseEvent } from "react";
import styled from "styled-components";
import { ReactComponent as HiipIcon } from "../../Assets/Icons/HIIPLogo.svg";
import { Dark_Gray, Dark_Gray2 } from "../../Styles/Colors";
import AuthSocialLogin from "./AuthForm/AuthSocialLogin";
// import AuthForm from "./AuthForm/AuthForm";

//Lazy Loading
const AuthForm = lazy(() => import("./AuthForm/AuthForm"));

function Auth() {
  const [isCreate, setIsCreate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const onCreateClick = () => {
    setIsCreate((prev) => !prev);
  };
  const onLoginClick = () => {
    setIsLogin((prev) => !prev);
  };
  const LazyModalPreload = () => {
    import("./AuthForm/AuthForm");
  };
  return (
    <Container>
      <Suspense fallback={null}>
        {isCreate && <AuthForm close={setIsCreate} newCount={true} />}
        {isLogin && <AuthForm close={setIsLogin} newCount={false} />}
      </Suspense>
      <AuthBox>
        <HiipLogo />
        <AuthSocialLogin />
        <BtnBox>
          <SubText>또는</SubText>
          <LoginBtn1 onMouseEnter={LazyModalPreload} onClick={onCreateClick}>
            이메일 주소로 가입하기
          </LoginBtn1>
        </BtnBox>
        <BtnBox>
          <SubText>이미 HIIP 회원이 신가요?</SubText>
          <LoginBtn2 onMouseEnter={LazyModalPreload} onClick={onLoginClick}>
            로그인
          </LoginBtn2>
        </BtnBox>
      </AuthBox>
    </Container>
  );
}

export default Auth;

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;
const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  justify-content: center;
  align-items: center;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid ${Dark_Gray};
    cursor: pointer;
    margin: 10px 0;
  }
`;
const LoginBtn1 = styled.button`
  background-color: black;
  color: white;
  &:hover {
    transition: 0.5s ease-in;
    color: ${Dark_Gray2};
  }
`;
const LoginBtn2 = styled.button`
  font-weight: 600;
  background-color: inherit;
  &:hover {
    transition: 0.5s ease-in;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const HiipLogo = styled(HiipIcon)`
  display: flex;
  width: 80px;
  margin-bottom: 5px;
`;
const SubText = styled.div`
  font-size: 14px;
  color: ${Dark_Gray2};
`;
