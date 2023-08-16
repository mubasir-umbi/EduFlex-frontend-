import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { tutorApi } from "../../services/api";
import CourseCard from "./CourseCard";
import Profile from "../../components/tutor/Profile";
import { Divider, Typography } from "@mui/material";

const CourseTutor = () => {
  const [courseData, setCourseData] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutor, setTutor] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await tutorApi.get(`course?id=${id}`);
        if (res) {
          setStudents(res.data.courseData[0].students.length)
          setTutor(res.data.courseData[0].tutor)
          setCourseData(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseData();
  }, []);

  const subtitleStyle = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '8px',
    textAlign: 'center'
  };

  return (
    <>
      <Profile 
        user={true}
        course={courseData.length}
        students={students}
        tutor={tutor}
      />
      
      <Typography mt={5} variant="subtitle1" style={subtitleStyle}>Courses</Typography>
      <Divider/>
      <CourseCard courseData={courseData} />;
    </>
  );
};

export default CourseTutor;
