import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { USERS_URL } from "../../constants/usersConstants";
import CourseCard from "./CourseCard";
import {userApi} from '../../services/api'



const Hero = () => {
  const [courseData, setCourseData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await userApi.get("course/popular");
        if (res) {
          console.log(res);
          setCourseData(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, []);

  return (
   
    
    <main>
      <CssBaseline />
      <Box
        component={Paper}
        m={1}
        sx={{
          backgroundImage: `url(${'https://source.unsplash.com/BJx8whKXCgc'})`,
          minHeight: '400px',
          maxHeight: '550px',
          p: 5, 
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center', 
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="text.secondary"
          gutterBottom
          sx={{
            color: '#000',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '4rem' },
          }}
        >
          Comprehensive learning programs & classes for all students
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{
            maxWidth: 'md',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '2rem' },
            lineHeight: { xs: '1.5', sm: '1.6' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            color: '#ffffff',
            padding: '0.5rem',
          }}
        >
          Become lifelong learners with India's best teachers, engaging video lessons, and personalized learning journeys
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Link to={'/course'} style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ borderRadius: 0 }}>
              Explore Courses
            </Button>
          </Link>
        </Stack>
      </Box>

      <CssBaseline />
      <Container
        component="section"
        sx={{ mt: 8, mb: 2, p: 3, border: 1,  textAlign: 'center' }}
        maxWidth="lg"
        alignItems="center"
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Popular courses for you
        </Typography>
        <Typography variant="body1">Popular courses for you</Typography>
      </Container>

      <CourseCard courseData={courseData} />
    </main>

  );
};

export default Hero;
