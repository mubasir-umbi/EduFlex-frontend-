import React, { useEffect, useState } from "react";
import { tutorApi } from "../../services/api";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";


const lessons = ({ courseId, width, height, onPlayHandler, des, status }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const res = await tutorApi.get(`course/lesson?id=${courseId}`);
        if (res) {
          setLessons(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadLessons();
  }, [courseId]);

  return (
    <>
      <Grid item xs={12} md={6} >
        {lessons.map((lesson) => {
          return (
            // <CardActionArea key={lesson._id} component="a">
            //   <Card sx={{ display: "flex", height: { height }, mb: 1 }}>
            //     <CardMedia
            //       component="video"
            //       sx={{
            //         width: { width },
            //         ml: 2,
            //         display: { xs: "none", sm: "block" },
            //       }}
            //       image={lesson.videoUrl}
            //       alt="imageLabel"
            //     />
            //     <CardContent sx={{ flex: 1 }}>
            //       <Typography variant="p" paragraph m={0}>
            //         Lesson no: <strong> {lesson.lessonNumber}</strong>
            //       </Typography>
            //       <Typography variant={des} color="text.secondary" m={0}>
            //         {lesson.description}
            //       </Typography>

            //       <Button
            //         disabled={status}
            //         size="small"
            //         variant="outlined"
            //         onClick={() => onPlayHandler(lesson)}
            //         sx={{ borderRadius: 0, mt: 1}}
            //       >
            //         Play
            //       </Button>
            //     </CardContent>
            //   </Card>
            // </CardActionArea>

            <Grid key={lesson._id} item xs={12} md={6}>
            <CardActionArea component="a">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  height: { xs: "auto", md: height },
                  mb: 1,
                  maxHeight: height, 
                  overflow: "hidden", 
                }}
              >
                <CardMedia
                  component="video"
                  sx={{
                    width: { xs: "100%", sm: width },
                    ml: { xs: 0, sm: 2 },
                    mb: { xs: 2, sm: 0 },
                    display: { xs: "block", sm: "block" },
                  }}
                  image={lesson.videoUrl}
                  alt="imageLabel"
                />
                <CardContent
                  sx={{
                    flex: 1,
                    textAlign: { xs: "center", sm: "left" },
                    overflowY: "auto",
                  }}
                >
                  <Typography variant="p" paragraph m={0}>
                    Lesson no: <strong> {lesson.lessonNumber}</strong>
                  </Typography>
                  <Typography variant={des} color="text.secondary" m={0}>
                    {lesson.description}
                  </Typography>
  
                  <Button
                    disabled={status}
                    size="small"
                    variant="outlined"
                    onClick={() => onPlayHandler(lesson)}
                    sx={{ borderRadius: 0, mt: 1 }}
                  >
                    Play
                  </Button>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
  
          );
        })}
      </Grid>
    </>
  );
};

export default lessons;
