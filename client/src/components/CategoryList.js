import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { ImageList } from "@mui/material";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories, onCategorySelect }) => {
  const categoryCards = categories.map((category) => (
    <CategoryCard
      category={category}
      onCategorySelect={onCategorySelect}
      key={category.id}
    />
  ));

  return (
    <Container maxWidth="xl">
      <Box
        centered
        pt={4}
        sx={{ width: "auto", height: "100vh", pt: "5vh", pb: "10vh" }}
      >
        <ImageList cols={4} gap={6}>
          {categoryCards}
        </ImageList>
      </Box>
    </Container>
  );
};

export default CategoryList;
