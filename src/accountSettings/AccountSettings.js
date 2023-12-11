import { Typography, Paper, Box, Button } from "@mui/material";
import React from "react";
import { connect, useSelector } from "react-redux";
import { password_reset, username_reset } from "../actions/auth";

export const AccountSettings = ({username_reset, password_reset}) => {
  const username = useSelector((state) => state.auth.user.username);
  const email = useSelector((state) => state.auth.user.email);
  const date = useSelector((state) => state.auth.user.date_joined);
  const dateJoined = date.toString().slice(0,10);
  const resetPassword = async () => {
    password_reset(email);
  };
  const resetUsername = async () => {
    username_reset(email);
  }
  return (
    <Box
      width="100%"
      height="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ width: "45%" }}>
      <Typography variant="h3" style={{ margin: "1rem" }}>
          Your profile
        </Typography>
        <Typography variant="h4" style={{ margin: "1rem" }}>
          {username}
        </Typography>
        <Typography variant="h6" style={{ margin: "1rem" }}>
          Email: {email}
        </Typography>
        <Typography variant="h6" style={{ margin: "1rem" }}>
          You joined us: {dateJoined}
        </Typography>
        <Box display="flex" flexDirection="column" padding="1rem">
          <Button
            style={{ margin: "0.5rem", width: '60%' }}
            color="error"
            variant="contained"
            onClick={resetUsername}
          >
            RESET USERNAME
          </Button>

          <Button
            style={{ margin: "0.5rem", width: '60%' }}
            color="error"
            variant="contained"
            onClick={resetPassword}
          >
            RESET PASSWORD
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default connect(null, { password_reset, username_reset })(AccountSettings);