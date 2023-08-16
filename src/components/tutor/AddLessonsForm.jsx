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
import { theme } from "./Theme";
import { useSelector } from "react-redux";
import { useAddLessonMutation } from "../../slices/tutorSlices/tutorApiSlice";
import validataLesson from "../../validattion/validataLesson";
import SideBar from "./sideBar";
import { useParams } from "react-router-dom";
// import { useGetCategoryQuery } from "../../slices/adminSlices/adminApiSlice";

export default function Lessons() {
  const [errors, setErrors] = useState({});
  const [videoErr, setVideoErr] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lessonNo: "",
    title: "",
    description: "",
  });

  const { id } = useParams();

  const [addLesson, { isLoading, isError, isSuccess }] = useAddLessonMutation();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseId = id;
    const { lessonNo, title, description } = formData;

    const errors = validataLesson(formData, videoUrl);
    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      console.log(errors.length);
      return;
    }

    try {
      console.log("am try catch");
      const res = await addLesson({
        title,
        description,
        lessonNo,
        videoUrl,
        courseId,
      }).unwrap();
      if (res) {
        toast.success("Lesson added sucessfully");
        formData({});
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const postDetails = (file) => {
    if (!file) {
      return toast.error("Please select a file");
    }

    if (file.type.startsWith("video/")) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mernwebapp");
      data.append("cloud_name", "mubasir umbi");

      setLoading(true) 

      fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false)
          toast.success('Video uploaded successfully.')
          setVideoUrl(data.secure_url);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select a video");
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SideBar>
        <Paper sx={{ marginTop: 20, width: 500, }}>
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
                Add New Lesson
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
                  id="lessonNo"
                  label="Lesson Number"
                  name="lessonNo"
                  autoComplete="lessonNo"
                  autoFocus
                  value={formData.lessonNo}
                  onChange={inputChangeHandler}
                />
                {errors.lessonNo && (
                  <Typography fontSize={13} mb={2} color={"#E3242B"}>
                    {errors.lessonNo}
                  </Typography>
                )}
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
                  value={formData.description}
                  onChange={inputChangeHandler}
                />
                {errors.des && (
                  <Typography fontSize={13} mb={2} color={"#E3242B"}>
                    {errors.des}
                  </Typography>
                )}

                <InputLabel sx={{ mt: 2, mb: 0 }} htmlFor="video">
                  Select a Video
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  type="file"
                  accept="video/*"
                  name="video"
                  id="video"
                  onChange={(e) => {
                    postDetails(e.target.files[0]);
                  }}
                />
                {errors.video && (
                  <Typography fontSize={13} mb={2} color={"#E3242B"}>
                    {errors.video}
                  </Typography>
                )}
                {videoUrl && (
                  <Typography fontSize={13} mb={2}>
                    {videoUrl.name}
                  </Typography>
                )}
                {loading && (
                  <Typography fontSize={15} mb={2} mt={2}>
                    Uploading...
                  </Typography>
                )}

                <Button
                  disabled ={loading}
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
      </SideBar>
    </ThemeProvider>
  );
}
