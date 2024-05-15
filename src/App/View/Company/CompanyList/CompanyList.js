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
} from "@mui/material";
import React, { useState, Fragment, useEffect } from "react";
import { Colors } from "../../../Assets/Styles/Colors";
import { FilterAlt, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
// import CustomerDetailsServices from "../../Api/CustomerDetails/CustomerDetail";
import InputField from "../../../Components/InputField/InputField";
import CompanyServices from "../../../Api/CompanyServices/Company.index";
import Loader from "../../../Components/Loader/Loader";
import { useTheme } from "@emotion/react";
function DataFilter({ sortData, page, rows }) {
  const [filterCollapse, setFilterCollapse] = useState(true);

  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");

  const filterData = () => {
    sortData(page, rows, name, selectedId);
    console.log(selectedId);
    console.log("🚀 ~ filterData ~ search:", name);
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
  const [count, setCount] = useState("");
  const [getCompanies, setGetCompanies] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);

// const baseURL = process.env.REACT_APP_BASE_URL;
// console.log(baseURL)
  const sortByStatus = (page, rows, name, serviceId) => {
    console.log("🚀 ~ sortByStatus ~ name:", name);
    setName(name);
    setSelectedId(serviceId);
    setLimit(10);
    setPage(0);
    getCompanys(page, rows, name ? name : "", serviceId ? serviceId : null);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    getCompanys(newPage + 1, limit, name, selectedId);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(Math.floor(event.target.value));
    setPage(0);
    getCompanys(1, event.target.value, name, selectedId);
  };

  let sleep = () => new Promise((r) => setTimeout(r, 2000))
 

  const getCompanys = async (newPage , rows , name) => {
    setLoading(true);
    const { data, responseCode } = await CompanyServices.getCompany( newPage ? newPage : 1,
      rows ? rows : "",
      name ? name : "");
    try {
      await sleep();
      setGetCompanies(data);
      setCount(data?.output?.totalCompanies)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanys();
  }, []);
  return (
    <>
      <Box sx={{ mt: 4, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", color: Colors.primary }}
        >
          Company List
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
                  <TableCell sx={{ fontWeight: "600" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Address </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Country </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>State </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>City </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Website </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Link </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCompanies?.output?.companies?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgb(239 240 246)" : " ",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <img style={{ width: "41px" }} src={"https://crm.mangotech-api.com" + item.image} />
                    </TableCell>
                    <TableCell> {item.address} </TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.website}</TableCell>
                    <TableCell>{item.link}</TableCell>
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
