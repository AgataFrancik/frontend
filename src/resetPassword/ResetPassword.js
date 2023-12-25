import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState} from "react";
import { Navigate} from "react-router-dom";
import { connect } from "react-redux";
import { password_reset } from "../actions/auth";

export const ResetPassword = ({ password_reset }) => {

    const [requestSend, setRequestSend] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });
  const { email} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    password_reset(email);
    setRequestSend(true);
  };

  if(requestSend){
    return <Navigate to='/'/>
  }

  return (
    <>
        <Box
          width="100%"
          height="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Paper sx={{ height: "30vh", width: 280, padding: "1rem" }}>
            <Typography variant="h4">Request Password Reset:</Typography>
            <Box display="flex" flexDirection="column" padding="1rem">
              <form onSubmit={(e) => onSubmit(e)}>
                <TextField
                  size="small"
                  placeholder="Email"
                  sx={{ marginBottom: "1rem" }}
                  onChange={(e) => onChange(e)}
                  value={email}
                  name="email"
                  id="email"
                  required
                ></TextField>
                <Button size="large" variant="contained" type="submit">
                  Reset Password
                </Button>
              </form>
            </Box>
          </Paper>
        </Box>
    </>
  );
};

export default connect(null,{password_reset} )(ResetPassword)