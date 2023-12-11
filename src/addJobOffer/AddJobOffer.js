import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const AddJobOffer = ({add_offer}) => {
  const [offer, setOffer] = useState({
    company_name: "",
    salary: "",
    job_name: "",
    place: "",
    tags: "",
    category: ""
  });
  const author = useSelector((state) => state.auth.user.id);

  const { company_name, salary, job_name, place, tags, category } = offer;

  const onChange = (e) =>
    setOffer({ ...offer, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    console.log("hallo");
    e.preventDefault();
    add_offer(company_name, salary, job_name, place, tags, author, category);
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop="3rem">
      <Paper sx={{ width: "65%", padding: "1rem" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
          ADD OFFER
        </Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box display="flex" flexDirection="column">
            <TextField
            name="company_name"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Company name"
            ></TextField>
            <TextField
            name="salary"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Salary"
            ></TextField>
            <TextField
            name="job_name"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Job name"
            ></TextField>
            <TextField
            name="place"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Place"
            ></TextField>
            <TextField
            name="tags"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Tags"
            ></TextField>
             <TextField
             name="category"
              style={{ margin: "0.2rem" }}
              onChange={(e) => onChange(e)}
              placeholder="Category"
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "20%", margin: "1rem" }}
            >
              ADD
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
