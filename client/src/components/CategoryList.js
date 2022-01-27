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
    <Container maxWidth="lg">
      <Box pt={4}>
        <ImageList cols={4} gap={6}>
          {categoryCards}
        </ImageList>
      </Box>
    </Container>
  );
};

export default CategoryList;
