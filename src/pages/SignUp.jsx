//@ts-nocheck
import { useState, useEffect } from "react";
import { useUser } from "store/user";
import { useNavigate, useLocation, Link } from "react-router-dom";
import signup from "api/signup";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const { token, setToken } = useUser((state) => state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [token, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await signup(username, password);
      setToken(response.token);
      navigate(from);
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-16 flex flex-center flex-column">
      <h2 className="mb-16">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-column" style={{ maxWidth: "300px", width: "100%" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-8-12 mb-12"
          style={{
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-8-12 mb-16"
          style={{
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          disabled={isLoading}
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="mt-16 text-align-center">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;


