import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SideBar from "../../components/tutor/sideBar";
import axios from "axios";
import { ADMIN_URL } from "../../constants/adminConstans";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { toast } from "react-toastify";
// import { useGetMyCourseQuery } from "../../slices/tutorSlices/tutorApiSlice";
import { useSelector } from "react-redux";
import { TUTOR_URL } from "../../constants/tutorConstants";
import AddCourseForm from "../../components/tutor/AddCourseForm";
import { Link, useNavigate } from "react-router-dom";
import { tutorApiToken } from "../../services/api";

const myCourseScreen = () => {
  const [courseData, setCourseData] = useState([]);
  const [image, setImage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [update, setUpdate] = useState(false);

  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tutorInfo, "tutor infoooo");
    if (!tutorInfo) {
      navigate("/tutor/login");
    }
  });

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const res = await tutorApiToken.get(
          `${TUTOR_URL}course?id=${tutorInfo.res.id}`
        );
        console.log(res.data.courseData, "res data");
        setCourseData(res.data.courseData);
      } catch (error) {
        console.error(error);
      }
    };
    loadCourseData();
  }, [update, deleteStatus]);



  const handleTitleChange = (event, index) => {
    const updatedCourse = [...courseData];
    updatedCourse[index].title = event.target.value;
    setCourseData(updatedCourse);
  };

  const handleDesChange = (event, index) => {
    const updatedCourse = [...courseData];
    updatedCourse[index].description = event.target.value;
    setCourseData(updatedCourse);
  };


  const handlePriceChange = (event, index) => {
    const updatedLesson = [...LessonsData];
    updatedLesson[index].price = event.target.value;
    setLessonsData(updatedLesson);
  };



  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernwebapp");
      data.append("cloud_name", "mubasir umbi");

      fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select a image");
    }
  };

  const updateCourse = async (id, index) => {
    setUpdate(false);
    const description = courseData[index].description;
    const title = courseData[index].title;
    const price = courseData[index].price
    const thumbnail = image ? image : courseData[index].thumbnail;

    if (title.trim() === "" || description.trim() === "") {
      return toast.error("invalid input");
    }

    try {
      console.log(id, title, description, thumbnail, price);
      const res = await tutorApiToken.put(TUTOR_URL + "update_course", {
        id,
        title,
        description,
        thumbnail,
      });
      if (res) {
        toast.success("Course updated");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
    setUpdate(true);
  };

  const handleDelete = async (id) => {
    setDeleteStatus(false);
    try {
      const res = await tutorApiToken.get(`${TUTOR_URL}delete_course?id=${id}`);
      if (res) {
        toast.success(res.data);
        setDeleteStatus(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <SideBar>
      <Box sx={{ display: "block" }}>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1200,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          {courseData.length === 0 ? (
            <Typography fontSize={40} textAlign={"center"}>
              No Course Found!
            </Typography>
          ) : (
            <>
              <Typography sx={{ p: 2 }} component={"h1"} variant="h5">
                My courses
              </Typography>
              <Table sx={{ minWidth: 900 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseData.map((row, index) => (
                    <StyledTableRow key={row.title}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ pr: "auto" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="image-input"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            postDetails(file);
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              document.getElementById("image-preview").src =
                                e.target.result;
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label htmlFor="image-input">
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              id="image-preview"
                              src={row.thumbnail}
                              alt="Update Image"
                              className="update-image"
                              style={{ borderRadius: "50%" }}
                              width="50"
                              height="50"
                            />
                            <Box>
                              <Typography fontSize={10}>Edit</Typography>
                            </Box>
                          </Box>
                        </label>
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        <TextField
                          value={row.title}
                          onChange={(e) => {
                            handleTitleChange(e, index);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <TextField
                          value={row.description}
                          onChange={(e) => {
                            handleDesChange(e, index);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <TextField
                          value={row.price}
                          onChange={(e) => {
                            handlePriceChange(e, index);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => updateCourse(row._id, index)}
                        >
                          update
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                          color="primary"
                        >
                          <Link
                            to={`/tutor/lessons/${row._id}`}
                            style={{ textDecoration: "none", color: "white" }}
                            size="small"
                            variant="contained"
                            sx={{ mr: 1 }}
                          >
                            View
                          </Link>
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ backgroundColor: "#E3242B" }}
                          color="primary"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <AddCourseForm />
      </Box>
    </SideBar>
  );
};

export default myCourseScreen;
