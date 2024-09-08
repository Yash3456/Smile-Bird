import styled from "@emotion/styled";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { authenticateLogin, authenticateSignup } from "../APi";

const Textlabel = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Imagebox = styled(Box)`
  background: rgba(32, 126, 214, 0.8) center 85% no-repeat;
  height: 85.5%;
  border-top-right-radius: 10px;
  width: 30%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 500;
  }
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAaccout = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const accountloginview = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to all Application form details here",
  },
};

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const loginintialvlues = {
  username: "",
  password: "",
};

const LoginDialogue = () => {
  const [Account, toggleacount] = useState(accountloginview.login);
  const [login, setlogin] = useState(loginintialvlues);
  const [open, setopen] = useState(true);

  const handleclose = () => {
    toggleacount(accountloginview.login);
  };

  const valuechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const logintest = async () => {
    let response = await authenticateLogin(login);
    console.log(response);
    if (response.status === 200) {
      handleclose();
      //naviagtion to other page
      setopen(false);
    } else {
      // alert of worng login credentials
      alert("Wrong Credenials");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleclose()}
      PaperProps={{ sx: { maxWidth: "unset" } }}
      style={{ background: "rgba(32, 126, 214, 1)" }}
    >
      <Textlabel>
        <Box style={{ display: "flex", height: "100%" }}>
          <Imagebox>
            <Typography variant="h5">{Account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {Account.subHeading}
            </Typography>
          </Imagebox>
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => valuechange(e)}
              name="username"
              label="Enter Username...."
            />
            {alert && <Error>Enter valid Username or Password</Error>}
            <TextField
              variant="standard"
              onChange={(e) => valuechange(e)}
              name="password"
              label="Enter Password..."
            />
            <LoginButton onClick={() => logintest()}>Login</LoginButton>
          </Wrapper>
        </Box>
      </Textlabel>
    </Dialog>
  );
};

export default LoginDialogue;
