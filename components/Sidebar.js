import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import * as EmailValidator from "email-validator";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [queryEmail, setQueryEmail] = useState([]);

  useEffect(() => {
    const userChatRef = query(
      collection(db, "chats"),
      where("users", "array-contains", user.email)
    );
    const notesListenerSubscription = onSnapshot(
      userChatRef,
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setQueryEmail(list);
      }
    );

    return notesListenerSubscription;
  }, []);

  const createChat = () => {
    const input = prompt(
      "Please enter the email address of the person you want to chat with"
    );
    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chats into the DB chats collection
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    const found = "";
    queryEmail.find((chat) => {
      found = chat.users.find((user) => user === recipientEmail);
    });
    return found;
  };

  return (
    <Container>
      <Header>
        <IconButton>
          <UserAvater onClick={() => auth.signOut()} />
        </IconButton>
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <Dots />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
      {queryEmail.map((chat) => {
        return <Chat key={chat.id} id={chat.id} users={chat.users} />;
      })}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  background: #111b21;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    color: white;
    padding: 5px;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
  }
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: #202c33;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 60px;
`;
const IconsContainer = styled.div``;
const SearchIcon = styled(SearchRoundedIcon)`
  color: #aebac1;
`;
const ChatIcon = styled(ChatRoundedIcon)`
  color: #aebac1;
`;
const Dots = styled(MoreVertIcon)`
  color: #aebac1;
`;
const UserAvater = styled(AccountCircleRoundedIcon)`
  cursor: pointer;
  color: #aebac1;
  font-size: 40px;
  :hover {
    opacity: 0.8;
  }
`;
