import {
  Box,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { adminApi } from "../../services/api";
import Chart from "../../components/chart";
import CardEl from "../../components/Card";

const Dashboard = () => {
  const [dashboardData, setdashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await adminApi.get("dashboard");

      if (res) {
        console.log(res, "dashboard data");
        setdashboardData(res.data);
      }
    };
    fetchDashboardData();
  }, []);


  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  const data = [10, 15, 8, 20, 16, 20, 22];

  return (
    <>
      <Box my={2} width={"lg"} textAlign={"center"}>
        <Typography variant="title" component={"h1"}>
          Dashboard
        </Typography>
      </Box>
      <Divider />
      <Container sx={{ p: 2 }}>
        <Box
          sx={{ display: "flex", flexWrap: "nowrap", fontFamily: "monospace" }}
        >
          <CardEl
            bg={"#e3f2fd"}
            mt={4}
            title={"Total Tutors"}
            value={dashboardData.toatalTutors}
          />
          <CardEl
            bg={"#e3f2fd"}
            mt={4}
            title={"Total Students"}
            value={dashboardData.toatalStudents}
          />
          <CardEl
            bg={"#f0f4c3"}
            mt={4}
            title={"Total Course"}
            value={dashboardData.toatalCourse}
          />
          <CardEl
            bg={"#f0f4c3"}
            mt={2}
            title={"Total  Enrolled Course"}
            value={dashboardData.toatalEnrolled}
          />
        </Box>
      </Container>
      <Container maxWidth={"lg"} sx={{ mt: 8 }}>
       
        <Box sx={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
       
          <Card
          
            sx={{
              width: 550,
              minHeight: 300,
              boxShadow: 5,
              ml: 3,
              mt: 3,
              mb: 3,
            }}
          >
             <Typography variant="h5" mb={2} mt={2} textAlign={'center'}>Sales</Typography>
            <Chart categories={categories} data={data} />
          </Card>
          <Card
          
            sx={{
              width: 550,
              minHeight: 300,
              boxShadow: 5,
              ml: 3,
              mt: 3,
              mb: 3,
            }}
          >
             <Typography variant="h5" mb={2} mt={2} textAlign={'center'}>Students</Typography>
            <Chart categories={categories} data={data} type={'bar'} />
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
