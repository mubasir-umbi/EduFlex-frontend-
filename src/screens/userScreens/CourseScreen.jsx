import {
  Button,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ADMIN_URL } from "../../constants/adminConstans";
import SearchBar from "../../components/SerachBar";
import CourseCard from "../../components/user/CourseCard";
import { admin, userApi } from "../../services/api";


const CourseScreen = () => {
  const [courseData, setCourseData] = useState([]);
  const [catData, setCatData] = useState([]);

  const fetchCourseData = async () => {
    try {
      const res = await admin.get("course");
      if (res) {
        setCourseData(res.data.courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const res = await admin.get("category");
        if (res) {
          console.log(res);
          setCatData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCatData();
    fetchCourseData();
  }, []);

  const filterCourseByCat = async (id) => {
    try {
      const res = await userApi.get(`/course/category?id=${id}`)
      if(res){
        setCourseData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const filterBySerach =async (query) => {
    try {
      const res = await userApi.get(`search_course?query=${query}`)
      if(res){
        setCourseData(res.data)
      }
    } catch (error) {  
    }
  };

  return (
    <>
      <CssBaseline />
      <main>
        <CssBaseline />

        <Container sx={{ py: 8 }} maxWidth="lg">
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto", mb: 3 }}
          >
            <Button
              onClick={() => {
                fetchCourseData();
              }}
              color="inherit"
              noWrap
              variant="outlined"
              sx={{ p: 1, m: 1, flexShrink: 0, borderRadius: 0 }}
            >
              All Course
            </Button>

            {catData.map((cat) => (
              <Button
                color="inherit"
                noWrap
                key={cat._id}
                variant="outlined`"
                onClick={() => {
                  filterCourseByCat(cat._id);
                }}
                sx={{ p: 1, flexShrink: 0, borderRadius: 0, m: 1, border: 1 }}
              >
                {cat.name}
              </Button>
            ))}
          </Toolbar>

          <SearchBar onSearchHandler={filterBySerach} />
          <CourseCard courseData={courseData}/>
        </Container>
      </main>
    </>
  );
};

export default CourseScreen;
