import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SideBar from "../../components/admin/SideBar";
import axios from "axios";
import { ADMIN_URL } from "../../constants/adminConstans";
import Toggle from "../../components/admin/Switch";
import { Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { adminApi } from "../../services/api";

export default function Students() {
  const [userData, setUsersData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await adminApi.get("students");
        setUsersData(res.data);
      } catch (error) {
        console.error(error);
        setUsersData([]);
      }
    };
    getUsersData();
  }, []);

  return (
    <SideBar>
      <Box>
        <Typography>Students</Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1100,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
        }}
      >
        {userData.length === 0 ? (
          <Typography fontSize={40} textAlign={"center"}>
            No Students Found!
          </Typography>
        ) : (
          <>
            <Typography fontSize={30}>Students</Typography>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="left">First Name</StyledTableCell>
                  <StyledTableCell align="left">Last Name</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((row) => (
                  <StyledTableRow key={row.fname}>
                    <StyledTableCell component="th" scope="row">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.fName}</StyledTableCell>
                    <StyledTableCell align="left">{row.lName}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Toggle
                        owner={"student"}
                        id={row._id}
                        status={row.isBlocked}
                        name={row.fName}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.isBlocked ? "Blocked" : "Active"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
    </SideBar>
  );
}
