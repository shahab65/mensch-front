import Axios from "./Axios";

type SignUpResponse = {
  token: string;
};

function signup(username: string, password: string): Promise<SignUpResponse> {
  return Axios.post("/signup", {
    username,
    password,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export default signup;


