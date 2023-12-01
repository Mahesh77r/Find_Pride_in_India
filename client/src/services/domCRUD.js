import axios from 'axios';

const URL = 'https://finding-pride-in-india.onrender.com/dom';
const LOCALURL = 'http://localhost:8080/dom';


// DOM Register
export const addDOM = async(formData) => {
  
    try {
     return await axios.post(`${LOCALURL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
};
export const getDOM = async() =>{
  try {
    return await axios.get(`${URL}/dom/getplaces/`)
  } catch (error) {
    console.log(`Error occur during fetching destination ${error}`)
  }
}
// product Crud

export const addProduct = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${LOCALURL}/addproducts`,formdata)
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
export const updateProduct = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/updateproducts/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating product ${err}`)
  }
};
export const deleteProduct = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteproducts/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching products function",err);
  }
};

// guide CRUD
export const addGuide = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${LOCALURL}/addguides`,formdata)
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
export const updateGuide = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/updateguides/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating guide ${err}`)
  }
};
export const deleteGuide = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteguides/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching guide function",err);
  }
};

// facilities CRUD

export const addFacility = async(formdata) =>{
  try{
    console.log(formdata)

   return await axios.post(`${LOCALURL}/addfacilities`,formdata)
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
export const updateFacility = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/updatefacilities/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating Facility ${err}`)
  }
};
export const deleteFacility = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/deletefacilities/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during deleting Facility ${err}`)
  }
};

// events CRUD

export const addEvent = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${LOCALURL}/addevents`,formdata)
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
export const updateEvents = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${LOCALURL}/updateevents/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating events ${err}`)
  }
};
export const deleteEvents = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteevents/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching event function",err);
  }
};

// artist CRUD

export const addArtist = async(formdata) =>{
  try{
    return await axios.post(`${LOCALURL}/addartists`,formdata);
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

// order apis

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