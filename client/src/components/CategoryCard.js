import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { useHistory } from "react-router-dom";

const CategoryCard = ({ category, onCategorySelect }) => {
  const history = useHistory();

  function handleCategoryImageClick(e) {
    onCategorySelect(category);
    // route to /categories/:id/videos
    history.push(`/categories/${category.id}/videos`);
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
