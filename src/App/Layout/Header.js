import {
  AppBar,
  Box,
  Divider,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Colors } from "../Assets/Styles/Colors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseContext";
import { Logout } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Images } from "../Assets/Images/Images";
function DropDown({ anchorEl, openDropdown, handleClose }) {
  const { userLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={openDropdown}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 140,
          // height: 120, 
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          ".MuiSvgIcon-root": {
            width: 20,
            height: 20,
            ml: 0.5,
            mr: 0.5,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate("/account")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={() => userLogout()}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
const Header = () => {
  const { userLogout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);

  return (
    <AppBar
      sx={{
        mb: 20,
        background: "rgb(245 246 247)",
        boxShadow: "0px 0px 5px 1px #c4c4c4",
      }}
    >
      <Toolbar>
        <Grid container py={2} px={3} justifyContent={"space-between"}>
          <Grid item xs={3} sx={{ display: { xs: "none", sm: "flex" } }}></Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
                width: {xs:"130%" , sm:"auto  "},
              }}
            >
              <Box sx={{marginLeft:{xs:"33px"}}}>
                <img
                className="imgLogo"
                  style={{
                    width: "120px"                
                  }}
                  src={Images.logo}
                />
              </Box>

              <Box
                sx={{ cursor: "pointer" }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Box
                  component="img"
                  src={Images.defaultImage}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </Box>

              <DropDown
                anchorEl={anchorEl}
                openDropdown={openDropdown}
                handleClose={() => setAnchorEl(null)}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
