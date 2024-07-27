// src/utils/authUtils.ts
import { useRecoilState } from "recoil";
import userState from "../components/userState"; // Adjust the import path as needed

export const useLogout = () => {
  const [, setUser] = useRecoilState(userState);

  const logout = () => {
    // Clear user state
    setUser({
      id: null,
      userName: "",
      email: "",
    });

    // Optionally, redirect the user to a login page or home page
    window.location.href = "/Login"; // Adjust the URL based on your routing
  };

  return logout;
};
