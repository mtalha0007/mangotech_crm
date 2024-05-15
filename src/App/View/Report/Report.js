import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../../Assets/Styles/Colors";
import { Fragment, useEffect, useState } from "react";
import { FilterAlt } from "@mui/icons-material";
import InputField from "../../Components/InputField/InputField";
import moment from "moment";
import ReportServices from "../../Api/Report/Report.index";

function DataFilter({ sortData, page, rows,onMonthChange ,selectedMonth ,setSelectedMonth}) {
  const [filterCollapse, setFilterCollapse] = useState(true);

  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  // const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));

  const months = moment.months();
  const filterData = () => {
    // sortData(page, rows, search, selectedId);
    console.log(selectedId);
    console.log("🚀 ~ filterData ~ search:", search);
  };
  const clearData = () => {
    // sortData("");
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
              <InputLabel >Select Project</InputLabel>

                <FormControl fullWidth>
                  
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
              <Grid item  md={6} sx={{ width: "100%" }}>
              {/* <FormControl fullWidth> */}
                <InputLabel>Select Month</InputLabel>
                <TextField
                  select
                  fullWidth
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    onMonthChange(e.target.value);
                  }}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              {/* </FormControl> */}
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
const TableComponent = () => {
  const [totalArray, setTotalArray] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  let userData = [
    {
      userName: "Talha",
      MonthTotal: "190",
      projects: [
        {
          id: 1,
          name: "etc",
          hoursPerDay: [
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
          ],
          totalHours: "100",
        },
        {
          id: 2,
          name: "etc2",
          hoursPerDay: [
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
            "5",
            "7",
            "9",
          ],
          totalHours: "90",
        },
      ],
    },
  ];
    

    const GetStatsReport = async () => {
    const { data, responseCode } = await ReportServices.getStats();
    try {
    setStats(data)
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      GetStatsReport()
  },[])
   
  const updateDaysArray = (month) => {
    console.log(`Updating for month: ${month}`);
    const now = moment().month(month); // Set to the selected month
    const daysInMonth = now.daysInMonth();
    const monthStart = now.startOf('month');
    const daysArray = [];
    for (let i = 0; i < daysInMonth; i++) {
      const day = monthStart.clone().add(i, 'days');
      daysArray.push({
        dayOfMonth: day.date(),
        dayOfWeek: day.format('dddd'),
      });
    }
    setTotalArray(daysArray);
    console.log(daysArray);
  };

  useEffect(() => {
    updateDaysArray(moment().format('MMMM')); // Initialize with the current month
  }, []);

  const handleMonthChange = (month) => {
    updateDaysArray(month);
  };

  return (
    <>
      <Box sx={{ mt: 5, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", fontSize: "20px", color: Colors.primary }}
        >
          Report
        </Typography>
      </Box>
      <DataFilter onMonthChange={handleMonthChange} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth}  />
      <Box
        sx={{
          fontSize: "25px",
          fontWeight: "600",
          textAlign: "center",
          color: Colors.primary,
          mt: 5,
        }}
      >
        USERS REPORT{" "}
      </Box>
      <TableContainer sx={{ mt: 2  }} component={Paper}>
      <Table
        sx={{
          borderCollapse: "collapse",
          overflowX: "scroll",
          width: "100%",
          height:"400px"
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>Project</TableCell>
            {totalArray.map((item, index) => (
              <TableCell
                sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}
                key={index}
              >
                {item.dayOfMonth} <br />
                {selectedMonth}
               
              </TableCell>
            ))}
          </TableRow>
            <TableRow>
              <TableCell
                sx={{   
                  padding: "8px",
                  border: "1px solid grey",
                  fontWeight: "bold",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  border: "1px solid grey",
                  fontWeight: "bold",
                }}
              ></TableCell>
              {totalArray.map((item, index) => (
                <TableCell
                  sx={{
                    padding: "8px",
                    border: "1px solid grey",
                    fontWeight: "bold",
                  }}
                  key={index}
                >
                  {item.dayOfWeek}
                </TableCell>
              ))}
                <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>Total hrs Per Project</TableCell>
                <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>Total</TableCell>
            </TableRow>
           
        </TableHead>
        <TableBody>
          {userData.map((user, index) => (
            user.projects.map((project, projIndex) => (
             
              <TableRow key={projIndex} sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>
                {projIndex === 0 && <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }} rowSpan={user.projects.length}>{user.userName}</TableCell>}
                <TableCell sx={{  border: "1px solid grey", fontWeight: "bold" }}>{project.name}</TableCell>
                {project.hoursPerDay.map((hours, dayIndex) => (
                  <TableCell key={dayIndex} sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>
                    {hours}
                  </TableCell>
                ))}
                  <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }}>{project.totalHours}</TableCell>
                  {projIndex === 0 && <TableCell sx={{ padding: "8px", border: "1px solid grey", fontWeight: "bold" }} rowSpan={user.projects.length}>{user.MonthTotal}</TableCell>}
              </TableRow>

            ))

          ))}

 
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TableComponent;
