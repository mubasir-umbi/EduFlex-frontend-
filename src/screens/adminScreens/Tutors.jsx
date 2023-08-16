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
import Toggle from '../../components/admin/Switch'
import { Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { adminApi } from "../../services/api";

export default function Students() {
  const [tutorsData, setTutorsData] = useState([]);

  useEffect(() => {
    const getTutorsData = async () => {
      try {
        const res = await adminApi.get(ADMIN_URL + "tutors");
        setTutorsData(res.data);
      } catch (error) {
        console.error(error);
        setTutorsData([]);
      }
    };
    getTutorsData();
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
        {tutorsData.length === 0 ? (
          <Typography fontSize={40} textAlign={"center"}>
            No Requests Found!
          </Typography>
        ) : (
            <>
            <Typography fontSize={30} >
            Tutors
          </Typography>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="left">First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Adresss</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorsData.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography fontSize={13}> {row.addressLine}</Typography>
                    <Typography fontSize={13}> {row.state}</Typography>
                    <Typography fontSize={13}> {row.country}</Typography>
                    <Typography fontSize={13}> {row.city}</Typography>
                    <Typography fontSize={13}> pin: {row.zip}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Toggle
                      owner={"tutor"}
                      id={row._id}
                      status={row.isBlocked}
                      name={row.firstName}
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
