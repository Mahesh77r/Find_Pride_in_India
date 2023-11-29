import axios from 'axios';

const URL = 'https://finding-pride-in-india.onrender.com/dom';
const LOCALURL = 'http://localhost:8080/dom';

export const addDOM = async(file,inputformData) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(inputformData));
    try {
      await axios.post(`${LOCALURL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Form uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
};

// 

export const addProduct = async(formdata) =>{
  try{
    console.log(formdata)

    await axios.post(`${LOCALURL}/addfireproducts`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding Prodcut ${err}`)
  }
}
export const fetchProduct = async(name) =>{

    // id can be null if we need to view all user
    name = name || '';
    try{
       return await axios.get(`${URL}/getproducts/${name}`);
    }
    catch(err){
        console.log("Error occurs while running fetching Products function",err);
    }
};
// 
export const addGuide = async(formdata) =>{
  try{
    console.log(formdata)

    await axios.post(`${LOCALURL}/addguides`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding Prodcut ${err}`)
  }
}

export const fetchGuide = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getguides/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching guides function",err);
  }
};
// 

export const addFacility = async(formdata) =>{
  try{
    console.log(formdata)

    await axios.post(`${LOCALURL}/addfacilities`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding facility ${err}`)
  }
}
export const fetchFacility = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getfacilities/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching facility function",err);
  }
};

// 
export const addEvent = async(formdata) =>{
  try{
    console.log(formdata)

    await axios.post(`${LOCALURL}/addevents`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding events ${err}`)
  }
}
export const fetchEvents = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getevents/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching events function",err);
  }
};
// 
export const fetchSummary = async(id) =>{

  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.get(`${URL}/getplaces/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching summary function",err);
  }
};

// 

export const addArtist = async(formdata) =>{
  try{
    
    const res = await axios.post(`${LOCALURL}/addartists`,formdata)
    return res;
    
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding artists ${err}`)
  }
}

export const fetchArtist = async(name) =>{
  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getartists/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching artists function",err);
  }
};

export const updateArtist = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/updateartists/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating artists ${err}`)
  }
};

export const deleteArtist = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteartists/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching artists function",err);
  }
};

// 

export const fetchOrder = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.get(`${LOCALURL}/getorderfordest/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching orders function",err);
  }
};

export const updateShippedStatus = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/ordershipped/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during shipping order ${err}`)
  }
};

export const deleteOrder = async (id, cancellation_reason) => {
  id = id || '';
  console.log(cancellation_reason);

  try {
    return await axios.delete(`${LOCALURL}/ordercancle/${id}`, {
      data: { cancellation_reason }, // Include the data in the request body
    });
  } catch (err) {
    console.log("Error occurs while running canceling order function", err);
  }
};
