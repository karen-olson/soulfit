import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

const defaultFormData = {
  username: "",
  password: "",
};

const LogInForm = ({ onLogin }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(null);

  function handleChange(e) {
    setErrors(null);

    const key = e.target.name;
    const value = e.target.value;

    const updatedFormData = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("/login", configObj).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => onLogin(user));
      } else {
        resp.json().then((err) => setErrors(err.errors));
      }
    });

    setFormData(defaultFormData);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                value={formData["username"]}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData["password"]}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Log In
          </Button>
          <Typography sx={{ color: "orange", fontStyle: "italic" }}>
            {errors}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LogInForm;
