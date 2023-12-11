import { Box, Button, Divider, Paper } from '@mui/material';
import React, {useState} from 'react';
import { Link, Navigate } from "react-router-dom";
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

const MenuBar = ({logout, isAuthenticated}) => {
  const [redirect, setRedirect] = useState(false);
  const logout_user = () =>{
    logout();
    setRedirect(true);
  }
   
  return (
    <Paper sx={{borderRadius: "1rem", width: "10rem"}}>
      <Box sx={{ backgroundColor: 'primary', width: '100%', height: '7rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          { isAuthenticated ? 
          <Box>
              <Link to="/settings" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Settings</Button>
              </Link>
              <Divider variant='middle'></Divider>
              <Button onClick={logout_user}>Log Out</Button>
          </Box>
          :
          <Box>
              <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Login</Button>
              </Link>
              <Divider variant='middle'></Divider>
              <Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Create account</Button>
                </Link>
          </Box>
          }
      </Box>
      {redirect ? <Navigate to='/' /> : <></>}
    </Paper>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps ,{logout})(MenuBar);