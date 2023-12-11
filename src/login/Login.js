import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import api from "../api/posts";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  const continueWithGoogle = async () => {
    try {
      const res = await api.get(
        "/api/v1/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/allOffers"
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      width="100%"
      height="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ height: "50vh", width: 280, padding: "1rem" }}>
        <Typography variant="h4">Login</Typography>
        <Box display="flex" flexDirection="column" padding="1rem">
          <form onSubmit={(e) => onSubmit(e)}>
            <TextField
              size="small"
              placeholder="Username"
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => onChange(e)}
              value={username}
              name="username"
              id="username"
              required
            ></TextField>
            <TextField
              type="password"
              size="small"
              name="password"
              placeholder="Password"
              sx={{ marginBottom: "2rem" }}
              onChange={(e) => onChange(e)}
              value={password}
              id="password"
              required
            ></TextField>
            <Button
              style={{ margin: "0.5rem" }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
          <Button
            style={{ margin: "0.5rem" }}
            color="error"
            variant="contained"
            onClick={continueWithGoogle}
          >
            Continue with Google
          </Button>
          <Typography variant="caption" sx={{ marginTop: "1.5rem" }}>
            Dont have account yet?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Click here
            </Link>
          </Typography>
          <Typography variant="caption" sx={{ marginTop: "0.5rem" }}>
            Forgot password?{" "}
            <Link
              to="/resetPassword"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Reset Password
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

export default connect(mapStateToProps, { login })(Login);
