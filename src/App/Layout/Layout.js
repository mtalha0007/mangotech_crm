import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../Assets/Styles/Colors";
import SideNav from "../Layout/SideNav";

export const Layout = () => {
  const [toggleStatus, setToggleStatus] = useState(true);
  return (
    <Box sx={{ bgcolor: "#FCFCFC" }}>
      {/* ========== Header ========== */}
      <Header />

      <Box component="main" sx={{ display: "flex" }}>
        {/* ========== Sidebar ========== */}
        <Box
          sx={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            zIndex:  "1111",
            overflow: "hidden",
            borderRight: `1px solid #EAEAEA`,
            width: {
              xs: toggleStatus ? "40px" : "43px",
              md: toggleStatus ? "260px" : "35px",
              sm: toggleStatus ? "260px" : "35px",
            },
            px: !toggleStatus ? 1.25 : 1.5,
            py: !toggleStatus ? 1 : 2,
            transition: "width 0.5s ease-in-out !important",
            visibility: toggleStatus ? "visible" : "visible",
            // bgcolor: "#FCFCFC",
            background:"rgb(245 246 247)"
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              float: "right",
              mt: 2,
              mr: 0,
              background:"rgb(245 246 247)"
            }}
          >
            {/* <MenuIcon
              onClick={() => setToggleStatus(!toggleStatus)}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                color: Colors.black,
                
                display: { xs: "none", sm: "flex", md: "flex" },
              }}
            /> */}
          </Box>
          <SideNav status={toggleStatus} />
        </Box>

        <Box
          sx={{
            mt: 6,
            height: `calc(100vh)`,
            width: 1,
            position: "relative",
            overflowY: "auto",
            // background:Colors.silver
            background:"rgb(245 246 247)"
          }}
        >
          <Outlet  />
        </Box>
      </Box>
    </Box>
  );
};
