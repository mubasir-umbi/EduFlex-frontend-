import React, { useEffect, useState } from "react";
import { userApi } from "../../services/api";
import CourseCard from "./CourseCard";
import { useParams } from "react-router-dom";

const CourseScreen = () => {
  const [courseData, setCourseData] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await userApi.get(`course/category?id=${id}`);
        if (res) {
          setCourseData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, []);

  return <CourseCard courseData={courseData} />;
};

export default CourseScreen;
