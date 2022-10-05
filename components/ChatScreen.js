import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { auth } from "../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

const ChatScreen = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <Container>
      <Header>
        <IconButton>
          <AccountCircleRoundedIcon />
        </IconButton>

        <HeaderInformation>
          <h3>Email</h3>
          <p>last seen</p>
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachmentIcon />
          </IconButton>
          <IconButton>
            <Dots />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        <EndOfMessage />
      </MessageContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  top: 0;
  background: #202c33;
  color: white;
  z-index: 100;
  display: flex;
  height: 60px;
  align-items: center;
`;
const HeaderInformation = styled.div`
  flex: 1;
  > h3 {
    color: #aebac1;
    color: white;
    margin: 0 0 5px 0;
    font-size: 16px;
    text-transform: capitalize;
  }
  > p {
    color: #aebac1;
    color: white;
    margin: 0;
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const HeaderIcons = styled.div``;
const AttachmentIcon = styled(AttachFile)`
  color: #aebac1;
`;
const Dots = styled(MoreVertIcon)`
  color: #aebac1;
`;
const MessageContainer = styled.div``;
const EndOfMessage = styled.div``;
