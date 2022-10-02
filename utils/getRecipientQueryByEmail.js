/* eslint-disable import/no-anonymous-default-export */
import { db } from "../firebase";
import { query, collection, where } from "firebase/firestore";

const getRecipientEmail = (users, userLoggedIn) =>
  users?.find((user) => user !== userLoggedIn?.email);

const queryByEmail = (users, userLoggedIn) => {
  var q;
  const emailToSearch = getRecipientEmail(users, userLoggedIn);
  if (emailToSearch)
    q = query(collection(db, "users"), where("email", "==", emailToSearch));
  return q;
};

export default queryByEmail;
