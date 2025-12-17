import Axios from "./Axios";

type SignInResponse = {
  token: string;
};

function signin(username: string, password: string): Promise<SignInResponse> {
  return Axios.post("/signin", {
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

export default signin;


