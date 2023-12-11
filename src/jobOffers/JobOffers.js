import { useEffect, useState } from 'react'
import { Box, Paper, Card, Typography, CardContent, CardActions, Button, Chip, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import api from '../api/posts';

export const JobOffers = () => {

  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('api/v1/');
        if(response && response.data) setOffers(response.data);
        console.log(offers)
        console.log(response.data)
        
      } catch(err){
        console.log(err.response.data);
      }
    }
    fetchPosts();
  }, [])

  
  return (
    <Box width="100%"  display="flex" justifyContent="center" marginTop="3rem">
      <Paper sx={{width: "85%"}}>
      <TextField sx={{width: "95%", margin: '1rem'}} onChange={(e) => setSearch(e.target.value)} placeholder="Search" InputProps={{
        startAdornment: <SearchIcon />
      }} ></TextField>
        {offers ? ( offers.filter((job)=>{
          return search.toLocaleLowerCase() === "" ? job : (job.name.toLocaleLowerCase().includes(search) || job.company_name.toLocaleLowerCase().includes(search))
        }).map((job) =>(
          <Card sx={{margin: '1rem'}}>
            <CardContent>
              <Box display="flex" justifyContent='space-between'>
              <Typography variant='h4'>{job.company_name}</Typography>
                  <Box>
                    {job.tags.map((tag) => (
                      <Chip sx={{marginRight: "0.4rem"}} label={tag}></Chip>
                    ))
                    }
                  </Box>
              </Box>
              <Typography>{job.name}</Typography>
              <Typography>{job.location}</Typography>
              <Typography>{job.salary}</Typography>
            </CardContent>
            <CardActions>
              <Box width="100%" display='flex' justifyContent='flex-end'>
                <Link to={"/offerDetails/"+job.id.toString()} style={{ textDecoration: "none", color: "inherit" }}>
                  <Button sx={{marginLeft: '1rem', marginBottom: '1rem', marginRight: '1rem'}} variant='contained'>CHECK IT</Button>
                </Link>
              </Box>
            </CardActions>
          </Card>
        ))) : (
          <p>Loading...</p>
        )}
      </Paper>
    </Box>
  )
}