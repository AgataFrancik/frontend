import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import background from "../assets/biuro.jpg"
import { Link, Navigate } from 'react-router-dom'

export const HomePage = () => {
  return (
    <Box width="100%" height="90vh">
      
      <img style={{objectFit: 'cover', width: "100%", height: "100%", position: 'fixed', opacity: "50%", zIndex: "-3"}} src={background} />
      <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h2">WORK TILL DEATH AWAITS!</Typography>
        <Typography variant="h4">What are you waiting for?</Typography>
        <Link to="/allOffers" style={{ textDecoration: 'none', color: "inherit" }}>
        <Button sx={{marginTop: "1rem"}} variant="contained" size="large">FIND YOUR DREAM JOB</Button>
        </Link>
      </Box>
    </Box>
  )
}
//<Button variant="outlined" size="large" color="primary.dark">FIND YOUR DREAM JOB</Button>