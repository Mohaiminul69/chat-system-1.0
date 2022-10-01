/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../firebase";

const Login = () => {
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://i.ibb.co/9VQr13M/pngegg.png" />
        <Button
          className="customBtn"
          onClick={handleGoogleLogin}
          variant="contained"
        >
          <img
            src="https://img.icons8.com/fluency/50/000000/google-logo.png"
            alt=""
            className="googleIcon"
          />
          <span style={{ marginLeft: "8px" }}>Google Sign In</span>
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
  background: rgb(193, 221, 217);
  background: rgb(221, 236, 234);
`;
const Logo = styled.img`
  height: 180px;
  width: 180px;
  margin-bottom: 40px;
  margin-left: 16px;
`;
