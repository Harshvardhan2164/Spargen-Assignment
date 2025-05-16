import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
import API from "../services/api";

const RegisterUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [captchaInput, setCaptchaInput] = useState(null);

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if(!privacyAccepted){
                alert("Please check the required fields before registering");
                return;
            }

            if(!captchaInput){
                alert("Incorrect CAPTCHA, try again!");
                return;
            }

            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            alert("User registered successfully!");
            navigate("/login");
        } catch(error){
            console.error("Error registering user: ", error.response?.data?.message);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="p-8 rounded-2xl shadow-xl border border-[#2e2e2e] backdrop-blur-md bg-gray-800 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-white tracking-wide mb-6">Register New User</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />

            <div className="text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded"
                />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-blue-400 hover:underline">Privacy Policy.</a>
                </span>
              </label>
            </div>

            <ReCaptcha
              sitekey="6LdpXD0rAAAAAKz7wUNI2ecEtguTxeLnVDB1Gv28"
              className="justify-items-center"
              onChange={(value) => setCaptchaInput(value)}
            />

            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold tracking-wide shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Register User
            </button>
          </form>
        </div>
      </div>
    );
};

export default RegisterUser;