import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { useRouter } from "next/router";
import { query, collection, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import queryByEmail from "../../utils/getRecipientQueryByEmail";

const Chat = () => {
    const [user] = useAuthState(auth)
    const router = useRouter()
  const chatId = router.query.id
//   const [recipientInfo, setRecipientInfo] = useState({});

//   useEffect(() => {
//     onSnapshot(queryByEmail(users, user), (querySnapshot) => {
//       querySnapshot?.forEach((doc) => {
//         const list = {};
//         list = { ...doc.data(), id: doc.id };
//         setRecipientInfo(list);
//       });
//     });
//   }, [user]);

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
