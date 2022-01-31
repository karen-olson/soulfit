import { Container, Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  function handleCategoryButtonClick(e) {
    history.push("/categories");
  }

  return (
    <>
      <Container>
        <Box sx={{ height: "100vh", width: "100vw" }}>
          <h1>Home Page</h1>
          <Button onClick={handleCategoryButtonClick}>Categories</Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
