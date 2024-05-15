import UserList from "../View/User/UserList/UserList";
import CreateUser from "../View/User/CreateUser/CreateUser";
import CreateProject from "../View/Project/CreateProject/CreateProject";
import ProjectList from "../View/Project/ProjectList/ProjectList";
import CompanyList from "../View/Company/CompanyList/CompanyList";
import CreateCompany from "../View/Company/CreateCompany/CreateCompany";
import AccountSetting from "../View/AccountSetting/AccountSetting";
import Dashboard from "../View/Dashboard/Dashboard";
import Report from "../View/Report/Report";

const AdminRoute = [
      {
        path: "/dashboard",
        component: <Dashboard /> ,
      },
      {
        path: "/createUser",
        component: <CreateUser /> ,
      },
      {
        path: "/userList",   
        component: <UserList /> ,
      },
      {
        path: "/createProject",
        component: <CreateProject /> ,
      },
      {
        path: "/projectList",   
        component: <ProjectList /> ,
      },
      {
        path: "/createCompany",
        component: <CreateCompany /> ,
      },
      {
        path: "/companyList",   
        component: <CompanyList /> ,
      },
      {
        path: "/report",   
         component: <Report /> ,
      },
      {
        path: "/account",   
         component: <AccountSetting /> ,
      },

 
];

export default AdminRoute;
