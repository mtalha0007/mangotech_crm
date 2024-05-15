import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../../Assets/Styles/Colors";
import { useForm } from "react-hook-form";
import moment from "moment";
import ProjectServices from "../../Api/ProjectServices/Project.index";
import UserServices from "../../Api/UserServices/User.index";
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster/Toaster";
import Storage from "../../Utils/Storage";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "@emotion/react";

function Form() {
  // Get current date
  const { setStorageItem, getStorageItem } = Storage();
  const currentDate = moment().format("YYYY-MM-DD"); 
  // const currentDate = new Date().toISOString().split("T")[0];

  
  // Function to format date and day
  // const formatDateAndDay = (date) => {
    //   return moment(date).format("D/MMM/YYYY dddd"); // Example format: 3/May/2024 Monday
    // };
  
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectWorkType, setSelectWorkType] = useState("InHouse");
  const [limit, setLimit] = useState(10);
  const [getProject, setGetProject] = useState([
    { project: "", hour_count: "" },
  ]);
  const [projectList, setProjectList] = useState([]);
  const [user, setUser] = useState(getStorageItem("user"));

  const decodedToken = jwtDecode(user.token);
  const userIdFromToken = decodedToken.id;
  const userId = userIdFromToken;

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to get day from the date
  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  // useEffect(() => {
  //   if (user.token) {

  //   }
  // }, [user.token]);

  const onSubmit = async (formData) => {
    const projectsData = getProject.map((projects) => ({
      projectIds: projects.project,
      hour_count: projects.hour_count,
    }));

    const obj = {
      date: selectedDate,
      day: getDayFromDate(selectedDate),
      workType: selectWorkType,
      projects: projectsData,
      comments: formData.comments,
    };

    console.log(obj);
    // const { data, responseCode, message } = await UserServices.updateUser(
    //   userId,
    //   obj
    // );
    // try {
    //   SuccessToaster(message);
    //   console.log(data);
    // } catch (error) {
    //   ErrorToaster(error);
    //   console.log(error);
    // }
  };

  const addProjectField = () => {
    setGetProject([...getProject, { project: "", hour_count: "" }]);
  };

  const removeProjectField = (index) => {
    const updatedProjects = [...getProject];
    updatedProjects.splice(index, 1);
    setGetProject(
      updatedProjects.length > 0
        ? updatedProjects
        : [{ project: "", hour_count: "" }]
    );
  };

  const handleProjectChange = (value, index) => {
    const isAlreadySelected = getProject.some(
      (project, i) => project.project === value && i !== index
    );
    if (isAlreadySelected) {
      console.log("Project already selected in another field!");
    } else {
      const updatedProjects = [...getProject];
      updatedProjects[index].project = value;
      setGetProject(updatedProjects);
    }
  };

  const isProjectDisabled = (projectId, currentIndex) => {
    return getProject.some(
      (project, index) =>
        project.project === projectId && index !== currentIndex
    );
  };

  const handleHourCountChange = (value, index) => {
    const updatedProjects = [...getProject];
    updatedProjects[index].hour_count = value;
    setGetProject(updatedProjects);
  };
  ///get PRojects
  const getAllProjects = async (page, limit, search, user) => {
    const { data, responseCode } = await ProjectServices.getProject(
      page,
      limit,
      search,
      user
    );
    try {
      setProjectList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      getAllProjects(1, 1000, "", userId);
    }
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
          <Box sx={{ pt: 4 }}>
            <Box>
              <h2>Developer Management Form</h2>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: Colors.smokeWhite,
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          p: 2,
          position: "absolute",
          top: {
            xs: "55%",
            sm: "55%",
            md: "57%",
          },
          width: "85%",
          right: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          overflow: "auto",
          height: "450px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ mt: 2 }} container spacing={2} alignItems="center">
            {/* Date */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Date</InputLabel>
              <TextField
                type="date"
                value={selectedDate}
                fullWidth
                onChange={(e) => setSelectedDate(e.target.value)}
                inputProps={{
                  min: currentDate,
                  ...register("date", { required: true }),
                }}
              />
              {errors.date && (
                <Typography variant="caption" color="error">
                  Date is required
                </Typography>
              )}
            </Grid>

            {/* Day */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Day</InputLabel>
              <TextField
                value={getDayFromDate(selectedDate)}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  readOnly: true,

                  ...register("day", { required: true }),
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="date">Date and Day</InputLabel>
              <TextField
                id="date"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: currentDate, // Disables past dates
                  ...register("date", { required: "Date is required" })
                }}
              
                error={!!errors.date}
              />
            </Grid> */}

            {getProject.map((project, index) => (
              <>
                <Grid item xs={12} sm={12}>
                  {index !== 0 && (
                    <Box
                      onClick={() => removeProjectField(index)}
                      sx={{
                        display: "flex",
                        float: "right",
                        padding: "8px 15px",
                        textAlign: "center",
                        color: Colors.white,
                        borderRadius: "50%",
                        backgroundColor: Colors.primary,
                        cursor: "pointer",
                      }}
                    >
                      -
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Select Project</InputLabel>
                  <TextField
                    fullWidth
                    select
                    {...register(`projects[${index}].project`, {
                      required: true,
                      onChange: (e) =>
                        handleProjectChange(e.target.value, index),
                    })}
                  >
                    {projectList?.output?.projects.map((item) => (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        disabled={isProjectDisabled(item._id, index)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.project && (
                    <Typography variant="caption" color="error">
                      Project is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>No of Working Hours</InputLabel>
                  <TextField
                    type="text"
                    fullWidth
                    value={project.hour_count}
                    {...register(`hour_count[${index}].project`, {
                      required: "Working hours are required",
                      pattern: {
                        value: /^\d*(\.\d{0,2})?$/,
                        message:
                          "Invalid format. Use only numbers with up to two decimal places",
                      },
                    })}
                    onChange={(e) => {
                      handleHourCountChange(e.target.value, index);
                      const input = e.target.value;
                      if (!input.match(/^\d*(\.\d{0,2})?$/)) {
                        setError("hour_count", {
                          type: "pattern",
                          message:
                            "Invalid format. Use only numbers with up to two decimal places",
                        });
                      } else {
                        clearErrors("hour_count");
                      }
                    }}
                  />
                  {errors.hour_count && (
                    <Typography variant="caption" color="error">
                      {errors.hour_count.message}
                    </Typography>
                  )}
                </Grid>
              </>
            ))}
            <Grid item xs={12} sm={12}>
              <Box
                onClick={addProjectField}
                sx={{
                  p: 1,
                  width: "19px",
                  textAlign: "center",
                  color: Colors.white,
                  borderRadius: "50%",
                  backgroundColor: Colors.primary,
                  cursor: "pointer",
                }}
              >
                +
              </Box>
            </Grid>

            {/* Select Work Type */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Select Work Type</InputLabel>
              <TextField
                fullWidth
                select
                {...register("workType", { required: true })}
                value={selectWorkType}
                onChange={(e) => setSelectWorkType(e.target.value)}
              >
                <MenuItem value="">Work Type</MenuItem>
                <MenuItem value="InHouse">In House</MenuItem>
                <MenuItem value="wfh">WFH</MenuItem>
              </TextField>
              {errors.workType && (
                <Typography variant="caption" color="error">
                  Work Type is required
                </Typography>
              )}
            </Grid>
            {/* Comments */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Comments (optional)</InputLabel>
              <TextField type="text" fullWidth {...register("comments")} />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sm={6}>
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
