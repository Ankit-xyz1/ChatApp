import { ImageUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authStore } from "../store/authStore";
import { Typewriter } from "react-simple-typewriter";

const Prrrofile = () => {
  const { UpdateProfile, authUser, isUploadingImg, checkAuth } = authStore();
  const [SelectedImage, setSelectedImage] = useState(null);
  const profileImg = authUser.data.profilePic || SelectedImage || "default.jpg";

  useEffect(() => {
    authUser.data.profilePic;
  }, [authUser]);

  const handleProfile = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No image found");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image);
      await UpdateProfile({ profilePic: base64image });
      checkAuth();
    };
  };
  return (
    <>
      <div className="main w-full h-[93vh] flex items-center justify-center">
        <div className="h-full w-[40%] flex-col flex items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center">
            <span className="jet text-xl md:text-3xl">
              {" "}
              Your <span className="text-[#4643be]"> Profile</span>
            </span>
            <span className="jet md:text-xl text-zinc-500">
              {" "}
              manage your profile
            </span>
          </div>
          <div className="photo">
            <div className="image relative bg-black rounded-full   h-[70px] md:h-[156px] w-[70px] md:w-[156px] flex justify-end items-end overflow-hidden  transition-all ease-in-out duration-500">
              {isUploadingImg && (
                <span className="  absolute z-10 w-full h-full items-center justify-center flex jet bg-zinc-900">
                  <Typewriter words={["Loading....."]} loop={true} />
                </span>
              )}
              <img
                src={profileImg}
                alt=""
                className="w-full h-full object-cover"
              />

              <label htmlFor="photoicon">
                <div className="absolute left-10 bottom-5 md:left-30 md:bottom-7 cursor-pointer   z-10">
                  <ImageUp />
                  <input
                    type="file"
                    className="hidden"
                    id="photoicon"
                    onChange={handleProfile}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="userDetails p-10 flex flex-col gap-3">
            <div className="name">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="input"
                  className="cursor-pointer items-center justify-center flex jet  "
                  required
                  disabled
                  value={authUser.data.name}
                />
              </label>
            </div>
            <div className="email">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  disabled
                  className="  jet w-[256px] "
                  value={authUser.data.email}
                  required
                />
              </label>
            </div>
          </div>
          <div className="seperation w-full md:w-[70%] h-[1px] bg-zinc-300"></div>
          <div className="moreDetails">
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.data.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prrrofile;
