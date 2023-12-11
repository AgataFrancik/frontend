import { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField, Typography} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/posts';


// const job =
//   {
//     Company: "Netia sp z.o.o",
//     Salary: "12 000 zł",
//     JobName: "Junior front dev",
//     Place: "Wroclaw",
//     Describtion: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, ",
//     Contact: "+ 48 111 111 111",
//     Tags: ["JavaScript", "HTML", "CSS"]
//   }

export const JobOfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get(`api/v1/${id}`);
        if(response && response.data) setJob(response.data);
        console.log(response.data)
        
      } catch(err){
        console.log(err.response.data);
      }
    }
    fetchPosts();
  }, [])

  return (
    <Box width="100%"  display="flex" justifyContent="center" marginTop="3rem">
        <Paper sx={{width: "75%", padding: '1rem'}}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h3'>{job.name}</Typography>
            <Typography variant='h6'>{job.company_name}</Typography>
            <Typography variant='h6'>{job.salary}</Typography>
            <Typography variant='h6'>{job.location}</Typography>
            <Typography variant='h6'>{job.description}</Typography>
            <Typography variant='h6'>Contact: {job.contact}</Typography>
            <Button variant='contained' sx={{margin: 2, width: '20%'}} onClick={() => navigate(-1)}>BACK</Button>
          </Box>
        </Paper>
    </Box>
  )
}
