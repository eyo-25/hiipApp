import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { authService, dbService } from "../../../firebase";
import { ReactComponent as GoogleIcon } from "../../../Assets/Icons/googleLogo.svg";
import { IoLogoGithub } from "react-icons/io5";
import { Dark_Gray } from "../../../Styles/Colors";

const AuthSocialLogin = () => {
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider).then((result) => {
      dbService.collection("user").doc(result.user.uid).set({
        email: result.user.email,
        nickname: result.user.displayName,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      });
    });
  };
  return (
    <>
      <LogInBtn onClick={onSocialClick} name="google">
        <GoogleIcon />
        Google 계정으로 로그인
      </LogInBtn>
      <LogInBtn onClick={onSocialClick} name="github">
        <IoLogoGithub />
        Github 계정으로 로그인
      </LogInBtn>
    </>
  );
};

export default AuthSocialLogin;

const LogInBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 0;
  width: 100%;
  background-color: inherit;
  border: 1px solid ${Dark_Gray};
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  &:hover {
    transition: 0.5s ease-in;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
