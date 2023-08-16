import React, { useEffect, useState } from "react";
import SideBar from "../../components/tutor/sideBar";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Chart from "../../components/chart";
import CardEl from "../../components/Card";
import { tutorApi, tutorApiToken } from "../../services/api";
import { useSelector } from "react-redux";
import Donut from "../../components/Donut";

const DashboardScreen = () => {
  const [ dashdata, setDashData ] = useState({});
  const [ title, setTitle ] = useState([])
  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  const id = tutorInfo.res.id;

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await tutorApiToken.get(`dashboard?id=${id}`);
        if (res) setDashData(res.data)
      } catch (error) {
        console.log(error)
      }}

    fetchData();
  }, []);

  const labels = ["Jan", "Feb", "Mar"];
  const series = [3, 5, 2];

  const data = [10, 15, 8, 20, 16, 20, 22];
  const category = ['mon', 'Tue', 'Wed', 'The', 'Fri', 'Sat', 'Sun'];

  return (
    <SideBar>
      <Box mt={12}>
        <Box my={2} width={"lg"} textAlign={"center"}>
          <Typography variant="title" component={"h1"}>
            Dashboard
          </Typography>
        </Box>
        <Divider />
        <Container sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              fontFamily: "monospace",
            }}
          >
             <Box>
            <Card
              sx={{
                width: 550,
                minHeight: 300,
                boxShadow: 5,
                ml: 3,
                mt: 3,
                mb: 3,
                p: 5,
              }}
            >
              <Typography
                style={{ textDecoration: "underline" }}
                mb={4}
                variant="h5"
                textAlign={"center"}
              >
                Weekly Sales
              </Typography>
              <Chart data={data} categories={category} />
            </Card>
          </Box>
            <CardEl
              bg={"#e3f2fd"}
              mt={4}
              title={"Total Students"}
              value={dashdata.totalStudents}
            />
            <CardEl
              bg={"#e3f2fd"}
              mt={4}
              title={"Total Course"}
              value={dashdata.totalCourse}
            />
          </Box>
        </Container >
        <Container maxWidth={"lg"} sx={{ mt: 8 , }}>
          <Box>
            <Card
              sx={{
                width: 700,
                minHeight: 300,
                boxShadow: 5,
                ml: 3,
                mt: 5,
                mb: 3,
                p: 5,
              }}
            >
              <Typography
                style={{ textDecoration: "underline" }}
                mb={4}
                variant="h5"
                textAlign={"center"}
              >
                Most Enrolled Course
              </Typography>
              <Donut labels={dashdata.title} series={series} />
            </Card>
          </Box>
         
        </Container>
      </Box>
    </SideBar>
  );
};

export default DashboardScreen;
