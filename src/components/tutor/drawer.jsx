import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Education from "@mui/icons-material/CastForEducationTwoTone";
import Dashboard from "@mui/icons-material/DashboardCustomizeTwoTone";


export const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#00695f" }} />
      <Divider />
      <List>
        <Link
          to={"/tutor/dashboard"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        </Link>


        <Link to={'/tutor/my_students'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon >
              <Education/>
            </ListItemIcon>
            <ListItemText primary={'Students'} />
          </ListItemButton>
        </ListItem>
        </Link>


        <Link to={'/tutor/my_course'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Education />
            </ListItemIcon>
            <ListItemText primary={'Courses'} />
          </ListItemButton>
        </ListItem>
        </Link>

        <Link to={'/tutor/Profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
        </ListItem>
        </Link>

        <Link to={'/tutor/chat'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Chat'} />
          </ListItemButton>
        </ListItem>
        </Link>

        
      </List>
    </div>
  );