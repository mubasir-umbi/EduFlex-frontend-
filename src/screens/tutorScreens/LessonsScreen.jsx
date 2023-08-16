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
import { useSelector } from "react-redux";
import { TUTOR_URL } from "../../constants/tutorConstants";
import AddCourseForm from "../../components/tutor/AddCourseForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddLessonsForm from "../../components/tutor/AddLessonsForm";
import { tutorApi, tutorApiToken } from "../../services/api";

const LessonsScreen = () => {
  const [LessonsData, setLessonsData] = useState([]);
  const [image, setImage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [update, setUpdate] = useState(false);

  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!tutorInfo) {
      navigate("/tutor/login");
    }
  });

  useEffect(() => {
    const loadLessonData = async () => {
      try {
        const res = await tutorApiToken.get(`course/lesson?id=${id}`);
        if (res) {
          setLessonsData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadLessonData();
  }, [update, deleteStatus]);

  const handleTitleChange = (event, index) => {
    const updatedLesson = [...LessonsData];
    updatedLesson[index].title = event.target.value;
    setLessonsData(updatedLesson);
  };

  const handleDesChange = (event, index) => {
    const updatedLesson = [...LessonsData];
    updatedLesson[index].description = event.target.value;
    setLessonsData(updatedLesson);
  };

  const updateCourse = async (id, index) => {
    setUpdate(false);
    const description = LessonsData[index].description;
    const title = LessonsData[index].title;
    // const thumbnail = image ? image : courseData[index].thumbnail;

    if (title.trim() === "" || description.trim() === "") {
      return toast.error("invalid input");
    }

    try {
      console.log(id, title, description);
      const res = await tutorApiToken.put(`update_lesson?id=${id}`, {
        title,
        description,
      });
      if (res) {
        console.log(res);
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
      const res = await tutorApiToken.get(`delete_lesson?id=${id}`);
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
            marginLeft: 5,
            marginTop: 10,
          }}
        >
          {LessonsData.length === 0 ? (
            <Typography fontSize={40} textAlign={"center"}>
              No Lessons Found!
            </Typography>
          ) : (
            <>
              <Typography sx={{ p: 2 }} component={"h1"} variant="h5">
                Lessons
              </Typography>
              <Table sx={{ minWidth: 900 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Lesson No</StyledTableCell>
                    <StyledTableCell>Video</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {LessonsData.map((row, index) => (
                    <StyledTableRow key={row.title}>
                      <StyledTableCell>{row.lessonNumber}</StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ pr: "auto" }}
                      >
                        {/* <input
                          type="file"
                          accept="video/*"
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
                        /> */}
                        <label htmlFor="image-input">
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <video
                              style={{ width: "150px" }}
                              controls
                              src={row.videoUrl}
                            ></video>
                            {/* <img
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
                            </Box> */}
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
        <AddLessonsForm />
      </Box>
    </SideBar>
  );
};

export default LessonsScreen;
