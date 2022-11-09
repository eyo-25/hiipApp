import styled from "styled-components";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { authService, dbService, firebaseInstance } from "../../../firebase";
import { ReactComponent as HiipIcon } from "../../../Assets/Icons/HIIPLogo.svg";
import { Dark_Gray, Dark_Gray2 } from "../../../Styles/Colors";

interface IAuthFormProps {
  newCount: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm = ({ close, newCount }: IAuthFormProps) => {
  const { register, handleSubmit, getValues } = useForm();
  const closeClick = () => {
    close(false);
  };
  const onValid = async () => {
    const email = getValues("email");
    const password = getValues("password");
    const nickname = getValues("nickname");
    try {
      if (newCount) {
        await firebaseInstance
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((result: any) => {
            result.user.updateProfile({
              displayName: nickname,
            });
            dbService.collection("user").doc(result.user.uid).set({
              email: email,
              nickname: nickname,
              photoURL:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qBTDzBVonLHd5Ejk0i-61YlcHI54KTgOMhIRea9jwACihT9hxQaj2P87_XAv87DEkAY&usqp=CAU",
              uid: result.user.uid,
            });
          });
        close(false);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error: any) {
      alert("아이디와 비밀번호를 정확히 입력해주세요");
    }
  };
  return (
    <Overlay>
      <Container>
        <BigBox>
          <BigTitle>
            {newCount ? (
              <LogoBox>
                <HiipLogo />
                계정을 만들어 참여하세요
              </LogoBox>
            ) : (
              <LogoBox>
                <HiipLogo />에 로그인하기
              </LogoBox>
            )}
          </BigTitle>
          <BigForm onSubmit={handleSubmit(onValid)}>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email을 적어주세요"
            />
            <input
              {...register("password", { required: true })}
              type="password"
              autoComplete="on"
              placeholder="Password를 적어주세요"
            />
            {newCount && (
              <input
                {...register("nickname", { required: true })}
                type="text"
                placeholder="NickName을 적어주세요"
              />
            )}
            <button>{newCount ? "Creat Account" : "LogIn"}</button>
          </BigForm>
          <CloseBtn onClick={closeClick}>Cancle</CloseBtn>
        </BigBox>
      </Container>
    </Overlay>
  );
};

export default AuthForm;

const Overlay = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 12;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 375px;
`;

const BigBox = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const LogoBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const HiipLogo = styled(HiipIcon)`
  display: flex;
  width: 50px;
  margin-right: 5px;
`;

const BigForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    cursor: pointer;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border: 1px solid ${Dark_Gray};
    margin-bottom: 10px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    margin: 10px 0;
    background-color: black;
    color: white;
    &:hover {
      transition: 0.5s ease-in;
      color: ${Dark_Gray2};
    }
  }
`;

const BigTitle = styled.h4`
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  border: 1px solid ${Dark_Gray};
  &:hover {
    transition: 0.5s ease-in;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
