import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          name,
          email,
          password,
        }
      );
      if (res.status === 201) {
        toast.success("Registration successful!");
        setIsSignUp(true); // Switch to login form
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.log("Registration error:", error);
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.status === 200) {
        toast.success("Login successful!");
        if (res.data.isAdmin == true) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.log("Login error:", error);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-96 md:h-[500px] overflow-hidden relative">
        {/* Sliding Background Panel */}
        <div
          className={`relative top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-500 to-purple-600 transition-transform duration-700 ease-in-out z-10 flex items-center justify-center ${
            isSignUp
              ? "transform translate-x-full rounded-l-2xl"
              : "rounded-r-2xl"
          }`}
        >
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isSignUp
                ? "To keep connected with us please login with your personal info"
                : "Enter your personal details and start your journey with us"}
            </p>
            <button
              onClick={toggleMode}
              className="border-2 border-white text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center p-8 transition-opacity duration-500 ${
            isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Sign In
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-gray-50"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="text-center">
                <button className="text-purple-600 hover:text-purple-800 text-sm">
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                onClick={handlelogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center p-8 transition-opacity duration-500 ${
            isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Time to Join Us
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-gray-50"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-gray-50"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-gray-50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-center">
                <Link to="/admin/register">
                  <p className="text-blue-500 hover:underline cursor-pointer">
                    Sign Up As Admin
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
