import {
  Box,
  Paper,
  Grid,
  IconButton,
  Table,
  Button,
  Collapse,
  FormControl,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  MenuItem,
  TablePagination,
  InputLabel,
  Tooltip,
} from "@mui/material";
import React, { useState, Fragment, useEffect } from "react";
import { Colors } from "../../../Assets/Styles/Colors";
import {
  FilterAlt,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
// import CustomerDetailsServices from "../../Api/CustomerDetails/CustomerDetail";
import InputField from "../../../Components/InputField/InputField";
import ProjectServices from "../../../Api/ProjectServices/Project.index";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import moment from "moment";
import Loader from "../../../Components/Loader/Loader";
import { useTheme } from "@emotion/react";
import SimpleDialog from "../../../Components/Dialog/Dialog";
import MultiSelectAutocomplete from "../../../Components/MultSelectInput/MultiSelectInput";
import UserServices from "../../../Api/UserServices/User.index";
import { useForm } from "react-hook-form";

function DataFilter({ sortData, page, rows }) {
  const [filterCollapse, setFilterCollapse] = useState(true);

  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");

  const filterData = () => {
    sortData(page, rows, name, selectedId);
    console.log(selectedId);
    console.log("🚀 ~ filterData ~ name:", name);
  };
  const clearData = () => {
    sortData("");
    setSelectedId("");
    setName("");
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
                    value={name}
                    onChange={(e) => {
                      console.log(
                        "🚀 ~ DataFilter ~ e.target.value:",
                        e.target.value
                      );
                      setName(e.target.value);
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
  const [name, setName] = useState("");
  const [getProject, setGetProject] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [names, setNames] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [personName, setPersonName] = useState([]);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(selectedUser);
  let sleep = () => new Promise((r) => setTimeout(r, 2000));
  const sortByStatus = (page, rows, name, serviceId) => {
    console.log("🚀 ~ sortByStatus ~ search:", name);
    setName(name);
    setSelectedId(serviceId);
    setLimit(10);
    setPage(0);
    getProjects(page, rows, name ? name : "", serviceId ? serviceId : null);
  };
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    getProjects(newPage + 1, limit, name, selectedId);
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(Math.floor(event.target.value));
    setPage(0);
    getProjects(1, event.target.value, name, selectedId);
  };

  //project list
  const getProjects = async (newPage, rows, name ,assignedUser) => {
    setLoading(true);
    const { data, responseCode } = await ProjectServices.getProject(
      newPage ? newPage : 1,
      rows ? rows : "",
      name ? name : "",
      assignedUser ? assignedUser :""
    );
    try {
      await sleep();
      setGetProject(data);
      setCount(data?.output?.totalProjects);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects(1,1000,"");
  }, []);

  ///users list in dropdown
  const handleGetUsers = async (page, limit, search ) => {
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

  const AssignProject = async () => {
    try {
      let obj = {
        assignedUser: personName,
      };
      const { data, responseCode, message } = await ProjectServices.assignProject(selectedUser._id, obj);
      setOpenDialog(false); 
      setLoading(true);
      await sleep();
      console.log(data);
      getProjects()
    } catch (error) {
      console.error("Error while fetching users:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsers(1, 1000, "");
  }, []);

  const handleDialog = (user) => {
    console.log(user);
    setOpenDialog(true);
    setSelectedUser(user);
  };

  console.log(personName)
  return (
    <>
      <Box sx={{ mt: 4, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", color: Colors.primary }}
        >
          Project List
        </Typography>
      </Box>
      <DataFilter
        sortData={(page, rows, search, serviceId) =>
          sortByStatus(page, rows, search, serviceId)
        }
        page={page}
        rows={limit}
      />
      <SimpleDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        title="Assigned Users To Project"
        selectedUser={selectedUser}
      >
        <Box component={"form"}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <InputLabel>Assigned User</InputLabel>

              <MultiSelectAutocomplete
                names={names}
                onClick={handleGetUsers}
                register={register("assignedUser")}
                sx={{ width: "100%" }}
                personName={personName}
                setPersonName={setPersonName}
                selectedUser={selectedUser}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box
                onClick={AssignProject}
                type="submit"
                sx={{
                  mt: 2,
                  width:"55px", 
                  cursor: "pointer",
                  background:
                    "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  color: Colors.white,
                  padding: "8px 25px",
                  "&:hover": {
                    background:
                      "linear-gradient(310deg, #141727 0%, #3A416F 100%)",
                  },
                }}
              >
                UPDATE
              </Box>
            </Grid>
          </Grid>
        </Box>
      </SimpleDialog>
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
                  <TableCell sx={{ fontWeight: "600" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>
                    Assigned User
                  </TableCell>

                  <TableCell sx={{ fontWeight: "600" }}>Start Date </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>End Date </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Status </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Priority </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>File </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>
                    Client Details
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Comments </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getProject?.output?.projects?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgb(239 240 246)" : " ",
                    }}
                  >
                    <>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {item.name != "" || null ? item.name : "-"}
                      </TableCell>
                      <TableCell>
                        {item.description != "" || null
                          ? item.description
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.assignedUser.length > 0
                          ? item.assignedUser
                              .map((item) => item.name)
                              .join(", ")
                          : "-"}
                      </TableCell>

                      <TableCell>
                        {item.startDate != "" || null
                          ? moment(item?.startDate).format("DD-MM-YYYY hh:mm A")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.endDate
                          ? moment(item?.endDate).format("DD-MM-YYYY hh:mm A")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.status != "" || null ? item.status : "-"}
                      </TableCell>
                      <TableCell>
                        {item.priority != "" || null ? item.priority : "-"}
                      </TableCell>
                      <TableCell>
                        {item.file ? (
                          <InsertDriveFileIcon
                            // onClick={() => {
                            //   const link = document.createElement("a");
                            //   link.href ="https://crm.mangotech-api.com" +  item.file;
                            //   link.setAttribute("download", "");
                            //   document.body.appendChild(link);
                            //   link.click();
                            //   document.body.removeChild(link);
                            // }}
                            sx={{ color: Colors.primary, cursor: "pointer" }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {item.clientDetails ? item.clientDetails : "1"}
                      </TableCell>
                      <TableCell>
                        {item.comments ? item.comments : "-"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit Assigned user">
                        <Box
                          onClick={() => handleDialog(item)}
                          sx={{ cursor: "pointer", color: Colors.primary }}
                        >
                          <EditIcon />
                        </Box>
                        </Tooltip>
                      </TableCell>
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
