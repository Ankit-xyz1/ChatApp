import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const messageStore = create((set) => ({
  userIsLoading: false,
  messageIsLoading: false,
  chatSelected: false,
  users: [],
  messages: [],

  //feyching all the users
  fetchUsers: async () => {
    try {
      set({ userIsLoading: true });
      const user = await axiosInstance.get("/message/FetchUSerSidebar");
      set({ users: user.data });
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    } finally {
      set({ userIsLoading: false });
    }
  },

  //fetching messages frrom user
  fetchMessages: async (userTochatID) => {
    try {
      set({ messageIsLoading: true });
      const mess = await axiosInstance.get(`/message/${userTochatID}`);
      set({ messages: mess.data });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      set({ messageIsLoading: false });
    }
  },
}));
