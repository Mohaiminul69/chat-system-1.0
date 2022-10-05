import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { useRouter } from "next/router";
import { query, collection, where } from "firebase/firestore";

const Chat = () => {
    const router = useRouter()
  const chatId = router.query.id

  console.log(chatId)
  
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

// export const getServerSideProps = async (context) => {
//     const q = query(collection(db, "chats"), where("email", "==", emailToSearch));
// };

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
