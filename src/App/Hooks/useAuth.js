import { useContext } from "react";
import { AuthContext } from "../Context/CreateContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
