import React, { useEffect, useState } from "react";
import SideBar from "../../components/tutor/sideBar";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { tutorApi, tutorApiToken } from "../../services/api";
import { useSelector } from "react-redux";


const MyStudentsScreen = () => {
  
  const [students, setStudents] = useState([]);
  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const id = tutorInfo.res.id;
  console.log(id);

  useEffect(() => {
    try {
      const loadMyStudents = async () => {
        const res = await tutorApiToken.get(`my_students?id=${id}`);
        if (res) {
          console.log(res);
          setStudents(res.data);
        }
      };
      loadMyStudents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SideBar>
        <Box sx={{ display: "block" }}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 1200,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {students.length === 0 ? (
              <Typography fontSize={40} textAlign={"center"}>
                No Students Found!
              </Typography>
            ) : (
              <>
                <Typography sx={{ p: 2 }} component={"h1"} variant="h5">
                  My Students
                </Typography>
                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>First Name</StyledTableCell>
                      <StyledTableCell align="left">Last Name</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      {/* <StyledTableCell align="left">Actions</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell align="left">
                          {row.fName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.lName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.email}
                        </StyledTableCell>
                        {/* <StyledTableCell align="left">
                          {row.email}
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        </Box>
      </SideBar>
    </>
  );
};

export default MyStudentsScreen;
