import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../../../Assets/Styles/Colors";
import { useForm } from "react-hook-form";
import UserServices from "../../../Api/UserServices/User.index";
import {
  ErrorToaster,
  SuccessToaster,
} from "../../../Components/Toaster/Toaster";
import MultiSelectAutocomplete from "../../../Components/MultSelectInput/MultiSelectInput";
import ProjectServices from "../../../Api/ProjectServices/Project.index";

function Form() {
  const [createUser, setCreateUser] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [names, setNames] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [personName, setPersonName] = useState([]);
  // React Hook Form
  console.log(personName)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (formData) => {
    const obj={
      ...formData,
      projectIds : personName
    }
    console.log(obj)
    const { data, responseCode, message } = await UserServices.createUser(
      obj
    );
    try {
      setCreateUser(data);
      SuccessToaster(message);
      console.log(message);
    } catch (error) {
      ErrorToaster(error);
      console.log(error);
    }
  };
  const handleGetProjects = async (page, limit, search ,assignedUser) => {
    try {
      const { data, responseCode, message } = await ProjectServices.getProject(
        page,
        limit,
        search,
        assignedUser?assignedUser:""
      );
      setNames(data?.output?.projects);
      setTotalCount(data?.output?.totalUsers);
      console.log(data);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  useEffect(() => {
    handleGetProjects(1, 1000, "","");
  }, []);
  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            backgroundColor: Colors.primary,
            borderRadius: "10px",
            minHeight: "50vh",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            width: "95%",
            margin: "0 auto",
            color: "#ffffff",
            position: "relative",
          }}
        >
          <Box sx={{ pt: 3 }}>
            <Box>
              <h1>Create User</h1>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: Colors.smokeWhite,
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          p: 2,
          // m: 2,
          position: "absolute",
          top: {
            xs: "70%",
            sm: "55%",
            md: "50%",
          },
          width: "85%",
          right: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ mt: 2 }} container spacing={2} alignItems="center">
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Name</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography variant="caption" color="error">
                  Name is required
                </Typography>
              )}
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Email</InputLabel>
              <TextField
                type="email"
                fullWidth
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  Email is required
                </Typography>
              )}
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Password</InputLabel>
              <TextField
                type="password"
                fullWidth
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Typography variant="caption" color="error">
                  password number is required
                </Typography>
              )}
            </Grid>
            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Phone Number</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <Typography variant="caption" color="error">
                  phone number is required
                </Typography>
              )}
            </Grid>

            {/* Designation */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Select Project</InputLabel>
              <MultiSelectAutocomplete
                names={names}
                onClick={handleGetProjects}
                sx={{ width: "100%" }}
                personName={personName}
                setPersonName={setPersonName}
                selectedUser={selectedUser}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Designation</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("designation", { required: true })}
              />
              {errors.designation && (
                <Typography variant="caption" color="error">
                  Designation is required
                </Typography>
              )}
            </Grid>
            {/* Role */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Role</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("role", { required: true })}
              />
              {errors.role && (
                <Typography variant="caption" color="error">
                  Role is required
                </Typography>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  color: Colors.white,
                  padding: "5px 25px",
                  "&:hover": {
                    background:
                      "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  },
                }}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
