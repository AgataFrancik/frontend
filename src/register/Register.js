import React, { useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import api from '../api/posts';

const Register = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(password === re_password)
    {signup(first_name, last_name, email, password, re_password);
      setAccountCreated(true)
    }
  };
  if(isAuthenticated){
    return <Navigate to='/'/>
  }
  if(accountCreated){
    return <Navigate to='/login'/>
  }
  const continueWithGoogle = async () => {
    try{
      const response = await api.get('/api/v1/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/allOffers') //google-oauth2/
      window.location.replace(response.data.authorization_url);
    }catch(err){

    }
  }
  return (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ height: "70vh", width: 280, padding: "1rem" }}>
        <Typography variant="h4">Register</Typography>
        <Box display="flex" flexDirection="column" padding="1rem">
          <form onSubmit={(e) => onSubmit(e)}>
            <TextField
              onChange={(e) => onChange(e)}
              size="small"
              label="First name"
              sx={{ marginBottom: "1rem" }}
              value={first_name}
              name="first_name"
              required
            ></TextField>
            <TextField
              onChange={(e) => onChange(e)}
              size="small"
              label="Last name"
              sx={{ marginBottom: "1rem" }}
              value={last_name}
              name="last_name"
              required
            ></TextField>
            <TextField
              onChange={(e) => onChange(e)}
              size="small"
              label="Password"
              type="password"
              sx={{ marginBottom: "1rem" }}
              value={password}
              name="password"
              required
            ></TextField>
            <TextField
              onChange={(e) => onChange(e)}
              size="small"
              label="Confirm password"
              type="password"
              sx={{ marginBottom: "1rem" }}
              value={re_password}
              name="re_password"
              required
            ></TextField>
            <TextField
              onChange={(e) => onChange(e)}
              size="small"
              label="E-mail"
              sx={{ marginBottom: "1rem" }}
              value={email}
              name="email"
              required
            ></TextField>
            <Button style={{margin: '0.5rem'}} type="submit" variant="contained">
              Register
            </Button>
          </form>
          <Button style={{margin: '0.5rem'}} color="error" variant="contained" onClick={continueWithGoogle}>
              Continue with Google
              </Button>
          <Typography variant="caption" sx={{ marginTop: "1.5rem" }}>
            Already have account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Click here{" "}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Register);
