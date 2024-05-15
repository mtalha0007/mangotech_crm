import React, { Fragment, useState } from "react";
import {
  Box,
  CardMedia,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { Colors } from "../Assets/Styles/Colors";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Images } from "../Assets/Images/Images";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ComputerIcon from "@mui/icons-material/Computer";
import Tooltip from "@mui/material/Tooltip";
import Storage from "../Utils/Storage";
import AssessmentIcon from '@mui/icons-material/Assessment';
function SideNav({ status }) {
  const { setStorageItem, getStorageItem } = Storage();
  // *For User
  const [user, setUser] = useState(getStorageItem("user"));
  const { pathname } = useLocation();
  const [expand, setExpand] = useState([]);

  // *For Collapse
  const handleCollapse = (value) => {
    const currentIndex = expand.indexOf(value);
    const newExpand = [...expand];

    if (currentIndex === -1) {
      newExpand.push(value);
    } else {
      newExpand.splice(currentIndex, 1);
    }

    setExpand(newExpand);
  };
  const PublicRoutes = [
    {
      path: "/userForm",
      icon: <InsertDriveFileIcon />,
      label: "Form",
    },
    {
      path: "/account",
      icon: <SettingsIcon />,
      label: "Account Setting",
    },
  ];

  const AdminRoutes = [
    {
      path: "/dashboard",
      icon: <ComputerIcon />,
      label: "Dashboard",
    },
    {
      label: "Users",
      icon: <GroupIcon />,
      children: [
        {
          path: "/createUser",
          icon: <PersonAddIcon />,
          label: "Create User",
        },
        {
          path: "/userList",
          icon: <FormatListNumberedIcon />,
          label: "User List",
        },
      ],
    },
    {
      label: "Projects",
      icon: <CategoryIcon />,
      children: [
        {
          path: "/createProject",
          icon: <AddCircleIcon />,
          label: "Create Project",
        },
        {
          path: "/projectList",
          icon: <FormatListNumberedIcon />,
          label: "Project List",
        },
      ],
    },
    // {
    //   label: "Company",
    //   icon: <ApartmentIcon />,
    //   children: [
    //     {
    //       path: "/createCompany",
    //       icon: <AddBusinessIcon />,
    //       label: "Create Company",
    //     },
    //     {
    //       path: "/companyList",
    //       icon: <FormatListNumberedIcon />,
    //       label: "Company List",
    //     },
    //   ],
    // },
    {
      path: "/report",
      icon: <AssessmentIcon />,
      label: "Report",
    },    
    {
      path: "/account",
      icon: <SettingsIcon />,
      label: "Account Setting",
    },    
  ];

  const CompanyRoute = [
    {
      label: "Company",
      icon: <ApartmentIcon />,
      children: [
        {
          path: "/createCompany",
          icon: <AddBusinessIcon />,
          label: "Create Company",
        },
        {
          path: "/companyList",
          icon: <FormatListNumberedIcon />,
          label: "Company List",
        },
      ],
    },
    {
      path: "/account",
      icon: <SettingsIcon />,
      label: "Account Setting",
    },
    // {
    //   label: "Users",
    //   icon: <GroupIcon />,
    //   children: [
    //     {
    //       path: "/createUser",
    //       icon: <PersonAddIcon />,
    //       label: "Create User",
    //     },
    //     {
    //       path: "/userList",
    //       icon: <FormatListNumberedIcon />,
    //       label: "User List",
    //     },
    //   ],
    // },
    // {
    //   label: "Projects",
    //   icon: <CategoryIcon />,
    //   children: [
    //     {
    //       path: "/createProject",
    //       icon: <AddCircleIcon />,
    //       label: "Create Project",
    //     },
    //     {
    //       path: "/projectList",
    //       icon: <FormatListNumberedIcon />,
    //       label: "Project List",
    //     },
    //   ],
    // },
  ];
  const isAdmin = user.role;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          cursor: "pointer",
          width: "100%",
          height: "150px",
        }}
      >
        <CardMedia
          component={"img"}
          src={Images.logo}
          sx={{
            height: "100%",
            width: {
              xs: status ? "55px" : "50px",
              md: status ? "195px" : "85px",
              sm: status ? "195px" : "85px",
            },
            display: {
              xs: "none",

              sm: "block",
            },

            objectFit: "contain",
          }}
        />
      </Box>
      <Box>
        <List>
          {isAdmin === "admin"
            ? AdminRoutes.map((item, index) => {
                const isSelected = item.path === pathname ? true : false;
                return (
                  <Fragment key={index}>
                    <Tooltip title={item.label}>
                      <ListItemButton
                        onClick={() =>
                          item?.children?.length > 0 &&
                          handleCollapse(item.label)
                        }
                        key={index}
                        component={item.path ? Link : "div"}
                        to={item.path ?? ""}
                        sx={{
                          mt: 2,
                          padding: "8px",
                          background: isSelected ? "rgb(255, 255, 255)" : "",
                          borderRadius: isSelected ? "0.5rem" : "",
                          boxShadow: isSelected
                            ? "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
                            : "",
                          gap: "10px",
                          ".MuiSvgIcon-root": {
                            color: isSelected ? Colors.primary : Colors.primary,
                          },
                          "&:hover": {
                            background: "rgb(255, 255, 255)",
                            borderRadius: "5px",
                            ".MuiSvgIcon-root": {
                              color: Colors.primary,
                            },
                            ".MuiTypography-root": {
                              color: Colors.primary,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "35px", textAlign: "center" }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                color: isSelected
                                  ? Colors.primary
                                  : Colors.primary,
                                fontWeight: isSelected ? "600" : "400",
                                width: "130px",
                                fontSize: "14px",
                              }}
                            >
                              {item.label}
                            </Typography>
                          }
                        />
                        {item?.children &&
                          (expand.indexOf(item.label) !== -1 ? (
                            <ExpandLess sx={{ color: Colors.primary }} />
                          ) : (
                            <ExpandMore sx={{ color: Colors.primary }} />
                          ))}
                      </ListItemButton>
                    </Tooltip>
                    {item?.children && (
                      <Collapse
                        in={expand.indexOf(item.label) !== -1}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.children.map((child, i) => (
                            <Tooltip title={child.label} key={i}>
                              <ListItemButton
                                key={i}
                                component={child.path ? Link : "div"}
                                to={child.path}
                                sx={{
                                  mt: 1.5,
                                  padding: "8px",
                                  gap: "10px",
                                  background:
                                    child.path === pathname
                                      ? "rgb(255, 255, 255)"
                                      : "",
                                  borderRadius:
                                    child.path === pathname ? "0.5rem" : "",
                                  boxShadow:
                                    child.path === pathname
                                      ? "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
                                      : "",
                                  ".MuiSvgIcon-root": {
                                    color:
                                      child.path === pathname
                                        ? Colors.primary
                                        : Colors.primary,
                                  },
                                  "&:hover": {
                                    background: "rgb(255, 255, 255)",
                                    borderRadius: "5px",
                                    ".MuiSvgIcon-root": {
                                      color: Colors.primary,
                                    },
                                    ".MuiTypography-root": {
                                      color: Colors.primary,
                                    },
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{ minWidth: "35px", textAlign: "center" }}
                                >
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        width: "130px",
                                        fontSize: "14px",
                                        fontWeight:
                                          child.path === pathname
                                            ? "600"
                                            : "400",
                                        color:
                                          child.path === pathname
                                            ? Colors.primary
                                            : Colors.primary,
                                      }}
                                    >
                                      {child.label}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            </Tooltip>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Fragment>
                );
              })
            : isAdmin === "company"
            ? CompanyRoute.map((item, index) => {
                const isSelected = item.path === pathname ? true : false;
                return (
                  <Fragment key={index}>
                    <Tooltip title={item.label}>
                      <ListItemButton
                        onClick={() =>
                          item?.children?.length > 0 &&
                          handleCollapse(item.label)
                        }
                        key={index}
                        component={item.path ? Link : "div"}
                        to={item.path ?? ""}
                        sx={{
                          mt: 2,
                          padding: "8px",
                          background: isSelected ? "rgb(255, 255, 255)" : "",
                          borderRadius: isSelected ? "0.5rem" : "",
                          boxShadow: isSelected
                            ? "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
                            : "",
                          gap: "10px",
                          ".MuiSvgIcon-root": {
                            color: isSelected ? Colors.primary : Colors.primary,
                          },
                          "&:hover": {
                            background: "rgb(255, 255, 255)",
                            borderRadius: "5px",
                            ".MuiSvgIcon-root": {
                              color: Colors.primary,
                            },
                            ".MuiTypography-root": {
                              color: Colors.primary,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "35px", textAlign: "center" }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                color: isSelected
                                  ? Colors.primary
                                  : Colors.primary,
                                fontWeight: isSelected ? "600" : "400",
                                width: "130px",
                                fontSize: "14px",
                              }}
                            >
                              {item.label}
                            </Typography>
                          }
                        />
                        {item?.children &&
                          (expand.indexOf(item.label) !== -1 ? (
                            <ExpandLess sx={{ color: Colors.primary }} />
                          ) : (
                            <ExpandMore sx={{ color: Colors.primary }} />
                          ))}
                      </ListItemButton>
                    </Tooltip>
                    {item?.children && (
                      <Collapse
                        in={expand.indexOf(item.label) !== -1}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.children.map((child, i) => (
                            <Tooltip title={child.label} key={i}>
                              <ListItemButton
                                key={i}
                                component={child.path ? Link : "div"}
                                to={child.path}
                                sx={{
                                  mt: 1.5,
                                  padding: "8px",
                                  gap: "10px",
                                  background:
                                    child.path === pathname
                                      ? "rgb(255, 255, 255)"
                                      : "",
                                  borderRadius:
                                    child.path === pathname ? "0.5rem" : "",
                                  boxShadow:
                                    child.path === pathname
                                      ? "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
                                      : "",
                                  ".MuiSvgIcon-root": {
                                    color:
                                      child.path === pathname
                                        ? Colors.primary
                                        : Colors.primary,
                                  },
                                  "&:hover": {
                                    background: "rgb(255, 255, 255)",
                                    borderRadius: "5px",
                                    ".MuiSvgIcon-root": {
                                      color: Colors.primary,
                                    },
                                    ".MuiTypography-root": {
                                      color: Colors.primary,
                                    },
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{ minWidth: "35px", textAlign: "center" }}
                                >
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        width: "130px",
                                        fontSize: "14px",
                                        fontWeight:
                                          child.path === pathname
                                            ? "600"
                                            : "400",
                                        color:
                                          child.path === pathname
                                            ? Colors.primary
                                            : Colors.primary,
                                      }}
                                    >
                                      {child.label}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            </Tooltip>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Fragment>
                );
              })
            : PublicRoutes.map((item, index) => {
                const isSelected = item.path === pathname ? true : false;
                return (
                  <Fragment key={index}>
                    <Tooltip title={item.label}>
                      <ListItemButton
                        onClick={() =>
                          item?.children?.length > 0 &&
                          handleCollapse(item.label)
                        }
                        key={index}
                        component={item.path ? Link : "div"}
                        to={item.path ?? ""}
                        sx={{
                          mt: 2,
                          padding: "8px",
                          background: isSelected ? "rgb(255, 255, 255)" : "",
                          borderRadius: isSelected ? "0.5rem" : "",
                          boxShadow: isSelected
                            ? "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
                            : "",
                          gap: "10px",
                          ".MuiSvgIcon-root": {
                            color: isSelected ? Colors.primary : Colors.primary,
                          },
                          "&:hover": {
                            background: "rgb(255, 255, 255)",
                            borderRadius: "5px",
                            ".MuiSvgIcon-root": {
                              color: Colors.primary,
                            },
                            ".MuiTypography-root": {
                              color: Colors.primary,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "35px", textAlign: "center" }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                color: isSelected
                                  ? Colors.primary
                                  : Colors.primary,
                                fontWeight: isSelected ? "600" : "400",
                                width: "130px",
                                fontSize: "14px",
                              }}
                            >
                              {item.label}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </Tooltip>
                  </Fragment>
                );
              })}
        </List>
      </Box>
    </Box>
  );
}

export default SideNav;
