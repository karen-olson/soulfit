import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";

const CategoryCard = ({ category, onCategorySelect }) => {
  function handleCategoryImageClick(e) {
    onCategorySelect(category.id);
    // route to /categories/:id/videos
  }

  return (
    <>
      <ImageListItem key={category.id}>
        <img
          src={`${category.img_url}?h=700&fit=crop&auto=format`}
          alt={category.title}
          loading="lazy"
          onClick={handleCategoryImageClick}
        />
        <ImageListItemBar title={category.name} />
      </ImageListItem>
    </>
  );
};

export default CategoryCard;
