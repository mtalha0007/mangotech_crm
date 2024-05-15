import {
  Box,
  Paper,
  Grid,
  IconButton,
  Table,
  Button,
  MenuItem,
  Collapse,
  FormControl,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TextField,
  InputLabel,
  TablePagination,
  Tooltip,
} from "@mui/material";
import React, { useState, Fragment, useEffect } from "react";
import { Colors } from "../../../Assets/Styles/Colors";
import {
  FilterAlt,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import InputField from "../../../Components/InputField/InputField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserServices from "../../../Api/UserServices/User.index";
import SimpleDialog from "../../../Components/Dialog/Dialog";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader/Loader";
import {
  ErrorToaster,
  SuccessToaster,
} from "../../../Components/Toaster/Toaster";
import moment from "moment";
import { useTheme } from "@emotion/react";
function DataFilter({ sortData, page, rows }) {
  const [filterCollapse, setFilterCollapse] = useState(true);

  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");

  const filterData = () => {
    sortData(page, rows, search, selectedId);
    console.log(selectedId);
    console.log("🚀 ~ filterData ~ search:", search);
  };

  const clearData = () => {
    sortData("");
    setSelectedId("");
    setSearch("");
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box
        component={Paper}
        sx={{ bgcolor: Colors.white, p: 2, borderRadius: "12px", mt: 5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: Colors.primary }}
          >
            Filters
          </Typography>
          <IconButton
            onClick={() => setFilterCollapse(!filterCollapse)}
            sx={{ bgcolor: Colors.primaryLight, color: Colors.primary }}
          >
            <FilterAlt />
          </IconButton>
        </Box>

        <Collapse in={filterCollapse}>
          <Grid container spacing={2} justifyContent="space-between">
            <Fragment>
              <Grid item md={6} sx={{ width: "100%" }}>
                <FormControl fullWidth sx={{ pt: 1 }}>
                  <InputField
                    value={search}
                    onChange={(e) => {
                      console.log(
                        "🚀 ~ DataFilter ~ e.target.value:",
                        e.target.value
                      );
                      setSearch(e.target.value);
                    }}
                    placeholder={"Search"}
                  />
                </FormControl>
              </Grid>
            </Fragment>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={clearData}
                // variant="outlined"
                sx={{
                  color: Colors.primary,
                  mx: 1,
                  textTransform: "capitalize",
                  minWidth: "100px",
                  boxShadow:
                    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                }}
              >
                Clear
              </Button>
              <Button
                onClick={filterData}
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "100px",
                  boxShadow:
                    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                  color: Colors.white,
                  background:
                    "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </Box>
  );
}
function TablePaginationActions(props) {
  const theme = useTheme;
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

export default function CustomerDetails() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [getUsers, setGetUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  // console.log("state"  ,selectedUser.name)
  let sleep = () => new Promise((r) => setTimeout(r, 2000));

  const sortByStatus = (page, rows, search, serviceId) => {
    console.log("🚀 ~ sortByStatus ~ search:", search);
    setSearch(search);
    setSelectedId(serviceId);
    setLimit(10);
    setPage(0);
    getUser(
      page,
      rows,
      search ? search : "",
      serviceId ? serviceId : null
      // fromDate ? fromDate : null,
      // toDate ? toDate : null
    );
  };
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    getUser(newPage + 1, limit, search, selectedId);
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(Math.floor(event.target.value));
    setPage(0);
    getUser(1, event.target.value, search, selectedId);
  };
  const getUser = async (newPage, rows, search) => {
    setLoading(true);
    const { data, responseCode } = await UserServices.getUser(
      newPage ? newPage : 1,
      rows ? rows : "",
      search ? search : ""
    );
    try {
      await sleep();
      const filteredUser = data?.output?.users?.filter(
        (user) => user.role !== "admin"
      );
      // console.log(filteredUser)
      setGetUsers(filteredUser);
      setCount(data?.output?.totalUsers);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = (user) => {
    console.log(user);
    setOpenDialog(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    setValue("name", selectedUser?.name);
    setValue("email", selectedUser?.email);
    setValue("phone", selectedUser?.phone);
    setValue("designation", selectedUser?.designation);
    setValue("role", selectedUser?.role);
  }, [openDialog]);

  const onSubmit = async (formData) => {
    try {
      const { data, responseCode, message } = await UserServices.updateUser(
        selectedUser?._id,
        formData
      );
      setLoading(true);
      SuccessToaster(message);
      await sleep();
      setOpenDialog(false);
      getUser();
    } catch (error) {
      ErrorToaster(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={{ mt: 4, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", color: Colors.primary }}
        >
          User List
        </Typography>
      </Box>
      <DataFilter
        sortData={(page, rows, search, serviceId) =>
          sortByStatus(page, rows, search, serviceId)
        }
        page={page}
        rows={limit}
      />
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <Box sx={{ mt: 3, ml: 2 }}>
          <TableContainer
            component={Paper}
            sx={{
              "&::-webkit-scrollbar": {
                bgcolor: Colors.white,
                height: "8px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: Colors.primary,
                borderRadius: "10px",
                cursor: "pointer",
              },
              "&.MuiPaper-root": {
                borderRadius: "12px",
                mt: 2,
              },
              // maxHeight: "310px",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>Sr</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Assigned Projects</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Phone Number</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Designation</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUsers?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgb(239 240 246)" : " ",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.projectIds.length> 0 ? item.projectIds.map((item2 , index)=>item2.name).join(", ") : "-" }</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.designation} </TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Tooltip title="Edit"> 
                        <Box
                          onClick={() => handleUpdate(item)}
                          sx={{ cursor: "pointer", color: Colors.primary }}
                        >
                          {" "}
                          <EditIcon />
                        </Box>
                        </Tooltip>
                        {/* <Box sx={{ cursor: "pointer", color: Colors.primary }}>
                          <DeleteIcon />
                        </Box> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog for Update */}

          <SimpleDialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
            }}
            title="Edit User"
            selectedUser={selectedUser}
          >
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                {/* <Grid item xs={12} sm={6}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type="password"
                    fullWidth
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <Typography variant="caption" color="error">
                      password is required
                    </Typography>
                  )}
                </Grid> */}
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
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </SimpleDialog>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Table component={Paper} sx={{ borderRadius: "12px" }}>
              <TablePagination
                sx={{
                  borderBottom: "none",
                  bgcolor: Colors.white,
                  borderRadius: "12px",
                }}
                rowsPerPageOptions={[10, 20, 30]}
                colSpan={12}
                count={count === undefined ? 0 : +count}
                rowsPerPage={limit}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
}
