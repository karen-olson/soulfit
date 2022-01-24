import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

const AuthPage = ({ createUser, onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <Box
        sx={{
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "cursive",
            fontSize: "120px",
            color: "primary.dark",
            textJustify: "true",
          }}
        >
          SoulFit
        </Typography>
      </Box>
      {showLogin ? (
        <>
          <LogInForm onLogin={onLogin} />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
              Don't have an account?
              <Button
                sx={{ fontSize: "large", textTransform: "none" }}
                onClick={() => setShowLogin(false)}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <SignUpForm createUser={createUser} />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
              Already have an account?
              <Button
                sx={{ fontSize: "large", textTransform: "none" }}
                onClick={() => setShowLogin(true)}
              >
                Log In
              </Button>
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
};

export default AuthPage;
