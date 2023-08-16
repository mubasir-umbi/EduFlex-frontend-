import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Education from '@mui/icons-material/CastForEducationTwoTone';
import Notifications from '@mui/icons-material/CircleNotificationsTwoTone';
import Category from '@mui/icons-material/CategoryTwoTone';
import Dashboard from '@mui/icons-material/DashboardCustomizeTwoTone';
import { useLogoutMutation } from "../../slices/userSlices/usersApiSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { logout } from "../../slices/userSlices/authSlice";


const theme = createTheme({
  palette: {
    primary: {
      main: '#00695f'
      , 
    },
    secondary: {
      main: '#f50057', 
    },
  },
});




const drawerWidth = 240;

const SideBar = (props) => {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ logoutApiCall ] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      toast.success('Logged out Successfully')
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
   
      <div>
      <Toolbar sx={{backgroundColor: '#00695f'}}/>
      <Divider />
      <List >
      <Link to={'/admin/dashboard'} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon >
              <Dashboard/>
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>
        </Link>

        {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
        </ListItem> */}

        <Link to={'/admin/students'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon >
              <Education/>
            </ListItemIcon>
            <ListItemText primary={'Students'} />
          </ListItemButton>
        </ListItem>
        </Link>


        <Link to={'/admin/tutors'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Education />
            </ListItemIcon>
            <ListItemText primary={'Tutors'} />
          </ListItemButton>
        </ListItem>
        </Link>

        <Link to={'/admin/requests'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary={'Requests'} />
          </ListItemButton>
        </ListItem>
        </Link>

        <Link to={'/admin/category'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary={'Category'} />
          </ListItemButton>
        </ListItem>
        </Link>

      </List>
    </div>
    
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EduFlex
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
          <Stack direction="row" spacing={2}>
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {props.children}
    </Box>
    </ThemeProvider>
  );
}

export default SideBar;
