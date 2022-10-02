/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot } from "firebase/firestore";
import queryByEmail from "../utils/getRecipientQueryByEmail";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const [recipientInfo, setRecipientInfo] = useState({});

  useEffect(() => {
    onSnapshot(queryByEmail(users, user), (querySnapshot) => {
      querySnapshot?.forEach((doc) => {
        const list = {};
        list = { ...doc.data(), id: doc.id };
        setRecipientInfo(list);
      });
    });
  }, [user]);

  return (
    <Container>
      {recipientInfo ? (
        <RecipientAvater src={recipientInfo.photoURL} alt="" />
      ) : (
        <UserAvater sx={{ fontSize: 50 }} />
      )}
      <UserName>{recipientInfo?.email}</UserName>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  background: #111b21;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  word-break: break-word;
  :hover {
    background: #202c33;
    transition: 0.3s;
  }
`;
const UserName = styled.p`
  color: #aebac1;
  color: white;
  font-size: 16px;
  text-transform: capitalize;
`;
const UserAvater = styled(AccountCircleRoundedIcon)`
  margin: 8px;
  margin-right: 15px;
  cursor: pointer;
  color: #aebac1;
`;
const RecipientAvater = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 8px;
  margin-right: 15px;
  border: 2px solid #aebac1;
`;
