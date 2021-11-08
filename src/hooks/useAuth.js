import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;