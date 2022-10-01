import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  query,
  onSnapshot,
  where,
  updateDoc,
} from "firebase/firestore";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
        const activeUser = {};
        querySnapshot.forEach((doc) => {
          activeUser = { ...doc.data(), id: doc.id };
        });
        setRegisteredUser(activeUser);
      });
      return notesListenerSubscription;
    }
  }, [user]);

  useEffect(() => {
    if (registeredUser !== null) {
      if (registeredUser.uid === user.uid) {
        updateDoc(
          doc(db, "users", registeredUser.id),
          {
            lastSeen: new Date().toLocaleString(),
          },
          { merge: true }
        );
      } else {
        addDoc(collection(db, "users"), {
          email: user.email,
          lastSeen: new Date().toLocaleString(),
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
    }
  }, [registeredUser]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
