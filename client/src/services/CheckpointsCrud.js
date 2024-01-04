import axios from 'axios';

const URL = 'https://finding-pride-in-india.onrender.com/dom';
const LOCALURL = 'http://localhost:8080/dom';


export const fetchCheckpoints = async (id) => {

  // id can be null if we need to view all user
  id = id || '';
  try {
    return await axios.get(`${URL}/getcheckpoints/${id}`);
  }
  catch (err) {
    console.log("Error occurs while running fetching Checkpoints function", err);
  }
};

export const addCheckpoint = async (formdata) => {
  try {
    console.log(formdata)

    return await axios.post(`${URL}/addcheckpoints`, formdata)
  }
  catch (err) {
    console.log(formdata)
    console.log(`Error occur during adding checkpoint ${err}`)
  }
}

export const updateCheckpoint = async (id, formdata) => {
  id = id || '';

  try {
    return await axios.put(`${URL}/updatecheckpoints/${id}`, formdata)
  } catch (error) {
    console.log(`Error occur during updating checkpoint ${error}`)


  }
}

export const deleteCheckpoint = async (id) => {
  id = id || '';

  try {
    return await axios.delete(`${URL}/deletecheckpoints/${id}`)
  } catch (error) {
    console.log(`Error occur during deleting checkpoint ${error}`)


  }
}