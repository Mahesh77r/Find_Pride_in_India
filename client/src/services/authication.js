import axios from 'axios';

const URL = 'http://localhost:8080';

export const loginDOM = async(data) => {
    try{
        // console.log(data);
       return await axios.post(`${URL}/dom/login`,data);
    }
    catch(err){
        console.log("Error occurs while running loginUser function",err);
    }
};



export const resetPassword = async(data) => {
    try{
        // console.log(data);
       return await axios.post(`${URL}/dom/resetpassword`,data);
    }
    catch(err){
        console.log("Error occurs while running loginUser function",err);
    }
};
