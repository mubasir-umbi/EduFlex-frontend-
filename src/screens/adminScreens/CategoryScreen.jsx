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
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/styles/StyledTableCell";
import { toast } from "react-toastify";
import CategoryForm from "../../components/admin/categoryForm.jsx";
import {adminApi} from "../../services/api"



const CategoryScreen = () => {

  const [catData, setCatData] = useState([]);
  const [image, setImage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  //   const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  //   const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    const loadCatData = async () => {
      try {
        const res = await adminApi.get("category");
        setCatData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCatData();
  }, [deleteStatus, update]);

  const handleNameChange = (event, index) => {
    const updatedCatData = [...catData];
    updatedCatData[index].name = event.target.value;
    setCatData(updatedCatData);
  };

  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernwebapp");
      data.append("cloud_name", "mubasir umbi");

      fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select a image");
    }
  };

  const updateCategory = async (id, index) => {
    setUpdate(false);
    const name = catData[index].name;
    const imageUrl = image ? image : catData[index].imageUrl;
    try {
      const res = await adminApi.post("category/update", {
        id,
        name,
        imageUrl,
      });
      if (res) {
        toast.success("Category updated");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      setUpdate(true);
    }
  };

  //   const handleDelete = (category) => {
  //     setShowDeleteAlert(true);
  //     setDeleteCategory(category);
  //   };

  //   const handleCancelDelete = () => {
  //     setShowDeleteAlert(false);
  //     setDeleteCategory(null);
  //   };

  const handleConfirmDelete = async (id) => {
    setUpdate(false);
    try {
      const res = await adminApi.post("category/delete", { id });
      if (res) {
        toast.success("Category deleted");
        setDeleteStatus(true);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
    setShowDeleteAlert(false);
    setDeleteCategory(null);
  };

  return (
    <SideBar>
      <Box sx={{ display: "flex" }}>
        <CategoryForm />

        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 800,
            marginLeft: 5,
            marginTop: 13,
          }}
        >
          {catData.length === 0 ? (
            <Typography fontSize={40} textAlign={"center"}>
              No Category Found!
            </Typography>
          ) : (
            <>
              <Typography sx={{ p: 2 }} component={"h1"} variant="h5">
                Category
              </Typography>
              <Table sx={{ minWidth: 675 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catData.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ pr: "auto" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="image-input"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            postDetails(file);
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              document.getElementById("image-preview").src =
                                e.target.result;
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label htmlFor="image-input">
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              id="image-preview"
                              src={row.imageUrl}
                              alt="Update Image"
                              className="update-image"
                              style={{ borderRadius: "50%" }}
                              width="50"
                              height="50"
                            />
                            <Box>
                              <Typography fontSize={10}>Edit</Typography>
                            </Box>
                          </Box>
                        </label>
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        <TextField
                          value={row.name}
                          onChange={(e) => {
                            handleNameChange(e, index);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => updateCategory(row._id, index)}
                        >
                          update
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "Red" }}
                          color="primary"
                          onClick={() => handleConfirmDelete(row._id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
      </Box>
    </SideBar>
  );
};

export default CategoryScreen;
