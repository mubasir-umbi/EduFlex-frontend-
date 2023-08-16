import { React, useEffect, useState } from "react";
import { userApi } from "../../services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

const Questions = ({ lesson, courseId }) => {
  const [question, setQuestion] = useState("");
  const [QuestionsData, setQuestionsData] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const authToken = userInfo.token


  useEffect(() => {
    const getQuestiotns = async () => {
      try {
        const res = await userApi.get(`questions?id=${courseId}`, );
        if (res) {
          setQuestionsData(res.data);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuestiotns();
  }, []);

  const submitHandler = async () => {
    console.log(lesson);
    const text = question;
    const lessonId = lesson._id;
    try {
      const res = await userApi.post("question", {
        userId,
        courseId,
        lessonId,
        text,
      },  {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (res) {
        toast.success(res.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      
      {lesson && (
        <Box
          height={80}
          width={"65%"}
          sx={{ backgroundColor: "#f5f5f5" }}
          p={8}
        >
          <Typography>Lesson No: {lesson.lessonNumber}</Typography>
          <Typography>Title: {lesson.title}</Typography>
          <Typography>Description: {lesson.description}</Typography>
        </Box>
      )}

      <Box p={4} ml={1} width={"67%"} height={"auto"} color={"#244D61"}>
        {lesson && (
          <Box>
            <Typography
              fontFamily={"monospace"}
              variant="title"
              component={"h2"}
            >
              Have doubt? ask Here..
            </Typography>
            <TextField
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              variant="standard"
              sx={{ width: "80%", mt: 2, borderRadius: 0 }}
            />
            <Button
              onClick={() => {
                submitHandler();
              }}
              sx={{ ml: 2, mt: 3 }}
              variant="text"
              size="large"
            >
              Submit
            </Button>
          </Box>
        )}
        <Typography mt={3} variant="h6" component={"h3"}>
          Recently asked questions
        </Typography>

        <Box p={2}>
          <Box display={"flex"} m={1}>
            <Avatar sx={{ width: "28px", height: "28px" }}>
              <Typography sx={{ fontSize: "16px" }}>M</Typography>
            </Avatar>
            <Typography
              sx={{ textDecoration: "underline" }}
              variant="subtitle1"
              component={"h1"}
              ml={1}
            >
              mubashir
            </Typography>
          </Box>
          <Box ml={5}>
            <Box mt={2}>
              <Rating readOnly size="small" value={3}></Rating>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle">hessssggggggggggg</Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
      </Box>
    </>
  );
};

export default Questions;
