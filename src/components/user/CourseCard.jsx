import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";

const CourseCard = ({ courseData }) => {
  return (
    <>
      <CssBaseline />
      <main>
        <CssBaseline />

        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4} mt={2}>
            {courseData.length === 0 ? (
              <Typography gutterBottom variant="h5" component="h2">
                No Course available
              </Typography>
            ) : (
              courseData.map((course) => (
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
                        // 16:9
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
                      <Typography mt={1}>
                        Price :<LiaRupeeSignSolid/>{course.price} <span>&nbsp;</span>
                        <s>2999</s>
                      </Typography>

                      <Rating
                        sx={{ mt: 1 }}
                        size="small"
                        precision={0.5}
                        readOnly
                        value={course.rating}
                      ></Rating>
                    </CardContent>
                    <CardActions>
                      <Link to={`/course_view/${course._id}`}>
                        <Button size="small" variant="outlined" sx={{ mb: 1 }}>
                          View
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CourseCard;
