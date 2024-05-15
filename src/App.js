import "./App.css";
import useAuth from "./App/Hooks/useAuth";
import { Fragment, useEffect, useState } from "react";
import { Colors } from "./App/Assets/Styles/Colors";
import { createTheme, ThemeProvider } from "@mui/material";
import { Layout } from "./App/Layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./App/Routes/admin.route";
import PublicRoutes from "./App/Routes/public.route";
import CompanyRoute from "./App/Routes/company.route";
import Login from "./App/View/Auth/Login";
import { ToasterContainer } from "./App/Components/Toaster/Toaster";

function App() {
  const { user } = useAuth();
 

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
      h1: {
        fontSize: "72px",
      },
      h2: {
        fontSize: "60px",
      },
      h3: {
        fontSize: "48px",
      },
      h4: {
        fontSize: "36px",
      },
      h5: {
        fontSize: "24px",
      },
      h6: {
        fontSize: "18px",
      },
      subtitle1: {
        fontSize: "20px",
      },
      subtitle2: {
        fontSize: "14px",
        fontWeight: 400,
      },
      caption: {
        fontSize: "12px",
      },
    },
    palette: {
      primary: {
        main: Colors.secondary,
      },
      secondary: {
        main: Colors.primary,
      },
    },
  });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ToasterContainer/> 
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/login"} replace={true} />}
            />
            <Route path="/login" element={<Login />} />

            <Route element={user ? <Layout /> : <Navigate to={"/login"} />}>
              {AdminRoute.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </Route>

            <Route element={user ? <Layout /> : <Navigate to={"/login"} />}>
              {PublicRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </Route>
            <Route element={user ? <Layout /> : <Navigate to={"/login"} />}>
              {CompanyRoute.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
