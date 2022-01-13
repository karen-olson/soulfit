import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const defaultFormData = {
  name: "",
  username: "",
  admin: false,
  password: "",
  passwordConfirmation: "",
};

const SignUpForm = ({ createUser }) => {
  const [formData, setFormData] = useState(defaultFormData);

  function handleChange(e) {
    const value = e.target.value;
    const key = e.target.name;

    const updatedFormData = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    createUser(formData);

    setFormData(defaultFormData);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  value={formData["name"]}
                  onChange={handleChange}
                  placeholder="Name"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  value={formData["username"]}
                  onChange={handleChange}
                  placeholder="Username"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  placeholder="Password"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  value={formData["passwordConfirmation"]}
                  onChange={handleChange}
                  placeholder="Password Confirmation"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
            <Typography>
              Already have an account?
              {/* <Link to= ??>Sign in</Link> */}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;
