import Form from "../View/Form/Form";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AccountSetting from "../View/AccountSetting/AccountSetting";
import SettingsIcon from '@mui/icons-material/Settings';
const PublicRoute = [
  {
    path: "/userForm",
    component: <Form /> ,
    label : "Form",
    icon:<InsertDriveFileIcon/>
  },
  {
    path: "/account",
    component: <AccountSetting /> ,
    label : "Account Setting",
    icon:<SettingsIcon/>
  },
  
];

export default PublicRoute;
