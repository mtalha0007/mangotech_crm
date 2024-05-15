import { AuthContext } from "../Context/CreateContext";
import useProvideAuth from "../Hooks/useProvideAuth";

function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
