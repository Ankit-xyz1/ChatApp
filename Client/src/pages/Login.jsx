import { Eye, EyeOff, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { authStore } from "../store/authStore";
import {  useNavigate } from "react-router-dom";
import Boxexs from "../components/Boxexs";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggin,Login,checkAuth } = authStore();
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  //handling form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update based on input name
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    Login(formData)
    checkAuth();

  };
  return (
    <>
      <div className="main flex flex-row items-center justify-center h-[90vh] overflow-hidden">
        <div className="left flex justify-center items-center h-[80vh] p-10 md:w-[60%]">
          <div className=" flex flex-col gap-4 p-3 h-[80vh] lg:w-[80%] w-full items-center justify-center">
            <MessagesSquare size={63} color="#4643be" />
            <div className=" text-xl md:text-2xl lg:text-3xl">
              Login to your Devchat accout
            </div>
            <p className="text-zinc-400">Lets gets chatting</p>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-2 mt-10">
              <div className="email mb-4 focus:outline-none">
                <label className="input validator focus:outline-none focus:border-none">
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
                  <input type="email" className="focus:outline-none" placeholder="mail@site.com" name="email"
                    value={formData.email} onChange={handleChange} required />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>
              <div className="pass">
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
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    // minLength="8"
                    // pattern="(?=.*\d).{8,}"
                    // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                  {showPassword ? (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setshowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setshowPassword(!showPassword)}
                    />
                  )}
                </label>
              </div>

              <div className="Signup flex items-center justify-center flex-col">
                <button className="btn btn-dash btn-primary font-bold text-white">
                  {isLoggin ? "loading...." : "Login"}
                </button>
              </div>
            </form>
            <button
              className="btn btn-link"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Need an account? Signup now
            </button>
          </div>
        </div>
        <div className="right lg:w-[40%] hidden lg:flex items-center flex-col justify-center h-screen  ">
          <div className=" flex justify-start items-center w-full px-10 robo md:text-2xl jet">
            Be a part of our{" "}
            <span className="text-[#4643be] jet ml-2">community</span>
          </div>
          <Boxexs />
        </div>
      </div>
    </>
  );
};

export default Login;
