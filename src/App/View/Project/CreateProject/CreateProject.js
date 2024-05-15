import React, { useState, useEffect } from "react";
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
import ProjectServices from "../../../Api/ProjectServices/Project.index";
import FileServices from "../../../Api/FileUploadServices/FileUpload.index";
import {
  ErrorToaster,
  SuccessToaster,
} from "../../../Components/Toaster/Toaster";
import MultiSelectInput from "../../../Components/MultSelectInput/MultiSelectInput";
import UserServices from "../../../Api/UserServices/User.index";
import MultiSelectAutocomplete from "../../../Components/MultSelectInput/MultiSelectInput";

function Form() {
  const [selectStatus, setSelectStatus] = useState("active");
  const [selectPriority, setSelectPriority] = useState("medium");
  const [createProject, setCreateProject] = useState({});
  const [fileURL, setFileURL] = useState("");
  const [names, setNames] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [personName, setPersonName] = useState([]);
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFileUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await FileServices.FileUpload(formData);
      console.log(response?.data?.fileUrl);
      setFileURL(response?.data?.fileUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };
  console.log(fileURL);
  // Function to handle form submission
  const onSubmit = async (formData) => {
    const obj = {
      assignedUser: personName,
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      comments: formData.comments,
      endDate: formData.endDate,
      file: fileURL,
      clientDetails: formData.clientDetails,
    };
    console.log(obj)
    try {
      const { data, responseCode, message } =
        await ProjectServices.createProject(obj);
      setCreateProject(data);
      SuccessToaster(message);
      console.log(createProject);
    } catch (error) {
      ErrorToaster(error);
      console.log(error);
    }
  };
  const handleGetUsers = async (page, limit, search) => {
    try {
      const { data, responseCode, message } = await UserServices.getUser(
        page,
        limit,
        search
      );
      setNames(data?.output?.users);
      setTotalCount(data?.output?.totalUsers);
      console.log(data);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  useEffect(() => {
    handleGetUsers(1, 1000, "");
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
              <h1>Create Project</h1>
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
            md: "55%",
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
              <InputLabel>Description</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Typography variant="caption" color="error">
                  Description is required
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel >
                
                Assigned Users
              </InputLabel>

              <MultiSelectAutocomplete
                names={names}
                onClick={handleGetUsers}
                sx={{ width: "100%" }}
                personName={personName}
                setPersonName={setPersonName}
              />
            </Grid>

            {/* Assigned User */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Assigned User</InputLabel>
              <TextField
                type="text"
                fullWidth
                {...register("assignedUser")}
              />
            </Grid> */}
            {/* Created At */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Created At</InputLabel>
              <TextField
                type="date"
                fullWidth
                {...register("createdAt")}
              />
            </Grid> */}
            {/* DeadLine */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Start Date</InputLabel>
              <TextField type="date" fullWidth {...register("startDate")} />
              {errors.startDate && (
                <Typography variant="caption" color="error">
                 Start Date is required
                </Typography>
              )}
            </Grid>
            {/* Status  */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Status</InputLabel>
              <TextField
                fullWidth
                select
                {...register("status", { required: true })}
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">InActive</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="on hold">On Hold</MenuItem>
              </TextField>
              {errors.status && (
                <Typography variant="caption" color="error">
                  Status is required
                </Typography>
              )}
            </Grid> */}
            {/* Priority  */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Priority</InputLabel>
              <TextField
                fullWidth
                select
                {...register("priority", { required: true })}
                value={selectPriority}
                onChange={(e) => setSelectPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
              {errors.priority && (
                <Typography variant="caption" color="error">
                  Priority is required
                </Typography>
              )}
            </Grid> */}

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <InputLabel>End Date</InputLabel>
              <TextField type="date" fullWidth {...register("endDate")} />
              {errors.endDate && (
                <Typography variant="caption" color="error">
                  End Date is required
                </Typography>
              )}
            </Grid>
            {/* File */}

            <Grid item xs={12} sm={6}>
              <InputLabel>File</InputLabel>
              <TextField
                type="file"
                fullWidth
                {...register("file")}
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />  
            </Grid>
            {/* Client Details */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Client Details</InputLabel>
              <TextField type="text" fullWidth {...register("clientDetails")} />
              {errors.clientDetails && (
                <Typography variant="caption" color="error">
                  Client Details is required
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Comments (optional)</InputLabel>
              <TextField type="text" fullWidth {...register("comments")} />
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
