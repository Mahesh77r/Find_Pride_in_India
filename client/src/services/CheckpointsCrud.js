import axios from 'axios';

const URL = 'https://finding-pride-in-india.onrender.com/dom';
const LOCALURL = 'http://localhost:8080/dom';


export const fetchCheckpoints = async(id) =>{

    // id can be null if we need to view all user
    id = id || '';
    try{
       return await axios.get(`${URL}/getcheckpoints/${id}`);
    }
    catch(err){
        console.log("Error occurs while running fetching Checkpoints function",err);
    }
};