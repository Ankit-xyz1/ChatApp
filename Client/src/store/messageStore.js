import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { authStore } from "./authStore";

export const messageStore = create((set, get) => ({
  userIsLoading: true,
  messageIsLoading: false,
  chatSelected: false,
  users: [],
  messages: [],
  userToChatId: "",
  messageContainerrLoading: false,

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
      set({ messages: mess.data.data });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      set({ messageIsLoading: false });
    }
  },
  setChat: (userOBJ) => {
    set({ chatSelected: true });
    set({ userToChatId: userOBJ });
    set({ messageContainerrLoading: true });
    setTimeout(() => {
      set({ messageContainerrLoading: false });
    }, 500);
  },
  backFromChat: () => {
    set({ chatSelected: false });
    set({ userToChatId: "" });
  },
  sendMessages: async (text, image, userToChatId) => {
    try {
      const response = await axiosInstance.post(
        `message/send/${userToChatId._id}`,
        { text, image }
      );
      set({ messages: [...get().messages, response.data.data] });
    } catch (error) {
      console.log(error);
      toast.error("message not send");
    }
  },

  subscribeToMessage: () => {
    const { userToChatId } = get();
    if (!userToChatId) return console.log("No user selected, skipping subscription");

    const socket = authStore.getState().socketConnection;

    // Remove old listener before adding a new one (prevents duplicate listeners)
    socket.off("NewMessage");

    socket.on("NewMessage", (newMessageFromSocket) => {
      if(userToChatId._id != newMessageFromSocket.senderID){
        return
      }else{

        set({ messages: [...get().messages, newMessageFromSocket] });
      }
    });

    console.log("✅ Subscribed to NewMessage");
  },

  unsubscribeToMessage: () => {
    const socket = authStore.getState().socketConnection;
    socket.off("NewMessage");
  },
}));
