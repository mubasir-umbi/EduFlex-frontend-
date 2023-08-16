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
import { Box, Button, Tooltip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminApi } from "../../services/api";

const RequstsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await adminApi.get("requests");
        setRequests(res.data);
      } catch (error) {
        console.error(error);
        setRequests([]);
      }
    };
    getUsersData();
    console.log(requests.length, "am length");
  }, [accept]);

  const AcceptHandler = async (id) => {
    try {
      const res = await adminApi.post("accept_req", { id });
      if (res) {
        toast.success("Request accepted successfully");
        setAccept(true);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };


  const rejectHandler = async (id) => {
    try {
      const res = await adminApi.post("reject_req", { id });
      console.log(res.data);
      if (res) {
        toast.success("Request rejected");
        setReject(true);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };





  return (
    <SideBar>
      <Box>
        <Typography>Requests</Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, minHeight: 150, ml: "auto", mr: "auto", mt: 20 }}
      >
        {requests.length === 0 ? (
          <Typography fontSize={40} textAlign={"center"}>
            No Requests Found!
          </Typography>
        ) : (
            <> 
            <Typography fontSize={30} >
            Requests
          </Typography>

           
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="left">First Name</StyledTableCell>
                <StyledTableCell align="left">Mobile</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography fontSize={13}> {row.addressLine}</Typography>
                    <Typography fontSize={13}> {row.state}</Typography>
                    <Typography fontSize={13}> {row.country}</Typography>
                    <Typography fontSize={13}> {row.city}</Typography>
                    <Typography fontSize={13}> pin: {row.zip}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title="Reject">
                      <Button
                        onClick={() => {
                          rejectHandler(row._id);
                        }}
                        variant="text"
                        sx={{ backgroundColor: "red", color: "#ffffff", mr: 1 }}
                      >
                        Reject
                      </Button>
                    </Tooltip>
                    <Tooltip title="Accept">
                      <Button
                        onClick={() => {
                          AcceptHandler(row._id);
                        }}
                        variant="text"
                        sx={{ backgroundColor: "green", color: "#ffffff" }}
                      >
                        Accept
                      </Button>
                    </Tooltip>
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
};

export default RequstsScreen;
