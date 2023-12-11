import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../context/authProvider";
import { Link, Navigate} from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirmed } from "../actions/auth";

export const ResetPasswordConfirm = ({ match, reset_password_confirmed }) => {

    const [requestSend, setRequestSend] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    
    reset_password_confirmed(uid, token, new_password, re_new_password);
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
            <Box display="flex" flexDirection="column" padding="1rem">
              <form onSubmit={(e) => onSubmit(e)}>
              <TextField
                  type="password"
                  size="small"
                  name="new_password"
                  placeholder="New Password"
                  sx={{ marginBottom: "2rem" }}
                  onChange={(e) => onChange(e)}
                  value={new_password}
                  id="password"
                  required
                ></TextField>
                <TextField
                  type="password"
                  size="small"
                  name="re_new_password"
                  placeholder="Confirm New Password"
                  sx={{ marginBottom: "2rem" }}
                  onChange={(e) => onChange(e)}
                  value={re_new_password}
                  id="password"
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

export default connect(null,{reset_password_confirmed} )(ResetPasswordConfirm)