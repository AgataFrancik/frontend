import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthContext from "../context/authProvider";
import {Navigate} from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

export const Activate = ({verify, match}) => {

  const [verified, setVerified] = useState(false)

  const verify_account = e => {
    const uid = match.params.uid;
    const token = match.params.token;
    verify(uid, token);
    setVerified(true);
  };


  if(verified){
    return <Navigate to='/'/>
  }

  return (
        <Box
          width="100%"
          height="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Verify your account</Typography>
          <Button onClick={verify_account} size="large" variant="contained">
            Verify
          </Button>
        </Box>
  );
};

export default connect(null,{verify} )(Activate)