import React, {useState, useEffect} from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from '../api/posts'

export const EditOffer = ({ edit_offer }) => {
  const { id } = useParams();

  const [offer, setOffer] = useState({
    company_name: "",
    salary: "",
    job_name: "",
    place: "",
    tags: "",
    category: "",
  });
  const author = useSelector((state) => state.auth.user.id);

  const { company_name, salary, job_name, place, tags, category } = offer;

  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`api/v1/${id}`);
        if (response && response.data) setJob(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchPosts();
  }, []);

  const onChange = (e) =>
    setOffer({ ...offer, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    console.log("hallo");
    e.preventDefault();
    edit_offer(
      company_name,
      salary,
      job_name,
      place,
      tags,
      author,
      id,
      category
    );
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop="3rem">
      <Paper sx={{ width: "65%", padding: "1rem" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
          EDIT OFFER
        </Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box display="flex" flexDirection="column">
            <TextField
              placeholder="Company name"
              onChange={(e) => onChange(e)}
            ></TextField>
            <TextField
              placeholder="Salary"
              onChange={(e) => onChange(e)}
            ></TextField>
            <TextField
              placeholder="Job name"
              onChange={(e) => onChange(e)}
            ></TextField>
            <TextField
              placeholder="Place"
              onChange={(e) => onChange(e)}
            ></TextField>
            <TextField
              placeholder="Tags"
              onChange={(e) => onChange(e)}
            ></TextField>
            <TextField
              placeholder="Category"
              onChange={(e) => onChange(e)}
            ></TextField>
            <Button variant="contained" sx={{ width: "20%", margin: "1rem" }}>
              EDIT
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
