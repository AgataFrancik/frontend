import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import WorkIcon from "@mui/icons-material/Work";
import  MenuBar  from "./menuBar";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [show, setShow] = useState(true);

  var token = "dasfdas213";
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Box display="flex" flexDirection="row">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <WorkIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography marginTop="0.7rem">JobFinder</Typography>
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" marginTop="0.35rem">
            <Link to="/allOffers" style={{ textDecoration: "none", color: "inherit" }}>
              <Button marginRight="1rem" color="inherit">
                Jobs offer
              </Button>
            </Link>
            <Link to="/userOffers" style={{ textDecoration: "none", color: "inherit" }}>
              <Button marginRight="1rem" color="inherit">
                My jobs offers
              </Button>
            </Link>
            <Box
              onMouseOver={() => {
                setShow(false);
              }}
              onMouseLeave={() => {
                setShow(true);
              }}
              marginRight="2rem"
              //marginTop="0.35rem"
              position="relative"
            >
              <Button color="inherit">My account</Button>

              <Box
                hidden={show}
                sx={{
                  width: "5rem",
                  height: "5rem",
                  backgroundColor: "primary",
                  position: "absolute",
                  left: "5",
                  zIndex: "1",
                }}
                onMouseLeave={() => setShow(true)}
              >
                <MenuBar />
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
