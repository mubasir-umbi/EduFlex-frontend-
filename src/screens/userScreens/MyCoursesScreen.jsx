import axios from "axios";
import React, { useEffect, useState } from "react";
import { USERS_URL } from "../../constants/usersConstants";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { userApi, userApiToken } from "../../services/api";
import AddReview from "../../components/user/AddReview";
import { toast } from "react-toastify";

const MyCoursesScreen = () => {
  const [myCourse, setMyCourse] = useState([]);
  const [review, setReviews] = useState([]);
  const [updated, setUpdated] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  console.log(userInfo, userId, 'user iddddddddddddddddddddddddddddddd');
  const authToken = userInfo?.token;

  const submitHandler = (rating, review, courseId) => {
    try {
      const res = userApiToken.post(
        "review",
        { rating, review, userId, courseId },
      );
      if (res) {
        setUpdated(true);
        toast.success("Review submited successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await userApiToken.get("review");
        if (res) {
          console.log(res);
          const review = [];
          res.data.forEach((rev) => {
            if (userId === rev.user) review.push(rev.course);
          });
          setReviews(review);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, [updated]);

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const res = await userApiToken.get(`my_courses?id=${userId}`);
        if (res) {
          setMyCourse(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourseData();
  }, []);

  return (
    <div>
      <CssBaseline />
      <Box
        px={10}
        height={120}
        sx={{ backgroundColor: "#e9ebf0", color: "#000" }}
      >
        <Typography
          fontFamily={"-moz-initial"}
          fontWeight={700}
          pt={9}
          pl={4}
          maxWidth={"lg"}
          variant="h4"
          ml={"auto"}
          mr={"auto"}
        >
          My learning
        </Typography>

        <Divider sx={{ color: "#fff" }} />
      </Box>

      <Container sx={{ py: 1 }} maxWidth="lg">
        <Grid container spacing={4} mt={2}>
          {myCourse.length === 0 ? (
            <h1>No Courses found!</h1>
          ) : (
            myCourse.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    boxShadow: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                    }}
                    image={course.thumbnail}
                  />
                  <CardContent sx={{ flexGrow: 1, py: 1 }}>
                    <Typography gutterBottom variant="title" component="h3">
                      {course.title}
                    </Typography>
                    <Typography
                      fontFamily={"-moz-initial"}
                      variant="subtitle2"
                      component={"h5"}
                    >
                      {course.description}
                    </Typography>
                    <Typography mt={1}>Price : {course.price}</Typography>

                    <Rating
                      sx={{ mt: 1 }}
                      size="small"
                      precision={0.5}
                      readOnly
                      value={course.rating}
                    ></Rating>
                  </CardContent>
                  <CardActions>
                    <Link to={`/watch/${course._id}`}>
                      <Button
                        sx={{ mb: 2, ml: 1 }}
                        variant="outlined"
                        size="small"
                      >
                        Play
                      </Button>
                    </Link>
                    {review.includes(course._id) ? (
                      ""
                    ) : (
                      <AddReview
                        ratingVal={''}
                        reviewVal={''}
                        edit={false}
                        courseId={course._id}
                        submitHandler={submitHandler}
                      />
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default MyCoursesScreen;
