import React, { Fragment, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  CircularProgress,
  IconButton,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../Assets/Styles/Colors";
import { Images } from "../../Assets/Images/Images";
import AuthService from "../../Api/AuthServices/Auth.index";
import { useAuth } from "../../Context/UseContext";
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster/Toaster";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        email: formData.email,
        password: formData.password,
      };
      const { status, responseCode, data, message } = await AuthService.login(
        obj
      );
      userLogin(data);
      SuccessToaster(message);
      if (responseCode === 200 && data.role == "admin") {
        navigate("/dashboard");
      } else if (data.role == "company"){
        navigate("/createUser");
      }else{
        navigate("/userForm");

      }
    } catch (error) {
      ErrorToaster(error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Container
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          mt: 18  ,
          borderRadius: "20px",
        }}
        component="main"
        maxWidth="md"
      >
        <Grid container alignItems="center" sx={{flexDirection:{xs:"column-reverse" ,sm:"row"}}}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component={"img"}
              // width="120px"
              // height="90px"
              src={Images.login}
              sx={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ background: Colors.primary, padding: "57px 20px" }}>
              <CardMedia
                component={"img"}
                width={"120px"}
                height={"90px"}
                src={Images.logo}
                sx={{ objectFit: "contain" }}
              />
              <Box component="form" onSubmit={handleSubmit(login)}>
                <TextField
                  margin="normal"
                  fullWidth
                  sx={{background:Colors.white,
                    borderRadius: "40px",
                    border:"none",
                    outline:"none",
                    "& fieldset":{
                      border:"none",
                      borderRadius: "40px",
                    },
                    "&:hover":{
      
                      borderRadius: "40px",
                    }
                   }}
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: "Please enter your email",
                  })}

                  // error={errors?.email?.message}
                  // helperText={errors?.email?.message}
                />
                {errors.email && (
                <Typography sx={{ml:2}} variant="caption" color="error">
                  Email is required
                </Typography>
              )}
                <TextField
                  margin="normal"
                  fullWidth
                  placeholder="Password"
                  sx={{background:Colors.white,
                    borderRadius: "40px",
                    "& fieldset":{
                      border:"none",
                   
                    }
                   }}
                   
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                  // error={errors?.password?.message}
                  // helperText={errors?.password?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}

                />
                 {errors.password && (
                <Typography sx={{ml:2}} variant="caption" color="error">
                  Password is required
                </Typography>
              )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    ":hover": {
                      color: Colors.white,
                      background:
                        "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                    },
                    background:
                      "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                    color: Colors.white,
                  }}
                >
                  {loading ? <CircularProgress size={22} /> : "Login"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
