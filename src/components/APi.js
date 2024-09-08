import axios from "axios";
const url = "https://money-squad-backend-service.vercel.app";

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${url}/newuser`, user);
  } catch (error) {
    if (error.response) {
      console.log("Error while calling Signup API: ", error);
    }
  }
};

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${url}/checkuser`, user);
  } catch (error) {
    if (error.response) {
      console.log("Error while calling login API: ", error);
      return error.response;
    }
  }
};
