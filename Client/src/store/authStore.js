import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";

export const authStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoading: true,
  isSigning: false,
  isLoggin: false,
  isUploadingImg:false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.post("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("errorrr at check auth", error);
      if (error.response) {
        console.error("❌ Server responded with:", error.response.data);
        console.error("❌ Status Code:", error.response.status);
      } else if (error.request) {
        console.error("❌ No response received from server:", error.request);
      } else {
        console.error("❌ Unexpected error:", error.message);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  Signup: async (data) => {
    try {
      set({ isSigning: true });
      let response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      set({ isSigning: false });
      toast.success("Account created sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Cannot signup");
      set({ isSigning: false });
    }
  },
  Login: async (data) => {
    try {
      set({ isLoggin: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      if (res.data.sucess) {
        toast.success("logged in");
      } else {
        toast.error(res.data.sucess.message);
      }
      set({ isLoggin: false });
    } catch (error) {
      toast.error("invalid credentials or 404");
      set({ isLoggin: false });
      console.log(error);
    }
  },
  Logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out sucessfully");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  },
  UpdateProfile: async (data) => {
    try {
      set({isUploadingImg:true})
      const res = await axiosInstance.post("/auth/updateProfile", data);
      toast.success("uploaded sucessfully")
      set({isUploadingImg:false})

    } catch (error) {
        console.log(error, error.res)
      set({isUploadingImg:false})
        toast.error("an error occured")
    }
  },
}));
