import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { useHistory } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const history = useHistory();

  function handleCategoryImageClick(e) {
    history.push(`/categories/${category.id}/videos`);
  }

  if (category) {
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
  } else {
    return <h1>Loading</h1>;
  }
};

export default CategoryCard;
