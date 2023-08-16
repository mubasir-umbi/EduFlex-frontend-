import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { razorPay } from "../../services/razorPay";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Lessons from "../../components/user/lessons";
import { userApi, userApiToken } from "../../services/api";
import CourseReview from "./CourseReview";
import { styled } from '@mui/material/styles';


const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(5),
  backgroundColor: '#e8ecec',
  alignItems: "center",
  textAlign: 'center'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [enrolled, setEnrolled] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const authToken = userInfo?.token;

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await userApi.get(`course/view?id=${id}`);
        if (res) {
          setCourse(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getCourseData();
  }, []);

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const res = await userApiToken.get(`my_courses?id=${userId}`);
        if (res) {
          res.data.forEach((course) => {
            if (course._id === id) {
              setEnrolled(true);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourseData();
  }, []);

  const paymentHandler = async (amount) => {
    if (!userInfo) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }
    const res = await razorPay(amount);
    console.log(res, "am razorpay responseeee");
    if (res) {
      try {
        const res = await userApiToken.post(
          "payment",
          {
            userId,
            courseId: id,
            paymentMode: "razorpay",
            amount,
          },
        )
        if (res) {
          navigate("/success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    // <StyledPaper>
    //   <StyledBox>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} md={6}>
    //         <Card>
    //           <CardActionArea component={Link} to={`/course_view/${course._id}`}>
    //             <CardMedia component="img" height="280" image={course.thumbnail} alt="Course Thumbnail" />
    //             <CardContent>
    //               <Typography component="h2" variant="h5">
    //                 {course.title}
    //               </Typography>
    //               <Divider sx={{ marginBottom: 2 }} />
    //               <Typography variant="subtitle2" color="text.secondary">
    //                 {course.description}
    //               </Typography>
    //               <Typography mt={1} variant="subtitle2" paragraph>
    //                 Just for Rs: <LiaRupeeSignSolid /> <strong>{course.price}</strong> <s>2999</s>
    //               </Typography>
    //               <Link to={`/filter_tutor/${course?.tutor?._id}`}>By: {course?.tutor?.firstName}</Link>
    //               <Box mt={1}>
    //                 <Rating precision={0.5} name="read-only" value={course.rating} readOnly />
    //               </Box>
    //               {enrolled ? (
    //                 <Link to={`/watch/${course._id}`}>
    //                   <Button variant="contained" sx={{ marginBottom: 2, marginTop: 2 }}>
    //                     Watch now
    //                   </Button>
    //                 </Link>
    //               ) : (
    //                 <Button
    //                   variant="contained"
    //                   onClick={() => paymentHandler(course.price)}
    //                   sx={{ marginTop: 2, marginBottom: 2 }}
    //                 >
    //                   Buy now
    //                 </Button>
    //               )}
    //             </CardContent>
    //           </CardActionArea>
    //         </Card>
    //       </Grid>
    //       <Grid item xs={12} md={6}>
    //         {/* ...Additional content */}
    //         <Box sx={{ mt: 8 }}>
    //       <Accordion sx={{ py: 2 }}>
    //         <AccordionSummary
    //           expandIcon={<ExpandMoreIcon />}
    //           aria-controls="panel1a-content"
    //           id="panel1a-header"
    //         >
    //           <Typography variant="title" component={"h2"}>
    //             View all lossons details
    //           </Typography>
    //         </AccordionSummary>
    //         <AccordionDetails>
    //           <Lessons
    //             courseId={course._id}
    //             width={160}
    //             height={130}
    //             status={true}
    //           />
    //         </AccordionDetails>
    //       </Accordion>
    //       <Accordion sx={{ py: 2 }}>
    //         <AccordionSummary
    //           expandIcon={<ExpandMoreIcon />}
    //           aria-controls="panel2a-content"
    //           id="panel2a-header"
    //         >
    //           <Typography variant="title" component={"h2"}>
    //             See Review and Ratinngs
    //           </Typography>
    //         </AccordionSummary>
    //         <AccordionDetails>
    //           <Divider />
    //           <CourseReview id={id} />
    //         </AccordionDetails>
    //       </Accordion>
    //     </Box>
    //       </Grid>
    //     </Grid>
    //     {/* ...Rest of the content */}
    //   </StyledBox>
    // </StyledPaper>


    <StyledPaper>
    <StyledBox>
      <Grid container spacing={3} marginLeft={'auto'} marginRight={'auto'}>
        <Grid item xs={12} md={12} >
          <Card sx={{width: '70%',}}>
            <CardActionArea component={Link} to={`/course_view/${course._id}`}>
              <CardMedia component="img" height="300" image={course.thumbnail} alt="Course Thumbnail" />
              <CardContent>
                <Typography component="h2" variant="h5">
                  {course.title}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography mt={1} variant="subtitle2" paragraph>
                  Just for Rs: <LiaRupeeSignSolid /> <strong>{course.price}</strong> <s>2999</s>
                </Typography>
                <Link to={`/filter_tutor/${course?.tutor?._id}`}>By: {course?.tutor?.firstName}</Link>
                <Box mt={1}>
                  <Rating precision={0.5} name="read-only" value={course.rating} readOnly />
                </Box>
                {enrolled ? (
                  <Link to={`/watch/${course._id}`}>
                    <Button variant="contained" sx={{ marginBottom: 2, marginTop: 2 }}>
                      Watch now
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => paymentHandler(course.price)}
                    sx={{ marginTop: 2, marginBottom: 2 }}
                  >
                    Buy now
                  </Button>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box mt={8} width={'70%'} p={3}>
        <Accordion sx={{ py: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="title" component="h2">
              View all lesson details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Lessons
                courseId={course._id}
                width={160}
                height={130}
                status={true}
              />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ py: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="title" component="h2">
              See Reviews and Ratings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <CourseReview id={id} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </StyledBox>
  </StyledPaper>
  );
};

export default CourseView;
