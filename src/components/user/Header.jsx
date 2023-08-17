import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLogoutMutation } from "../../slices/userSlices/usersApiSlice";
import { logout } from "../../slices/userSlices/authSlice";
import { toast } from "react-toastify";

const pages = ["Products", "Pricing", "Blog"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {};

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: ".01rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EduFlex
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: ".0.1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EduFlex
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            </Box>

            {userInfo ? (
              !userInfo.isAdmin ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Typography>{userInfo.name}</Typography>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/my_courses");
                      }}
                    >
                      My Courses{" "}
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button component={Link} to="/login" color="inherit">
                    Login
                  </Button>
                  <Button component={Link} to="/register" color="inherit">
                    Register
                  </Button>
                </Stack>
              )
            ) : (
              <Stack direction="row" spacing={2}>
                <Button component={Link} to="/tutor/login" color="inherit">
                  Tutor Login
                </Button>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
