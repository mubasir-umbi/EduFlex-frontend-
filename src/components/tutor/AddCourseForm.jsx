import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { ADMIN_URL } from "../../constants/adminConstans";
import { theme } from "../tutor/Theme";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "../../slices/tutorSlices/tutorApiSlice";
import validateCourseForm from "../../validattion/validateCourseForm";
// import { useGetCategoryQuery } from "../../slices/adminSlices/adminApiSlice";

export default function AddCourseForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [catData, setCatData] = useState([]);
  const [errors, setErrors] = useState({});
  const [imageErr, setImgErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const [addCourse, { isLoading, isError, isSuccess }] = useAddCourseMutation();
  //  const { data, isSuccess} =
  //  console.log(useGetCategoryQuery());

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loadCatData = async () => {
      try {
        const res = await axios.get(ADMIN_URL + "category");
        setCatData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCatData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, category, price } = formData;
    const tutor = tutorInfo.res.id;

    console.log(formData, tutor, thumbnail, 'am detailsssss');
    const errors = validateCourseForm(title, description, category, price, thumbnail);
    setErrors(errors);

    // if (!thumbnail) {
    //   setImgErr("Image is requred");
    // }

    console.log(thumbnail,'am thumbnaildssssssssss');

    if (Object.keys(errors).length !== 0 ) {
      console.log(errors,'err',);
      console.log('am from erooorrrrrr');
      return;
    }

    try {

      console.log('hiiiiiiiiiiii hellllllllllllloooooooooo');
      const res = await addCourse({
        title,
        description,
        category,
        tutor,
        thumbnail,
        price,
      }).unwrap();
      if (res) {
        toast.success("Course added sucessfully");
        console.log(res, "response from add course");
        setFormData({})
        setThumbnail(null)
      }
    } catch (error) {
      if (isError) {
        console.log(error);
      }
      console.log(error);  
    }
    setImgErr(null)
  };



  const postDetails = (pics) => {
    console.log("am from post details");
    if (!pics) {
      return setImgErr("Please Select a image");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernwebapp");
      data.append("cloud_name", "mubasir umbi");
      setLoading(true)

      fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const url = data.url.toString();
          setThumbnail(url);
          setLoading(false)
        })
        .catch((err) => console.log(err));
    } else {
      setImgErr("Please Select Image");
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ marginTop: 15, width: 500, ml: 10 }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ pt: 2 }}>
              Add New course
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={formData.title}
                onChange={inputChangeHandler}
              />
              {errors.title && (
                <Typography fontSize={13} mb={2} color={"#E3242B"}>
                  {errors.title}
                </Typography>
              )}
              <TextareaAutosize
                style={{ minHeight: 100, minWidth: "100%" }}
                rows={10}
                placeholder="Add description"
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="description"
                autoFocus
                value={formData.description}
                onChange={inputChangeHandler}
              />
              {errors.des && (
                <Typography fontSize={13} mb={2} color={"#E3242B"}>
                  {errors.des}
                </Typography>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="price"
                name="price"
                autoComplete="price"
                autoFocus
                type="number"
                value={formData.price}
                onChange={inputChangeHandler}
              />
              {errors.price && (
                <Typography fontSize={13} mb={2} color={"#E3242B"}>
                  {errors.price}
                </Typography>
              )}

              <InputLabel id="category">Choose a Category:</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="Category"
                id="category"
                value={formData.category}
                onChange={inputChangeHandler}
                label="Choose category"
                name="category"
              >
                {catData.map((cat) => {
                  return <MenuItem value={cat._id}>{cat.name}</MenuItem>;
                })}
              </Select>

              {errors.category && (
                <Typography fontSize={13} mb={2} color={"#E3242B"}>
                  {errors.category}
                </Typography>
              )}
              <InputLabel sx={{ mt: 2, mb: 0 }} htmlFor="image">
                Select a Thumbnail
              </InputLabel>
              <TextField
                required
                fullWidth
                name="image"
                type="file"
                id="image"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              {errors.image && (
                <Typography fontSize={13} mb={2} color={"#E3242B"}>
                  {errors.image}
                </Typography>
              )}
              {loading && (
                  <Typography fontSize={15} mb={2} mt={2}>
                    Uploading...
                  </Typography>
                )}

              <Button
                disabled = {loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 50 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
