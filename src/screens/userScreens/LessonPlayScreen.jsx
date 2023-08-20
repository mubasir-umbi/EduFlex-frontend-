import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/videoPlayer";
import Lessons from "../../components/user/lessons";
import { useParams } from "react-router-dom";
// import Questions from "../../components/user/questions";
import { userApi, userApiToken } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertDialog from "../../components/AlertDialog";
import ChatPopUp from "../../components/user/chatPopup";

const LessonPlayScreen = () => {
  const [lesson, setLesson] = useState({});
  const [question, setQuestion] = useState("");
  const [questionsData, setQuestionsData] = useState([]);
  const [open, setOpen] = useState(new Array(questionsData.length).fill(false));
  const [replyOpen, setReplyOpen] = useState(
    new Array(questionsData.length).fill(false)
  );
  const [reply, setReply] = useState(
    new Array(questionsData.length).fill(false)
  );
  const [replyUpdated, setReplayUpdated] = useState(false);
  const [questionUpdated, setquestionUpdated] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [lessonStatus, setLessonStatus] = useState({});
  const [tutor, setTutor] = useState("");
  const [completedLessons, setCompletedLessons] = useState([])
  // const [completedIndex, setCompletedIndex] = useState(-1);


  const { courseId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const handleReplies = (i) => {
    const newOpen = [...open];
    newOpen[i] = !newOpen[i];
    setOpen(newOpen);
  };

  const handleRplyOpen = (index) => {
    const newReplyOpen = [...replyOpen];
    newReplyOpen[index] = !newReplyOpen[index];
    setReplyOpen(newReplyOpen);
  };

  const handleRply = (e, index) => {
    const newReply = [...reply];
    newReply[index] = newReply[index] = e.target.value;
    setReply(newReply);
  };


  const playHandler = (lesson) => {
    setLesson(lesson);
  };

  const setLessoncount = (count) => {
    console.log(count);
  }

  /// load all questions api call

  useEffect(() => {
    const getQuestiotns = async () => {
      try {
        const res = await userApi.get(`questions?id=${courseId}`);
        if (res) {
          setQuestionsData(res.data);
        }
        setTutor(res.data[0].course.tutor);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestiotns();
  }, [replyUpdated, questionUpdated]);

  /// Submit new question handler function ///

  const submitHandler = async () => {
    const text = question;
    const lessonId = lesson._id;

    if (!text) return;
    try {
      const res = await userApiToken.post("question", {
        userId,
        courseId,
        lessonId,
        text,
      });
      if (res) {
        setquestionUpdated(!questionUpdated);
        toast.success(res.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /// Submit new reply handler function ///

  const replySubmitHandler = async (questionId, index) => {
    const text = reply[index];

    if (!text) return;
    try {
      const res = await userApiToken.post("reply", {
        userId,
        questionId,
        text,
      });
      if (res) {
        setReplayUpdated(!replyUpdated);
        toast.success(res.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /// Question edit api call it takes question id as querey and text in body

  const qstEditHandler = (id, text) => {
    try {
      const res = userApiToken.put(`questions?id=${id}`, { text });
      if (res) {
        toast.success(res.data);
        setquestionUpdated(!questionUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Question delete api call it takes question id as querey

  const qstDeleteHandler = async (id) => {
    try {
      const res = await userApiToken.delete(`questions?id=${id}`);
      if (res) {
        toast.success(res.data);
        setquestionUpdated(!questionUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Reply edit api call it takes question id as querey and text in body

  const replyEditHandler = (id, text) => {
    console.log(id, text);
    try {
      const res = userApiToken.put(`reply?id=${id}`, { text });
      if (res) {
        toast.success(res.data);
        setReplayUpdated(!replyUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /// Reply delete api call it takes question id as querey

  const replyDeleteHandler = async (id) => {
    try {
      const res = await userApiToken.delete(`reply?id=${id}`);
      if (res) {
        toast.success(res.data);
        setReplayUpdated(!replyUpdated);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchCompletedCourse = async() => {
      const res = await userApi.get(`progress?userId=${userId}&courseId=${courseId}`);
      console.log(res, 'am from progress restttttttttttttttttttttttttttttttttttt');

      const completed = []
      res.data.completedLessons.map((lesson, i)=> {
        // completed.push(lesson._id)
        completed[i] = lesson._id
      } )
      setCompletedLessons(completed)
    }
    fetchCompletedCourse()
  }, [])

  const onComplete = async (lessonId,) => {
    console.log(completedLessons, 'cmpl crs');
    console.log(lessonId, 'am from progresss');
    if(completedLessons.includes(lessonId))return

    const res = await userApi.post('progress', {userId, courseId, lessonId})
    console.log(res, 'am completed resppppppppppppp');
    setCompletedLessons(res.data.userProgress.completedLessons)
  }

  return (
    <>
      <Box display={"flex"}>
        <VideoPlayer
          url={lesson.videoUrl}
          lessonId={lesson._id}
          onComplete={onComplete}
        />
        <Box
          style={{ width: "30%" }}
          ml={2}
          mt={4}
          mr={2}
          sx={{
            maxHeight: {
              xs: "200px",
              sm: "300px",
              md: "400px",
              lg: "550px",
            },
            overflowY: "auto",
          }}
        >
          <Lessons
            status={false}
            width={"100px"}
            courseId={courseId}
            height={"auto"}
            des={"p"}
            onPlayHandler={playHandler}
            completed = {completedLessons}
          />
        </Box>
      </Box>
      <p>Completed: {lessonStatus.completed ? "Yes" : "No"}</p>
      <Divider width={"68%"} sx={{ mb: 3, ml: 1 }} />
      {/* <Questions lesson={lesson} courseId={courseId} /> */}

      {lesson && (
        <Box
          height={80}
          width={"64%"}
          sx={{ backgroundColor: "#f5f5f5" }}
          p={3}
          pl={5}
        >
          <Typography variant="subtitle1">
            Lesson No: {lesson.lessonNumber}
          </Typography>
          <Typography variant="h6">Title: {lesson.title}</Typography>
          <Typography variant="p">Description: {lesson.description}</Typography>
        </Box>
      )}

      <Box p={4} ml={5} width={"67%"} height={"auto"} color={"#244D61"}>
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
              style={{ textTransform: "capitalize" }}
              sx={{ mt: 3 }}
              placeholder="Add a question"
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

        <Box p={2} color={"#000"} fontFamily={"serif"} fontSize={17}>
          {questionsData.map((qst, index) => {
            return (
              <>
                <Box display={"flex"} m={1}>
                  <Avatar
                    sx={{
                      backgroundColor: "#244D61",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <Typography sx={{ fontSize: "16px" }}>
                      {qst.user.fName[0]}
                    </Typography>
                  </Avatar>
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    variant="subtitle1"
                    component={"h3"}
                    fontSize={16}
                    ml={1}
                  >
                    {qst.user.fName}
                  </Typography>
                  <Typography
                    fontSize={14}
                    ml={2}
                    variant="caption"
                    color="textSecondary"
                  >
                    {formatDistanceToNow(new Date(qst.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
                <Box ml={7} mb={1}>
                  <Typography variant="subtitle">{qst.text}</Typography>
                </Box>
                <Box display={"flex"} ml={2} color="#7B94A0">
                  <Button
                    mr={1}
                    sx={{ ml: 5 }}
                    onClick={() => {
                      handleRplyOpen(index);
                    }}
                    style={{ fontSize: 13, textTransform: "capitalize" }}
                  >
                    Reply
                  </Button>
                  {qst.user._id === userId ? (
                    <>
                      <AlertDialog
                        item={"question"}
                        qstDeleteHandler={qstDeleteHandler}
                        id={qst._id}
                      />
                      <AlertDialog
                        item={"qstnEdit"}
                        value={qst.text}
                        qstEditHandler={qstEditHandler}
                        id={qst._id}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </Box>
                <Collapse sx={{ mb: 1 }} in={replyOpen[index]}>
                  <TextField
                    sx={{ ml: 7, width: "70%" }}
                    variant="standard"
                    placeholder="Add a reply"
                    onChange={(e) => {
                      handleRply(e, index);
                    }}
                    value={reply[index]}
                  ></TextField>
                  <Button
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                    onClick={() => {
                      replySubmitHandler(qst._id, index);
                    }}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleRplyOpen(index);
                    }}
                    style={{ textTransform: "capitalize" }}
                  >
                    Cancel
                  </Button>
                </Collapse>

                <Box width={120} onClick={() => handleReplies(index)} ml={6}>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                  <Button
                    style={{ textTransform: "capitalize" }}
                    sx={{ fontSize: 14, pb: 2 }}
                  >
                    {qst.replies.length} Replies
                  </Button>
                </Box>

                {qst.replies.map((rply) => {
                  return (
                    <Box ml={6} mb={3}>
                      <Collapse in={open[index]}>
                        <Box ml={2}>
                          <Box display={"flex"} m={1}>
                            <Avatar
                              sx={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#244D61",
                              }}
                            >
                              <Typography sx={{ fontSize: "16px" }}>
                                {rply.user.fName[0]}
                              </Typography>
                            </Avatar>
                            <Typography
                              sx={{ textDecoration: "underline" }}
                              fontSize={14}
                              component={"h1"}
                              ml={1}
                            >
                              {rply.user.fName}
                            </Typography>
                            <Typography
                              fontSize={13}
                              ml={1}
                              variant="caption"
                              color="textSecondary"
                            >
                              {formatDistanceToNow(new Date(rply.createdAt), {
                                addSuffix: true,
                              })}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle" ml={5}>
                            {rply.text}
                          </Typography>
                          <Box display={"flex"} ml={5} color="#7B94A0">
                            {rply.user._id === userId ? (
                              <>
                                <AlertDialog
                                  item={"reply"}
                                  replyDeleteHandler={replyDeleteHandler}
                                  id={rply._id}
                                />
                                <AlertDialog
                                  item={"replyEdt"}
                                  value={rply.text}
                                  replyEditHandler={replyEditHandler}
                                  id={rply._id}
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}
              </>
            );
          })}
          <Divider />
        </Box>
      </Box>
      <div style={{ position: "fixed", bottom: 80, right: 20 }}>
        <ChatPopUp tutorId={tutor} />
      </div>
    </>
  );
};

export default LessonPlayScreen;
