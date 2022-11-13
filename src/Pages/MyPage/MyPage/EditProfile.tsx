import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { IoImage, IoCloseCircleSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { dbService, storageService } from "../../../firebase";
import { IUserObjProps } from "../../../Utils/interface";

const EditProfile = ({ userObj }: IUserObjProps) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState<string | null>(
    userObj.displayName
  );
  const [profileImg, setProfileImg] = useState(``);
  const profileRef = useRef<HTMLInputElement>(null);
  const onOverlayClicked = () => {
    navigate("/mypage");
  };
  const onCancelClick = () => {
    navigate("/mypage");
    setProfileImg("");
  };
  //파이어베이스 스토리지 규칙 꼭 수정!!
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let profileURL = "";
    if (profileImg !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/profile/${uuidv4()}`);
      const response = await uploadString(fileRef, profileImg, "data_url");
      profileURL = await getDownloadURL(response.ref);
    }
    if (userObj.displayName === newDisplayName && profileURL === "") {
      navigate("/mypage");
      return;
    }
    if (profileURL !== "") {
      if (
        userObj.photoURL !== null &&
        !userObj.photoURL.includes("googleusercontent") &&
        !userObj.photoURL.includes("githubusercontent")
      ) {
        deleteObject(ref(storageService, userObj.photoURL));
      }
      await userObj
        .updateProfile({
          displayName: newDisplayName,
          photoURL: profileURL,
        })
        .then(() => {
          const copy = JSON.parse(localStorage.getItem("user") as any);
          copy.nickname = newDisplayName;
          copy.photoURL = profileURL;
          localStorage.setItem("user", JSON.stringify(copy));
        });
      await dbService.collection("user").doc(userObj.uid).update({
        nickname: newDisplayName,
        photoURL: profileURL,
      });
    } else {
      await userObj
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          const copy = JSON.parse(localStorage.getItem("user") as any);
          copy.nickname = newDisplayName;
          localStorage.setItem("user", JSON.stringify(copy));
        });
      await dbService.collection("user").doc(userObj.uid).update({
        nickname: newDisplayName,
        photoURL: userObj.photoURL,
        email: userObj.email,
      });
    }
    navigate("/mypage");
    setProfileImg("");
  };
  const onDisplayChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfileImg(result);
    };
    reader.readAsDataURL(imageFile);
  };

  const onClearPhoto = () => {
    if (!profileRef.current?.value) return;
    profileRef.current.value = "";
    setProfileImg("");
  };

  return (
    <Wrapper>
      <Container>
        <ModalBox>
          <form onSubmit={onSubmit}>
            <InputBox>
              <h4>프로필 네임 수정</h4>
              <input
                value={newDisplayName ? newDisplayName : ""}
                onChange={onDisplayChange}
                placeholder={"수정할 프로필 이름"}
                required
              />
            </InputBox>
            <InputBox>
              <h4>프로필 사진 수정</h4>
              <PhotoDiv />
              <Label htmlFor="profile_id">
                <IoImage />
                <PhotoInput
                  ref={profileRef}
                  type="file"
                  accept="image/*"
                  onChange={onProfileImage}
                  id="profile_id"
                />
              </Label>
            </InputBox>
            {profileImg !== "" ? (
              <UserImgBox>
                <UserImg src={profileImg && profileImg} />
                <XBtn onClick={onClearPhoto} />
              </UserImgBox>
            ) : null}
            <BtnBox>
              <CancelBtn onClick={onCancelClick}>취소</CancelBtn>
              <ConfirmBtn>수정 완료</ConfirmBtn>
            </BtnBox>
          </form>
        </ModalBox>
      </Container>
      <Overlay onClick={onOverlayClicked} />
    </Wrapper>
  );
};

export default EditProfile;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  cursor: pointer;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  width: 95%;
  margin: 0 auto;
  z-index: 90;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  z-index: 21;
  form {
    width: 100%;
  }
`;
const InputBox = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h4 {
    letter-spacing: -1px;
    font-weight: 600;
    color: #9d9d9d;
  }
  input {
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    height: 35px;
    width: 165px;
    display: flex;
    text-align: center;
    font-size: 12px;
  }
`;
const BtnBox = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 44px;
  font-size: 14px;
`;
const ConfirmBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  width: 50%;
  border: 1px solid black;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-bottom: 2px;
  cursor: pointer;
`;
const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50%;
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-bottom: 2px;
  cursor: pointer;
`;
const PhotoInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const Label = styled.label`
  position: absolute;
  right: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  svg {
    color: #9d9d9d;
    width: 25px;
    height: 25px;
    &:hover {
      color: black;
    }
  }
`;
const PhotoDiv = styled.div`
  height: 35px;
  width: 165px;
`;
const UserImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 340px;
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
`;
const XBtn = styled(IoCloseCircleSharp)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
