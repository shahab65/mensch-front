//@ts-nocheck
import { useEffect } from "react";
import { useUser } from "store/user";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useUser((state) => state);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  function handleCallbackResponse(response) {
    setToken(response.credential);
    navigate(from);
  }
  useEffect(() => {
    if (token) {
      navigate(from);
    } else {
      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    }
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default Login;
