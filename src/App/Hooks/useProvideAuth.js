import { useState } from "react";
import Storage from "../Utils/Storage";

function useProvideAuth() {
  const { setStorageItem, getStorageItem } = Storage();

  // *For User
  const [user, setUser] = useState(getStorageItem("user"));

  // *For Login
  const userLogin = (data) => {
    setStorageItem("user", data);
    setUser(data);
  };

  // *For Logout
  const userLogout = async () => {
    localStorage.clear();
    setUser(null);
  };

  return {
    user,
    userLogin,
    userLogout,
  };
}

export default useProvideAuth;
