import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

// DB structure:
// url
// title
// channel_title
// likes
// views
// category_id
// duration
// published_at
// youtube_video_id
// description

const defaultFormData = {
  url: "",
  youtubeVideoId: "",
  title: "",
  channelTitle: "",
  categoryId: "",
  likes: "",
  views: "",
  duration: "",
  description: "",
};

const VideoForm = ({ videos, categories, onSubmitVideo }) => {
  const [formData, setFormData] = useState(defaultFormData);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    const updatedFormData = { ...formData, [key]: value };

    setFormData(() => updatedFormData);
  }

  function getYoutubeVideoId() {
    return formData.url.match(/v=.*/)[0].slice(2);
  }

  function parseFormData(videoId) {
    const parsedFormData = {
      ...formData,
      youtubeVideoId: videoId,
      likes: parseInt(formData.likes),
      views: parseInt(formData.views),
      duration: parseInt(formData.duration),
    };

    return parsedFormData;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const videoId = getYoutubeVideoId();
    const parsedFormData = parseFormData(videoId);

    onSubmitVideo(parsedFormData);

    setFormData(defaultFormData);
  }

  if (videos.length > 0 && categories.length > 0) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ ml: "40vw" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            Add a Video
            {/* {params.id ? "Edit Video" : "Add a Video"} */}
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            pl: "10vw",
            pr: "10vw",
            width: "auto",
            height: "100vh",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                labelid="url"
                id="url"
                label="URL"
                name="url"
                onChange={handleChange}
                value={formData["url"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="title"
                variant="filled"
                fullWidth
                id="title"
                label="Title"
                name="title"
                onChange={handleChange}
                value={formData["title"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="channelTitle"
                variant="filled"
                fullWidth
                id="channelTitle"
                label="Channel Title"
                name="channelTitle"
                onChange={handleChange}
                value={formData["channelTitle"]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelid="category-label"
                  id="categoryId"
                  name="categoryId"
                  onChange={handleChange}
                  value={formData["categoryId"]}
                  label="Category"
                  variant="filled"
                  fullWidth
                >
                  <MenuItem value={categories[0].id}>
                    {categories[0].name}
                  </MenuItem>
                  <MenuItem value={categories[1].id}>
                    {categories[1].name}
                  </MenuItem>
                  <MenuItem value={categories[2].id}>
                    {categories[2].name}
                  </MenuItem>
                  <MenuItem value={categories[3].id}>
                    {categories[3].name}
                  </MenuItem>
                  <MenuItem value={categories[4].id}>
                    {categories[4].name}
                  </MenuItem>
                  <MenuItem value={categories[5].id}>
                    {categories[5].name}
                  </MenuItem>
                  <MenuItem value={categories[6].id}>
                    {categories[6].name}
                  </MenuItem>
                  <MenuItem value={categories[7].id}>
                    {categories[7].name}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="likes"
                variant="filled"
                type="number"
                fullWidth
                id="likes"
                label="Likes"
                name="likes"
                onChange={handleChange}
                value={formData["likes"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="views"
                variant="filled"
                type="number"
                fullWidth
                id="views"
                label="Views"
                name="views"
                onChange={handleChange}
                value={formData["views"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="duration"
                variant="filled"
                type="number"
                fullWidth
                id="duration"
                label="Duration (in seconds)"
                name="duration"
                onChange={handleChange}
                value={formData["duration"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                labelid="description"
                variant="filled"
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={handleChange}
                value={formData["description"]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: "25vw", width: "15vw" }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default VideoForm;
