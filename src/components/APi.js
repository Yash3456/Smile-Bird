import axios from "axios";
const url = 'https://bakend-xi.vercel.app';

export const authenticateSignup = async (user) => {
    try {
        
        return await axios.post(`${url}/signup`, user);
    } catch (error) {
       if(error.response){
        console.log('Error while calling Signup API: ', error);
       }
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    } catch (error) {
       if(error.response){
        console.log('Error while calling login API: ', error);
        return error.response;
       }
    }
}
