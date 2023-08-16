import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { ADMIN_URL } from "../../constants/adminConstans";
import { adminApi } from "../../services/api";


export default function CategoryForm() {
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (name.trim() === "") {
        return toast.error("Invalid name");
      }
      const res = await adminApi.post("category/add", {
        imageUrl,
        name,
      });
      if (res) {
        toast.success("category added succesfully");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00695f",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  const postDetails = (pics) => {
    if (!pics) {
      return toast.error("Please Select a image");
    }

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
          setImageUrl(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select a image");
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ marginTop: 13, width: 500, ml: 5, height: 350 }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ pt: 2 }}>
              Add Category
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Category Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="image"
                type="file"
                id="image"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 50 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
