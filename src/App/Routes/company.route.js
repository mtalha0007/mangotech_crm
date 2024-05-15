import UserList from "../View/User/UserList/UserList";
import CreateUser from "../View/User/CreateUser/CreateUser";
import CreateProject from "../View/Project/CreateProject/CreateProject";
import ProjectList from "../View/Project/ProjectList/ProjectList";
import AccountSetting from "../View/AccountSetting/AccountSetting";
import CompanyList from "../View/Company/CompanyList/CompanyList";
import CreateCompany from "../View/Company/CreateCompany/CreateCompany";

const AdminRoute = [
    
      // {
      //   path: "/createUser",
      //   component: <CreateUser /> ,
      // },
      // {
      //   path: "/userList",   
      //   component: <UserList /> ,
      // },
      // {
      //   path: "/createProject",
      //   component: <CreateProject /> ,
      // },
      // {
      //   path: "/projectList",   
      //   component: <ProjectList /> ,
      // }, 
      // {
      //   path: "/account",   
      //    component: <AccountSetting /> ,
      // },
      {
        path: "/createCompany",
        component: <CreateCompany /> ,
      },
      {
        path: "/companyList",   
        component: <CompanyList /> ,
      },
 
];

export default AdminRoute;
