import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import appwriteAuth from "../appwrite/Auth";
import {  useNavigate } from "react-router-dom";

export default function LogOutBtn() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const deletedSession = await appwriteAuth.logout();
    if (!deletedSession) {
      throw new Error("Error in logging out :: LogoutBtn Component");
    }
    dispath(logout());
    window.alert("Logged out Successfully");
    navigate("/");
  };

  return (
    <button
      className={`hover:text-black py-1.5 px-4 text-[17px] rounded-lg bg-red-500 text-white`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
